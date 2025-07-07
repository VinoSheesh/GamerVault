"use client"

import { useState, useEffect } from "react"
import Login from "./Login"
import { ShoppingBag, User, LogOut, Eye } from "lucide-react"

import userImg from "../assets/Profile.png"

function Header({ toggleActive, active, cartItemsCount = 0 }) {
  const [showLogin, setShowLogin] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  // Check for existing session on component mount
  useEffect(() => {
    const checkSession = () => {
      const userData = localStorage.getItem("gameVaultUser")
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData)
          setUser(parsedUser)
          setIsLoggedIn(true)
        } catch (error) {
          console.error("Error parsing user data:", error)
          localStorage.removeItem("gameVaultUser")
          setUser(null)
          setIsLoggedIn(false)
        }
      } else {
        setUser(null)
        setIsLoggedIn(false)
      }
    }

    // Initial check
    checkSession()

    // Listen for storage changes (when user logs in from another tab)
    const handleStorageChange = (e) => {
      if (e.key === "gameVaultUser") {
        checkSession()
      }
    }

    // Custom event listener for login success
    const handleLoginSuccess = (event) => {
      const userData = event.detail.user
      setUser(userData)
      setIsLoggedIn(true)
      
      // Also update localStorage if not already set
      const existingData = localStorage.getItem("gameVaultUser")
      if (!existingData) {
        localStorage.setItem("gameVaultUser", JSON.stringify(userData))
      }
    }

    // Custom event listener for logout
    const handleLogout = () => {
      localStorage.removeItem("gameVaultUser")
      setUser(null)
      setIsLoggedIn(false)
    }

    // Add event listeners
    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("loginSuccess", handleLoginSuccess)
    window.addEventListener("logout", handleLogout)

    // Cleanup event listeners
    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("loginSuccess", handleLoginSuccess)
      window.removeEventListener("logout", handleLogout)
    }
  }, [])

  // Handle logout
  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem("gameVaultUser")
    setUser(null)
    setIsLoggedIn(false)
    setShowUserMenu(false)

    // Dispatch custom event for logout (for other components)
    window.dispatchEvent(new CustomEvent("logout"))

    // Optional: Show logout confirmation
    console.log("User logged out successfully")
  }

  // Handle login success from Login component modal
  const handleLoginSuccess = (userData) => {
    setUser(userData)
    setIsLoggedIn(true)
    setShowLogin(false)

    // Ensure data is in localStorage
    localStorage.setItem("gameVaultUser", JSON.stringify(userData))

    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent("loginSuccess", {
      detail: { user: userData }
    }))
  }

  // Extract display name from user data
  const getDisplayName = () => {
    if (!user) return "Guest"

    // Use displayName if available, otherwise extract from email
    if (user.displayName) {
      return user.displayName
    }

    if (user.email) {
      // Extract username from email (part before @)
      const username = user.email.split("@")[0]
      // Capitalize first letter and handle common patterns
      return username.charAt(0).toUpperCase() + username.slice(1).replace(/[._-]/g, ' ')
    }

    return "User"
  }

  // Handle profile view (you can expand this)
  const handleViewProfile = () => {
    if (isLoggedIn) {
      setShowUserMenu(false)
      setShowProfile(true)
      console.log("View profile for user:", user)
    } else {
      setShowLogin(true)
    }
  }

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu-container')) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserMenu])

  return (
    <>
      <header className="absolute fixed top-0 left-0 w-full flex justify-between items-center p-[20px_20px_0px_20px] z-30 bg-transparent font-poppins">
        <a href="#" onClick={toggleActive} className="text-3xl text-white">
          <div className={`transform transition-transform duration-300 ${active ? "rotate-180" : "rotate-0"}`}>
            <i className="bi bi-chevron-right"></i>
          </div>
        </a>

        <div className="inline-flex items-center gap-5">
          {/* Wishlist/Favorites */}
          <div className="relative text-white text-[1.5rem] w-[50px] h-[50px] rounded-[10px] shadow-[-5px_-5px_15px_rgba(255,255,255,0.1),5px_5px_15px_rgba(0,0,0,0.35)] flex items-center justify-center no-underline hover:bg-zinc-400 duration-500 rounded-full">
            <a href="#" onClick={(e) => e.preventDefault()}>
              <i className="bi bi-heart"></i>
              <span className="absolute right-0 bottom-[20px] text-[0.8rem] font-extrabold w-[20px] h-[20px] p-[3px] text-white bg-red-600 rounded-full flex items-center justify-center font-poppins">
                0
              </span>
            </a>
          </div>

          {/* Shopping Cart */}
          <div className="relative text-white text-[1.5rem] w-[50px] h-[50px] rounded-[10px] shadow-[-5px_-5px_15px_rgba(255,255,255,0.1),5px_5px_15px_rgba(0,0,0,0.35)] flex items-center justify-center no-underline hover:bg-zinc-400 duration-500 rounded-full">
            <a href="#" onClick={(e) => {
              e.preventDefault()
              const bagElement = document.getElementById("bag")
              if (bagElement) {
                bagElement.classList.add("active")
              }
            }}>
              <ShoppingBag size={24} />
              <span className="absolute right-0 bottom-[20px] text-[0.8rem] font-extrabold w-[20px] h-[20px] p-[3px] text-white bg-red-600 rounded-full flex items-center justify-center font-poppins">
                {cartItemsCount}
              </span>
            </a>
          </div>

          {/* User Profile Section */}
          <div className="relative user-menu-container">
            <div 
              className="w-[200px] h-[60px] flex justify-center items-center gap-3 rounded-[10px] shadow-[-5px_-5px_15px_rgba(255,255,255,0.1),5px_5px_15px_rgba(0,0,0,0.35)] font-montserrat px-3 cursor-pointer hover:bg-white/10 transition-all duration-300"
              onClick={() => isLoggedIn ? setShowUserMenu(!showUserMenu) : setShowLogin(true)}
            >
              {/* User Avatar */}
              <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden border-2 border-white/20">
                <img 
                  src={userImg || "/placeholder.svg"} 
                  alt="User Avatar" 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              {/* User Info */}
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-white text-sm font-semibold truncate leading-tight" title={getDisplayName()}>
                  {getDisplayName()}
                </span>
                
                {isLoggedIn ? (
                  <span className="text-white/70 text-xs font-normal leading-tight">
                    Click for options
                  </span>
                ) : (
                  <span className="text-green-400 text-xs font-medium leading-tight">
                    Click to login
                  </span>
                )}
              </div>

              {/* Dropdown Arrow */}
              {isLoggedIn && (
                <div className={`transform transition-transform duration-200 text-white/70 ${showUserMenu ? 'rotate-180' : 'rotate-0'}`}>
                  <i className="bi bi-chevron-down text-sm"></i>
                </div>
              )}
            </div>

            {/* Dropdown Menu */}
            {isLoggedIn && showUserMenu && (
              <div className="absolute top-full right-0 mt-2 w-[200px] bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-white/20 overflow-hidden z-50 animate-fade-in">
                {/* User Info Header */}
                <div className="px-4 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-white/30">
                      <img 
                        src={userImg || "/placeholder.svg"} 
                        alt="User Avatar" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <p className="text-gray-800 font-semibold text-sm truncate">{getDisplayName()}</p>
                      <p className="text-gray-600 text-xs truncate">{user?.email}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <button 
                    onClick={handleViewProfile} 
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 text-sm"
                  >
                    <Eye size={16} />
                    <span>View Profile</span>
                  </button>
                  
                  <button 
                    onClick={handleLogout} 
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 text-sm"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Modal Login */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300" 
            onClick={() => setShowLogin(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
            {/* Close Button */}
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
              aria-label="Close login modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Login Component */}
            <Login 
              onClose={() => setShowLogin(false)} 
              onLoginSuccess={handleLoginSuccess} 
              isModal={true} 
            />
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm transition-opacity duration-300" 
            onClick={() => setShowProfile(false)}
          ></div>

          {/* Profile Modal Content */}
          <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl max-w-lg w-full mx-4 transform transition-all duration-300 scale-100 overflow-hidden">
            {/* Header with gradient background */}
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 px-6 py-8 text-white">
              {/* Close Button */}
              <button
                onClick={() => setShowProfile(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white z-10 transition-colors duration-200 p-2 rounded-full hover:bg-white/20"
                aria-label="Close profile modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Profile Header */}
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 shadow-lg mb-4">
                  <img 
                    src={userImg || "/placeholder.svg"} 
                    alt="Profile Avatar" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <h2 className="text-2xl font-bold mb-1">{getDisplayName()}</h2>
                <div className="flex items-center gap-2 text-white/80">
                  <User size={16} />
                  <span className="text-sm">GameVault Member</span>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
            </div>

            {/* Profile Content */}
            <div className="px-6 py-6 space-y-6">
              {/* Profile Info Cards */}
              <div className="grid gap-4">
                {/* Email Card */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 font-medium">Email Address</p>
                      <p className="text-gray-800 font-semibold truncate">{user?.email || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Join Date Card */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 font-medium">Last Login</p>
                      <p className="text-gray-800 font-semibold">
                        {user?.loginTime ? new Date(user.loginTime).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 'Unknown'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Account Status Card */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 font-medium">Account Status</p>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                        <span className="text-gray-600 text-sm">Verified Member</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg">
                  Edit Profile
                </button>
                <button 
                  onClick={() => {
                    setShowProfile(false)
                    setTimeout(() => handleLogout(), 300)
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </>
  )
}

export default Header