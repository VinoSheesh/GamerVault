import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

// Main LoginPage Component
function LoginPage({ onClose, onLoginSuccess, isModal = false }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyATGzh80LE68I1QjyQ8n89ZzI1NfUzAJ60",
    authDomain: "gamevaultweb-951a0.firebaseapp.com",
    databaseURL: "https://gamevaultweb-951a0-default-rtdb.firebaseio.com",
    projectId: "gamevaultweb-951a0",
    storageBucket: "gamevaultweb-951a0.firebasestorage.app",
    messagingSenderId: "732890053541",
    appId: "1:732890053541:web:ff455a255534d8e46dc64c",
    measurementId: "G-M6STPRHQV1"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // CSS Styles
  const styles = `
    body {
      background-color: #1111;
      overflow: hidden;
      font-family: 'Inter', sans-serif;
    }

    .bg-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 0;
      overflow: hidden;
    }

    .scrolling-row {
      display: flex;
      width: max-content;
      position: absolute;
      opacity: 0.20;
      z-index: 5;
    }

    .bg-image {
      width: 200px;
      height: 120px;
      object-fit: cover;
      margin: 4px;
      border-radius: 12px;
      flex-shrink: 0;
      filter: brightness(0.8) contrast(1.1);
      transition: all 0.3s ease;
    }

    .form-container {
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    }

    .input-field {
      background-color: rgba(30, 30, 30, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.2s ease;
    }

    .input-field:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
    }

    .eye-icon {
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .submit-button {
      background: linear-gradient(to right, #3b82f6, #2563eb);
      transition: all 0.2s ease;
    }

    .submit-button:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    }

    .submit-button:disabled {
      background: linear-gradient(to right, #64748b, #475569);
      cursor: not-allowed;
    }

    @keyframes scrollLeft {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    @keyframes scrollRight {
      0% { transform: translateX(-50%); }
      100% { transform: translateX(0); }
    }
  `;

  // Audio objects for sound effects
  const successSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3');
  const errorSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-buzz-950.mp3');

  // Game images array
  const images = [
    "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
    "https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg",
    "https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg",
    "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg",
    "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg",
    "https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg",
    "https://cdn.cloudflare.steamstatic.com/steam/apps/945360/header.jpg",
    "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg",
    "https://cdn.cloudflare.steamstatic.com/steam/apps/582660/header.jpg",
    "https://cdn.cloudflare.steamstatic.com/steam/apps/236390/header.jpg",
    "https://cdn.cloudflare.steamstatic.com/steam/apps/739630/header.jpg",
    "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
    "https://cdn.cloudflare.steamstatic.com/steam/apps/359550/header.jpg"
  ];

  // Eye icons components
  const EyeOpen = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  const EyeClosed = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );

  useEffect(() => {
    let styleElement;

    // Add styles (always add for full page, conditionally for modal)
    if (!isModal) {
      styleElement = document.createElement('style');
      styleElement.textContent = styles;
      document.head.appendChild(styleElement);

      // Add Tailwind
      if (!document.querySelector('script[src="https://cdn.tailwindcss.com"]')) {
        const tailwindScript = document.createElement('script');
        tailwindScript.src = 'https://cdn.tailwindcss.com';
        document.head.appendChild(tailwindScript);
      }

      // Add fonts
      if (!document.querySelector('link[href*="Inter"]')) {
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
        document.head.appendChild(fontLink);
      }
    }

    // Load SweetAlert
    if (!document.querySelector('script[src="https://cdn.jsdelivr.net/npm/sweetalert2@11"]')) {
      const sweetAlertScript = document.createElement('script');
      sweetAlertScript.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
      document.head.appendChild(sweetAlertScript);
      
      sweetAlertScript.onload = () => {
        setIsButtonDisabled(false);
      };
    } else {
      setIsButtonDisabled(false);
    }

    // Cleanup
    return () => {
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, [isModal]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Create user session data
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0],
        loginTime: new Date().toISOString()
      };

      // Store user session in localStorage
      localStorage.setItem('gameVaultUser', JSON.stringify(userData));

      // Play success sound
      successSound.load();
      successSound.play();

      // Show success message
      await Swal.fire({
        icon: 'success',
        title: 'Login Berhasil!',
        text: `Selamat datang, ${userData.displayName}`,
        background: '#fff',
        iconColor: '#10b981',
        confirmButtonColor: '#10b981',
        confirmButtonText: 'Lanjutkan'
      });

      // Dispatch custom event for session update
      window.dispatchEvent(new CustomEvent('loginSuccess', {
        detail: { user: userData }
      }));

      // Call onLoginSuccess if provided (for modal usage)
      if (onLoginSuccess) {
        onLoginSuccess(userData);
      }

      // Close modal if in modal mode
      if (isModal && onClose) {
        onClose();
      } else {
        // Navigate to home if not in modal mode
        navigate('/home');
      }

    } catch (error) {
      errorSound.play();

      let errorMessage = 'Terjadi kesalahan saat login';
      
      // Handle specific Firebase Auth errors
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Email tidak terdaftar';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Password salah';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Format email tidak valid';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Terlalu banyak percobaan. Coba lagi nanti';
          break;
        default:
          errorMessage = error.message;
      }

      Swal.fire({
        icon: 'error',
        title: 'Login Gagal!',
        text: errorMessage,
        background: '#fff',
        iconColor: '#ef4444',
        confirmButtonColor: '#ef4444',
        confirmButtonText: 'Coba Lagi'
      });
    }
  };

  // Render background rows (only for full page mode)
  const renderBackgroundRows = () => {
    if (isModal) return null;

    const numRows = 9;
    const rows = [];

    for (let i = 0; i < numRows; i++) {
      const isEven = i % 2 === 0;
      const rowImages = [];
      
      for (let j = 0; j < 20; j++) {
        rowImages.push(
          <img 
            key={j}
            src={images[j % images.length]} 
            className="bg-image" 
            alt={`Game ${j}`}
          />
        );
      }

      rows.push(
        <div 
          key={i}
          className="scrolling-row"
          style={{
            top: `${i * 15}%`,
            animation: `${isEven ? 'scrollLeft' : 'scrollRight'} ${80 + i * 10}s linear infinite`,
            transform: `rotate(${isEven ? -10 : 10}deg)`
          }}
        >
          {rowImages}
        </div>
      );
    }

    return rows;
  };

  // Different rendering for modal vs full page
  if (isModal) {
    return (
      <div className="p-8 w-full max-w-sm mx-auto">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Login</h2>
          <p className="text-gray-600 text-sm mt-1">
            Masuk ke akun GameVault Anda
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email">
              Alamat Email
            </label>
            <input 
              type="email" 
              id="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="you@gmail.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="password">
              Kata Sandi
            </label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                id="password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <button 
                type="button" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOpen /> : <EyeClosed />}
              </button>
            </div>
          </div>
          
          <div className="pt-2">
            <button 
              type="submit" 
              disabled={isButtonDisabled}
              className={`w-full py-3 rounded-xl text-white font-medium transition-all duration-200 ${
                isButtonDisabled 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg'
              }`}
            >
              {isButtonDisabled ? "Memuat..." : "Masuk"}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Belum punya akun?
            <Link to="/register" className="text-blue-500 hover:text-blue-600 ml-1.5 hover:underline font-medium">
              Daftar
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // Full page rendering
  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
      {/* Background with darker overlay */}
      <div className="bg-container">
        <div className="absolute inset-0 bg-black/95 z-1"></div>
        {renderBackgroundRows()}
      </div>

      {/* Login Form */}
      <div className="form-container bg-zinc-900/95 shadow-2xl rounded-2xl p-8 w-full max-w-sm z-20 relative">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-white">Login</h2>
          <p className="text-zinc-400 text-sm mt-1">
            Masuk ke akun GameVault Anda
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5" htmlFor="email">
              Alamat Email
            </label>
            <input 
              type="email" 
              id="email"
              className="input-field w-full px-4 py-3 rounded-xl focus:outline-none text-white"
              placeholder="you@gmail.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5" htmlFor="password">
              Kata Sandi
            </label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                id="password"
                className="input-field w-full px-4 py-3 rounded-xl focus:outline-none text-white pr-10"
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <button 
                type="button" 
                className="eye-icon absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-white"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOpen /> : <EyeClosed />}
              </button>
            </div>
          </div>
          
          <div className="pt-2">
            <button 
              type="submit" 
              disabled={isButtonDisabled}
              className="submit-button w-full py-3 rounded-xl text-white font-medium"
            >
              {isButtonDisabled ? "Memuat..." : "Masuk"}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-zinc-400 text-sm">
            Belum punya akun?
            <Link to="/register" className="text-blue-400 hover:text-blue-300 ml-1.5 hover:underline font-medium">
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;