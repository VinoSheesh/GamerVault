"use client"

import { useState, useEffect, useRef } from "react"
import { Toaster } from "react-hot-toast"
import SideMenu from "../components/sideMenu"
import Header from "../pages/Header"
import Home from "./Home"
import Categories from "./Categories"
import MyLibrary from "./MyLibrary"
import Bag from "./Bag"
import Payment from "./Payment"
import "./utama.css"

function Utama() {
  const [active, setActive] = useState(false)
  const [games, setGames] = useState([])
  const [activeSection, setActiveSection] = useState("home")
  const [cartItems, setCartItems] = useState([])
  const [paymentData, setPaymentData] = useState({ items: [], total: 0 })
  const [purchasedGames, setPurchasedGames] = useState([])

  const homeRef = useRef()
  const categoriesRef = useRef()
  const libraryRef = useRef()
  const bagRef = useRef()
  const paymentRef = useRef()

  const sections = [
    {
      name: "home",
      ref: homeRef,
      active: true,
    },
    {
      name: "categories",
      ref: categoriesRef,
      active: false,
    },
    {
      name: "library",
      ref: libraryRef,
      active: false,
    },
    {
      name: "bag",
      ref: bagRef,
      active: false,
    },
    {
      name: "payment",
      ref: paymentRef,
      active: false,
    },
  ]

  const handleToggleActive = () => {
    setActive(!active)
  }

  const handleSectionActive = (target) => {
    console.log("Switching to section:", target) // Debug log
    setActiveSection(target)

    sections.map((section) => {
      if (section.ref.current) {
        section.ref.current.classList.remove("active")
        if (section.ref.current.id === target) {
          section.ref.current.classList.add("active")
        }
      }
      return section
    })
  }

  const fetchData = () => {
    fetch("http://localhost:5173/api/gamesData.json")
      .then((res) => res.json())
      .then((data) => {
        setGames(data)
      })
      .catch((e) => console.log(e.message))
  }

  const handleAddToCart = (game) => {
    if (!cartItems.find((item) => item._id === game._id)) {
      setCartItems((prevItems) => [...prevItems, game])
      // Optional: You can also add sound effect here
      if (window.successSound) {
        window.successSound.play().catch(console.error)
      }
    }
  }

  const handleRemoveFromCart = (gameId) => {
    setCartItems(cartItems.filter((item) => item._id !== gameId))
  }

  const handleCheckout = (items, total) => {
    console.log("handleCheckout called with:", items, total) // Debug log

    // Ensure we have valid data
    if (!items || items.length === 0 || !total || total <= 0) {
      console.error("Invalid checkout data:", { items, total })
      return
    }

    setPaymentData({ items, total })
    handleSectionActive("payment")
  }

  const handlePaymentBack = () => {
    console.log("Going back to bag") // Debug log
    handleSectionActive("bag")
  }

  const handlePaymentComplete = (purchasedItems) => {
    // Add purchased games to library
    setPurchasedGames((prevPurchased) => {
      const newPurchased = [...prevPurchased]
      purchasedItems.forEach((game) => {
        if (!newPurchased.find((item) => item._id === game._id)) {
          newPurchased.push({
            ...game,
            purchaseDate: new Date().toISOString(),
            status: "owned",
          })
        }
      })
      return newPurchased
    })

    // Clear cart after successful payment
    setCartItems([])

    // Reset payment data completely
    setPaymentData({ items: [], total: 0 })

    // Clear sessionStorage
    sessionStorage.removeItem("cartItems")
    sessionStorage.removeItem("totalAmount")

    // Go back to home or library
    handleSectionActive("library")
  }

  useEffect(() => {
    fetchData()
    handleSectionActive("home")
  }, [])

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 border-black flex items-center gap-4 overflow-hidden bg-zinc-900">
      <SideMenu active={active} className="sticky" sectionActive={handleSectionActive} activeSection={activeSection} />

      <motion.div
        className="relative h-full rounded-l-2xl bg-black"
        animate={{
          width: active ? "calc(100% - 80px)" : "calc(100% - 240px)",
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        <Header toggleActive={handleToggleActive} active={active} cartItemsCount={cartItems.length} />

        <Toaster />

        <div className="container-fluid">
          <Home games={games} reference={homeRef} isActive={activeSection === "home"} onAddToCart={handleAddToCart} />
          <Categories
            games={games}
            reference={categoriesRef}
            isActive={activeSection === "categories"}
            onAddToCart={handleAddToCart}
          />
          <MyLibrary
            games={games}
            purchasedGames={purchasedGames}
            reference={libraryRef}
            isActive={activeSection === "library"}
            onAddToCart={handleAddToCart}
          />
          <Bag
            games={games}
            reference={bagRef}
            isActive={activeSection === "bag"}
            cartItems={cartItems}
            removeFromCart={handleRemoveFromCart}
            onCheckout={handleCheckout}
          />
          <Payment
            reference={paymentRef}
            isActive={activeSection === "payment"}
            cartItems={paymentData.items}
            totalAmount={paymentData.total}
            onBack={handlePaymentBack}
            onPaymentComplete={handlePaymentComplete}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default Utama
