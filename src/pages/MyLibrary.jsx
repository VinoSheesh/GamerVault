"use client"
import { Calendar, Download, Play, Star } from "lucide-react"

function MyLibrary({ purchasedGames = [], reference, isActive }) {
  const formatPurchaseDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const renderRatingStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} size={12} fill={star <= rating ? "gold" : "none"} color="gold" />
        ))}
        <span className="ml-1 text-xs text-gray-300">{rating.toFixed(1)}</span>
      </div>
    )
  }

  return (
    <section id="library" className="p-6" ref={reference}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Download size={20} className="text-white" />
        </div>
        <h1 className="text-2xl text-white font-bold">My Library</h1>
        <span className="bg-zinc-700 text-white text-sm px-2 py-1 rounded-full">
          {purchasedGames.length} {purchasedGames.length === 1 ? "Game" : "Games"}
        </span>
      </div>

      {purchasedGames && purchasedGames.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {purchasedGames.map((game) => (
            <div
              key={game._id}
              className="bg-zinc-800/50 rounded-xl overflow-hidden hover:bg-zinc-700/50 transition-all duration-300 group"
            >
              <div className="relative">
                <img
                  src={game.img || "/placeholder.svg"}
                  alt={game.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg"
                  }}
                />
                <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                  Owned
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <Play size={16} />
                    Play Now
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-white font-semibold text-lg mb-2 truncate">{game.title}</h3>

                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                    {game.category}
                  </span>
                  <span className="text-gray-400 text-xs">{game.level} Level</span>
                </div>

                {/* Rating */}
                <div className="mb-3">{renderRatingStars(game.rating || 0)}</div>

                {/* Purchase Date */}
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                  <Calendar size={14} />
                  <span>Purchased {formatPurchaseDate(game.purchaseDate)}</span>
                </div>

                {/* Price paid */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Paid:</span>
                  <span className="text-green-400 font-semibold">
                    ${game.discount > 0 ? (game.price * (1 - game.discount)).toFixed(2) : game.price.toFixed(2)}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Download size={14} />
                    Download
                  </button>
                  <button className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white text-sm py-2 px-3 rounded-lg transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Download size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl text-white font-semibold mb-2">No games in your library yet</h3>
          <p className="text-zinc-400 mb-6">Purchase some games to start building your collection!</p> 
        </div>
      )}
    </section>
  )
}

export default MyLibrary
