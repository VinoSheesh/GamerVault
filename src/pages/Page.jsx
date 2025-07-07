"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CreditCard, ChevronLeft, ShieldCheck, Check } from "lucide-react"

const Payment = () => {
  const router = useRouter()
  const [cartItems, setCartItems] = useState([])
  const [totalAmount, setTotalAmount] = useState("0.00")
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    saveCard: false,
    billingAddress: {
      country: "United States",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
  })
  const [currentStep, setCurrentStep] = useState("payment") // payment, review, confirmation
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Get cart items from sessionStorage
    const storedCartItems = sessionStorage.getItem("cartItems")
    const storedTotalAmount = sessionStorage.getItem("totalAmount")

    if (storedCartItems) {
      try {
        setCartItems(JSON.parse(storedCartItems))
      } catch (error) {
        console.error("Error parsing cart items:", error)
        setCartItems([])
      }
    }

    if (storedTotalAmount) {
      setTotalAmount(storedTotalAmount)
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      })
    }
  }

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method)
  }

  const handleContinue = () => {
    if (currentStep === "payment") {
      setCurrentStep("review")
    } else if (currentStep === "review") {
      setIsProcessing(true)
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false)
        setIsComplete(true)
        setCurrentStep("confirmation")
        // Clear cart after successful payment
        sessionStorage.removeItem("cartItems")
      }, 2000)
    } else if (currentStep === "confirmation") {
      router.push("/")
    }
  }

  const handleBack = () => {
    if (currentStep === "review") {
      setCurrentStep("payment")
    } else if (currentStep === "payment") {
      router.back()
    }
  }

  const renderPaymentForm = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Payment Method</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === "credit-card" ? "border-blue-500 bg-blue-900/20" : "border-gray-700 bg-zinc-800/50"}`}
          onClick={() => handlePaymentMethodChange("credit-card")}
        >
          <div className="flex items-center gap-3">
            <CreditCard className="text-white" />
            <span className="text-white font-medium">Credit / Debit Card</span>
          </div>
        </div>

        <div
          className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === "paypal" ? "border-blue-500 bg-blue-900/20" : "border-gray-700 bg-zinc-800/50"}`}
          onClick={() => handlePaymentMethodChange("paypal")}
        >
          <div className="flex items-center gap-3">
            <div className="text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.384a.641.641 0 0 1 .632-.544h6.012c2.658 0 4.53.714 5.557 2.122.944 1.291.98 2.831.105 4.657-.32.67-.825 1.326-1.438 1.881 1.377.588 2.126 1.77 2.126 3.328 0 1.586-.714 2.886-2.06 3.765-1.211.79-2.87 1.18-4.926 1.18h-1.17l-.425 2.471a.641.641 0 0 1-.633.537h-1.598v-.044z" />
              </svg>
            </div>
            <span className="text-white font-medium">PayPal</span>
          </div>
        </div>
      </div>

      {paymentMethod === "credit-card" && (
        <div className="space-y-4 mt-6">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300 mb-1">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              className="w-full p-3 bg-zinc-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="cardName" className="block text-sm font-medium text-gray-300 mb-1">
              Name on Card
            </label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              value={formData.cardName}
              onChange={handleInputChange}
              placeholder="John Doe"
              className="w-full p-3 bg-zinc-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-300 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                className="w-full p-3 bg-zinc-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-300 mb-1">
                Security Code (CVV)
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                className="w-full p-3 bg-zinc-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="saveCard"
              name="saveCard"
              checked={formData.saveCard}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-300">
              Save this card for future purchases
            </label>
          </div>
        </div>
      )}

      {paymentMethod === "paypal" && (
        <div className="bg-zinc-800/50 p-6 rounded-lg mt-6 text-center">
          <p className="text-gray-300 mb-4">You will be redirected to PayPal to complete your purchase securely.</p>
          <div className="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="30" viewBox="0 0 124 33" fill="#009cde">
              <path d="M46.211 6.749h-6.839a.95.95 0 0 0-.939.802l-2.766 17.537a.57.57 0 0 0 .564.658h3.265a.95.95 0 0 0 .939-.803l.746-4.73a.95.95 0 0 1 .938-.803h2.165c4.505 0 7.105-2.18 7.784-6.5.306-1.89.013-3.375-.872-4.415-.97-1.142-2.694-1.746-4.985-1.746zM47 13.154c-.374 2.454-2.249 2.454-4.062 2.454h-1.032l.724-4.583a.57.57 0 0 1 .563-.481h.473c1.235 0 2.4 0 3.002.704.359.42.469 1.044.332 1.906zM66.654 13.075h-3.275a.57.57 0 0 0-.563.481l-.145.916-.229-.332c-.709-1.029-2.29-1.373-3.868-1.373-3.619 0-6.71 2.741-7.312 6.586-.313 1.918.132 3.752 1.22 5.031.998 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .562.66h2.95a.95.95 0 0 0 .939-.803l1.77-11.209a.568.568 0 0 0-.561-.658zm-4.565 6.374c-.316 1.871-1.801 3.127-3.695 3.127-.951 0-1.711-.305-2.199-.883-.484-.574-.668-1.391-.514-2.301.295-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.499.589.697 1.411.554 2.317zM84.096 13.075h-3.291a.954.954 0 0 0-.787.417l-4.539 6.686-1.924-6.425a.953.953 0 0 0-.912-.678h-3.234a.57.57 0 0 0-.541.754l3.625 10.638-3.408 4.811a.57.57 0 0 0 .465.9h3.287a.949.949 0 0 0 .781-.408l10.946-15.8a.57.57 0 0 0-.468-.895z" />
              <path d="M94.992 6.749h-6.84a.95.95 0 0 0-.938.802l-2.766 17.537a.569.569 0 0 0 .562.658h3.51a.665.665 0 0 0 .656-.562l.785-4.971a.95.95 0 0 1 .938-.803h2.164c4.506 0 7.105-2.18 7.785-6.5.307-1.89.012-3.375-.873-4.415-.971-1.142-2.694-1.746-4.983-1.746zm.789 6.405c-.373 2.454-2.248 2.454-4.062 2.454h-1.031l.725-4.583a.568.568 0 0 1 .562-.481h.473c1.234 0 2.4 0 3.002.704.359.42.468 1.044.331 1.906zM115.434 13.075h-3.273a.567.567 0 0 0-.562.481l-.145.916-.23-.332c-.709-1.029-2.289-1.373-3.867-1.373-3.619 0-6.709 2.741-7.311 6.586-.312 1.918.131 3.752 1.219 5.031 1 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .564.66h2.949a.95.95 0 0 0 .938-.803l1.771-11.209a.571.571 0 0 0-.565-.658zm-4.565 6.374c-.314 1.871-1.801 3.127-3.695 3.127-.949 0-1.711-.305-2.199-.883-.484-.574-.666-1.391-.514-2.301.297-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.501.589.699 1.411.554 2.317zM119.295 7.23l-2.807 17.858a.569.569 0 0 0 .562.658h2.822c.469 0 .867-.34.939-.803l2.768-17.536a.57.57 0 0 0-.562-.659h-3.16a.571.571 0 0 0-.562.482z" />
              <path d="M7.266 29.154l.523-3.322-1.165-.027H1.061L4.927 1.292a.316.316 0 0 1 .314-.268h9.38c3.114 0 5.263.648 6.385 1.927.526.6.861 1.227 1.023 1.917.17.724.173 1.589.007 2.644l-.012.077v.676l.526.298a3.69 3.69 0 0 1 1.065.812c.45.513.741 1.165.864 1.938.127.795.085 1.741-.123 2.812-.24 1.232-.628 2.305-1.152 3.183a6.547 6.547 0 0 1-1.825 2c-.696.494-1.523.869-2.458 1.109-.906.236-1.939.355-3.072.355h-.73c-.522 0-1.029.188-1.427.525a2.21 2.21 0 0 0-.744 1.328l-.055.299-.924 5.855-.042.215c-.011.068-.03.102-.058.125a.155.155 0 0 1-.096.035H7.266z" />
              <path d="M23.048 7.667c-.028.179-.06.362-.096.55-1.237 6.351-5.469 8.545-10.874 8.545H9.326c-.661 0-1.218.48-1.321 1.132L6.596 26.83l-.399 2.533a.704.704 0 0 0 .695.814h4.881c.578 0 1.069-.42 1.16-.99l.048-.248.919-5.832.059-.32c.09-.572.582-.992 1.16-.992h.73c4.729 0 8.431-1.92 9.513-7.476.452-2.321.218-4.259-.978-5.622a4.667 4.667 0 0 0-1.336-1.03z" />
              <path d="M21.754 7.151a9.757 9.757 0 0 0-1.203-.267 15.284 15.284 0 0 0-2.426-.177h-7.352a1.172 1.172 0 0 0-1.159.992L8.05 17.605l-.045.289a1.336 1.336 0 0 1 1.321-1.132h2.752c5.405 0 9.637-2.195 10.874-8.545.037-.188.068-.371.096-.55a6.594 6.594 0 0 0-1.017-.429 9.045 9.045 0 0 0-.277-.087z" />
            </svg>
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold text-white mt-8">Billing Address</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-1">
            Country/Region
          </label>
          <select
            id="country"
            name="billingAddress.country"
            value={formData.billingAddress.country}
            onChange={handleInputChange}
            className="w-full p-3 bg-zinc-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
          </select>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="billingAddress.address"
            value={formData.billingAddress.address}
            onChange={handleInputChange}
            placeholder="123 Main St"
            className="w-full p-3 bg-zinc-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">
              City
            </label>
            <input
              type="text"
              id="city"
              name="billingAddress.city"
              value={formData.billingAddress.city}
              onChange={handleInputChange}
              placeholder="New York"
              className="w-full p-3 bg-zinc-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-300 mb-1">
              State
            </label>
            <input
              type="text"
              id="state"
              name="billingAddress.state"
              value={formData.billingAddress.state}
              onChange={handleInputChange}
              placeholder="NY"
              className="w-full p-3 bg-zinc-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-300 mb-1">
            ZIP Code
          </label>
          <input
            type="text"
            id="zipCode"
            name="billingAddress.zipCode"
            value={formData.billingAddress.zipCode}
            onChange={handleInputChange}
            placeholder="10001"
            className="w-full p-3 bg-zinc-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  )

  const renderOrderReview = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Review Your Order</h2>

      <div className="bg-zinc-800/50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>

        <div className="space-y-4 mb-6">
          {cartItems.map((game) => (
            <div key={game._id} className="flex items-center gap-4">
              <img
                src={game.img || "/placeholder.svg"}
                alt={game.title}
                className="w-16 h-16 object-cover rounded"
                onError={(e) => {
                  e.target.src = "/placeholder.svg"
                }}
              />
              <div className="flex-1">
                <h4 className="text-white font-medium">{game.title}</h4>
                <p className="text-gray-400 text-sm">{game.category}</p>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">
                  ${game.discount > 0 ? (game.price * (1 - game.discount)).toFixed(2) : game.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Subtotal</span>
            <span className="text-white">${totalAmount}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-300">Tax</span>
            <span className="text-white">$0.00</span>
          </div>
          <div className="flex justify-between items-center mt-4 text-lg font-bold">
            <span className="text-gray-300">Total</span>
            <span className="text-white">${totalAmount}</span>
          </div>
        </div>
      </div>

      <div className="bg-zinc-800/50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Payment Method</h3>
        <div className="flex items-center gap-3">
          {paymentMethod === "credit-card" ? (
            <>
              <CreditCard className="text-white" />
              <div>
                <p className="text-white font-medium">Credit Card</p>
                <p className="text-gray-400 text-sm">
                  {formData.cardNumber ? `**** **** **** ${formData.cardNumber.slice(-4)}` : "No card provided"}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.384a.641.641 0 0 1 .632-.544h6.012c2.658 0 4.53.714 5.557 2.122.944 1.291.98 2.831.105 4.657-.32.67-.825 1.326-1.438 1.881 1.377.588 2.126 1.77 2.126 3.328 0 1.586-.714 2.886-2.06 3.765-1.211.79-2.87 1.18-4.926 1.18h-1.17l-.425 2.471a.641.641 0 0 1-.633.537h-1.598v-.044z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">PayPal</p>
                <p className="text-gray-400 text-sm">You'll be redirected to PayPal</p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-zinc-800/50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Billing Address</h3>
        <p className="text-white">
          {formData.billingAddress.address}
          <br />
          {formData.billingAddress.city}, {formData.billingAddress.state} {formData.billingAddress.zipCode}
          <br />
          {formData.billingAddress.country}
        </p>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-300">
        <ShieldCheck className="text-green-500" size={20} />
        <p>Your payment information is encrypted and secure.</p>
      </div>
    </div>
  )

  const renderConfirmation = () => (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
          <Check className="text-white" size={32} />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white">Thank You For Your Purchase!</h2>
      <p className="text-gray-300">Your order has been successfully processed.</p>

      <div className="bg-zinc-800/50 rounded-lg p-6 max-w-md mx-auto">
        <h3 className="text-lg font-semibold text-white mb-4">Order Details</h3>

        <div className="flex justify-between mb-2">
          <span className="text-gray-300">Order Number:</span>
          <span className="text-white font-medium">
            {Math.floor(Math.random() * 1000000)
              .toString()
              .padStart(6, "0")}
          </span>
        </div>

        <div className="flex justify-between mb-2">
          <span className="text-gray-300">Date:</span>
          <span className="text-white font-medium">{new Date().toLocaleDateString()}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span className="text-gray-300">Total Amount:</span>
          <span className="text-white font-medium">${totalAmount}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-300">Payment Method:</span>
          <span className="text-white font-medium">{paymentMethod === "credit-card" ? "Credit Card" : "PayPal"}</span>
        </div>
      </div>

      <div className="bg-zinc-800/50 rounded-lg p-6 max-w-md mx-auto">
        <h3 className="text-lg font-semibold text-white mb-4">What's Next?</h3>

        <ul className="text-left space-y-3">
          <li className="flex items-start gap-2">
            <div className="mt-1 text-green-500">
              <Check size={16} />
            </div>
            <span className="text-gray-300">Your games are now available in your library</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="mt-1 text-green-500">
              <Check size={16} />
            </div>
            <span className="text-gray-300">A receipt has been sent to your email</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="mt-1 text-green-500">
              <Check size={16} />
            </div>
            <span className="text-gray-300">You can download your games at any time</span>
          </li>
        </ul>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-300 hover:text-white transition-colors"
            disabled={isProcessing}
          >
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold text-white mx-auto">
            {currentStep === "payment" && "Checkout"}
            {currentStep === "review" && "Review Order"}
            {currentStep === "confirmation" && "Order Confirmation"}
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "payment" ? "bg-blue-600" : "bg-green-500"}`}
            >
              {currentStep === "payment" ? "1" : <Check size={16} />}
            </div>
            <div className={`w-16 h-1 ${currentStep === "payment" ? "bg-gray-700" : "bg-green-500"}`}></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === "payment" ? "bg-gray-700" : currentStep === "review" ? "bg-blue-600" : "bg-green-500"
              }`}
            >
              {currentStep === "payment" ? "2" : currentStep === "review" ? "2" : <Check size={16} />}
            </div>
            <div className={`w-16 h-1 ${currentStep === "confirmation" ? "bg-green-500" : "bg-gray-700"}`}></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "confirmation" ? "bg-green-500" : "bg-gray-700"}`}
            >
              {currentStep === "confirmation" ? <Check size={16} /> : "3"}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {currentStep === "payment" && renderPaymentForm()}
            {currentStep === "review" && renderOrderReview()}
            {currentStep === "confirmation" && renderConfirmation()}
          </div>

          {/* Order Summary Sidebar */}
          {currentStep !== "confirmation" && (
            <div className="md:w-80">
              <div className="bg-zinc-800/50 rounded-lg p-4 sticky top-8">
                <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>

                <div className="max-h-60 overflow-y-auto mb-4">
                  {cartItems.map((game) => (
                    <div key={game._id} className="flex items-center gap-2 mb-3">
                      <img
                        src={game.img || "/placeholder.svg"}
                        alt={game.title}
                        className="w-12 h-12 object-cover rounded"
                        onError={(e) => {
                          e.target.src = "/placeholder.svg"
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm font-medium truncate">{game.title}</h4>
                        <p className="text-gray-400 text-xs">
                          ${game.discount > 0 ? (game.price * (1 - game.discount)).toFixed(2) : game.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Subtotal</span>
                    <span className="text-white">${totalAmount}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-300">Tax</span>
                    <span className="text-white">$0.00</span>
                  </div>
                  <div className="flex justify-between items-center mt-4 text-lg font-bold">
                    <span className="text-gray-300">Total</span>
                    <span className="text-white">${totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {currentStep !== "confirmation" && (
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleContinue}
              disabled={isProcessing}
              className={`px-6 py-3 rounded-lg font-semibold ${
                isProcessing ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              } transition-colors flex items-center gap-2`}
            >
              {isProcessing ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : currentStep === "payment" ? (
                "Continue to Review"
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        )}

        {currentStep === "confirmation" && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleContinue}
              className="px-6 py-3 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Return to Store
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Payment
