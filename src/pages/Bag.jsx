"use client"
import { ShoppingBag, Trash2 } from "lucide-react"
import { toast } from "react-hot-toast"

function Bag({ reference, cartItems = [], removeFromCart, onCheckout }) {
  // Ensure cartItems is always an array
  const safeCartItems = Array.isArray(cartItems) ? cartItems : []

  // Calculate total price
  const calculateTotal = () => {
    return safeCartItems.reduce((total, game) => {
      if (!game) return total
      const price = game.discount > 0 ? game.price * (1 - game.discount) : game.price
      return total + (isNaN(price) ? 0 : price)
    }, 0)
  }

  const handleCheckout = () => {
    console.log("Checkout clicked!") // Debug log

    if (safeCartItems.length === 0) {
      toast.error("Your cart is empty!")
      return
    }

    // Store cart items in sessionStorage to access them on the payment page
    const totalAmount = calculateTotal()
    sessionStorage.setItem("cartItems", JSON.stringify(safeCartItems))
    sessionStorage.setItem("totalAmount", totalAmount.toFixed(2))

    console.log("Stored in sessionStorage:", {
      cartItems: safeCartItems,
      totalAmount: totalAmount.toFixed(2),
    })

    if (onCheckout) {
      console.log("Calling onCheckout with:", safeCartItems, totalAmount) // Debug log
      onCheckout(safeCartItems, totalAmount)
    } else {
      console.error("onCheckout function not provided!") // Debug log
    }
  }

  return (
    <section id="bag" className="" ref={reference}>
      <div className="">
        <div className="flex items-center gap-3 mb-6">
          <ShoppingBag size={24} className="text-white" />
          <h1 className="text-2xl text-white font-bold">Your Cart</h1>
        </div>

        {safeCartItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400">Your cart is empty</p>
            <p className="text-gray-500 mt-2">Add some games to your cart to see them here</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {safeCartItems.map((game) => {
                if (!game) return null

                return (
                  <div key={game._id} className="bg-zinc-800/50 rounded-lg p-4 flex items-center gap-4">
                    <img
                      src={game.img || "/placeholder.svg"}
                      alt={game.title}
                      className="w-20 h-20 object-cover rounded"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg"
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{game.title}</h3>
                      <p className="text-gray-400 text-sm">{game.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">
                        ${game.discount > 0 ? (game.price * (1 - game.discount)).toFixed(2) : game.price.toFixed(2)}
                      </p>
                      {game.discount > 0 && (
                        <p className="text-gray-400 text-sm line-through">${game.price.toFixed(2)}</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(game._id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <Trash2 size={20} className="text-red-500" />
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="bg-zinc-800/50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400">Total</span>
                <span className="text-white font-bold text-xl">${calculateTotal().toFixed(2)}</span>
              </div>
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Bag
