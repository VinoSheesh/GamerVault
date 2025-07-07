"use client"

import { useState, useEffect } from "react"
import { CreditCard, Check, ArrowLeft } from "lucide-react"
import { toast } from "react-hot-toast"

function Payment({ reference, isActive, cartItems = [], totalAmount = 0, onBack, onPaymentComplete }) {
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

  useEffect(() => {
    // Reset state when component mounts or when new cart data comes in
    if (cartItems && cartItems.length > 0 && totalAmount > 0) {
      setCurrentStep("payment")
      setIsProcessing(false)
      setFormData({
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
    }
  }, [cartItems, totalAmount])

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
      // Basic validation
      if (paymentMethod === "credit-card") {
        if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
          toast.error("Please fill in all card details")
          return
        }
      }

      setCurrentStep("review")
    } else if (currentStep === "review") {
      setIsProcessing(true)
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false)
        setCurrentStep("confirmation")
        // Call payment complete callback with purchased items
        if (onPaymentComplete) {
          onPaymentComplete(cartItems)
        }
      }, 2000)
    } else if (currentStep === "confirmation") {
      // Reset everything when returning to store
      setCurrentStep("payment")
      setFormData({
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
      setIsProcessing(false)

      if (onBack) {
        onBack()
      }
    }
  }

  const handleBack = () => {
    if (currentStep === "review") {
      setCurrentStep("payment")
    } else if (currentStep === "payment") {
      if (onBack) {
        onBack()
      }
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
            <div className="text-blue-400">PayPal</div>
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
          <div className="flex justify-between items-center mt-4 text-lg font-bold">
            <span className="text-gray-300">Total</span>
            <span className="text-white">${totalAmount.toFixed(2)}</span>
          </div>
        </div>
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
          <span className="text-gray-300">Total Amount:</span>
          <span className="text-white font-medium">${totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )

  return (
    <section id="payment" className="" ref={reference}>
      <div className="">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-300 hover:text-white transition-colors"
            disabled={isProcessing}
          >
            <ArrowLeft size={20} />
            <span className="ml-2">Back</span>
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
                  <div className="flex justify-between items-center mt-4 text-lg font-bold">
                    <span className="text-gray-300">Total</span>
                    <span className="text-white">${totalAmount.toFixed(2)}</span>
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
    </section>
  )
}

export default Payment
