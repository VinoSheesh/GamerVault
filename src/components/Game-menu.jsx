"use client"
import {
  X,
  Heart,
  Star,
  Download,
  Play,
  Share2,
  Monitor,
  HardDrive,
  Cpu,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"

export default function GameMenu({ game, isOpen, onClose, onAddToCart, onLikeToggle, likedGames, purchasedGames }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("overview")

  if (!isOpen || !game) return null

  // Mock data for game details (you can replace with real data)
  const gameImages = [
    game.img,
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ]

  const systemRequirements = {
    minimum: {
      os: "Windows 10 64-bit",
      processor: "Intel Core i5-8400 / AMD Ryzen 5 2600",
      memory: "8 GB RAM",
      graphics: "NVIDIA GTX 1060 / AMD RX 580",
      storage: "50 GB available space",
    },
    recommended: {
      os: "Windows 11 64-bit",
      processor: "Intel Core i7-10700K / AMD Ryzen 7 3700X",
      memory: "16 GB RAM",
      graphics: "NVIDIA RTX 3070 / AMD RX 6700 XT",
      storage: "50 GB available space (SSD)",
    },
  }

  const reviews = [
    {
      id: 1,
      user: "GameMaster2024",
      rating: 5,
      date: "2024-01-15",
      text: "Amazing game! The graphics are stunning and the gameplay is incredibly smooth. Highly recommended!",
      helpful: 24,
      verified: true,
    },
    {
      id: 2,
      user: "ProGamer",
      rating: 4,
      date: "2024-01-10",
      text: "Great game overall, but could use some optimization. Still worth playing!",
      helpful: 18,
      verified: true,
    },
    {
      id: 3,
      user: "CasualPlayer",
      rating: 5,
      date: "2024-01-08",
      text: "Perfect for both casual and hardcore gamers. Love the storyline!",
      helpful: 31,
      verified: false,
    },
  ]

  const isOwned = purchasedGames?.some((owned) => owned._id === game._id)
  const isLiked = likedGames?.includes(game._id)

  const calculateDiscountedPrice = (originalPrice, discount) => {
    return originalPrice * (1 - discount)
  }

  const renderRatingStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} size={16} fill={star <= rating ? "gold" : "none"} color="gold" />
        ))}
        <span className="ml-2 text-sm text-gray-300">{rating.toFixed(1)}</span>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gameImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + gameImages.length) % gameImages.length)
  }

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(game)
      toast.success(`${game.title} added to cart!`)
    }
  }

  const handleLike = () => {
    if (onLikeToggle) {
      onLikeToggle(game._id)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-zinc-900 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-700">
          <h1 className="text-2xl font-bold text-white">{game.title}</h1>
          <button onClick={onClose} className="p-2 hover:bg-zinc-700 rounded-lg transition-colors">
            <X size={24} className="text-white" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row h-full max-h-[calc(90vh-80px)]">
          {/* Left Side - Images and Media */}
          <div className="lg:w-2/3 p-6">
            {/* Main Image Carousel */}
            <div className="relative mb-4">
              <img
                src={gameImages[currentImageIndex] || "/placeholder.svg"}
                alt={`${game.title} screenshot ${currentImageIndex + 1}`}
                className="w-full h-80 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = "/placeholder.svg?height=400&width=600"
                }}
              />

              {gameImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-2 mb-6 overflow-x-auto">
              {gameImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-12 rounded border-2 transition-all ${
                    currentImageIndex === index ? "border-blue-500" : "border-transparent"
                  }`}
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg?height=60&width=80"
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Tabs */}
            <div className="border-b border-zinc-700 mb-4">
              <div className="flex gap-6">
                {["overview", "reviews", "requirements"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 px-1 text-sm font-medium transition-colors ${
                      activeTab === tab ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="overflow-y-auto max-h-64">
              {activeTab === "overview" && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">About This Game</h3>
                    <p className="text-gray-300 leading-relaxed">
                      {game.description ||
                        `Experience the ultimate ${game.category} adventure in ${game.title}. 
                      This ${game.level} level game offers incredible gameplay mechanics, stunning visuals, 
                      and an immersive storyline that will keep you engaged for hours. Perfect for both 
                      newcomers and veterans of the genre.`}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-white font-medium mb-1">Genre</h4>
                      <p className="text-gray-400">{game.category}</p>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Difficulty</h4>
                      <p className="text-gray-400">{game.level} Level</p>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Release Date</h4>
                      <p className="text-gray-400">January 2024</p>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">Developer</h4>
                      <p className="text-gray-400">Game Studio</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-zinc-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{review.user}</span>
                          {review.verified && (
                            <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">Verified</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {renderRatingStars(review.rating)}
                          <span className="text-gray-400 text-sm">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-3">{review.text}</p>
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-gray-400 hover:text-green-400 transition-colors">
                          <ThumbsUp size={16} />
                          <span className="text-sm">{review.helpful}</span>
                        </button>
                        <button className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors">
                          <ThumbsDown size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "requirements" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Minimum Requirements</h3>
                    <div className="bg-zinc-800 rounded-lg p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <Monitor size={16} className="text-blue-400" />
                        <span className="text-gray-300">OS: {systemRequirements.minimum.os}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Cpu size={16} className="text-blue-400" />
                        <span className="text-gray-300">Processor: {systemRequirements.minimum.processor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HardDrive size={16} className="text-blue-400" />
                        <span className="text-gray-300">Memory: {systemRequirements.minimum.memory}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Monitor size={16} className="text-blue-400" />
                        <span className="text-gray-300">Graphics: {systemRequirements.minimum.graphics}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HardDrive size={16} className="text-blue-400" />
                        <span className="text-gray-300">Storage: {systemRequirements.minimum.storage}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Recommended Requirements</h3>
                    <div className="bg-zinc-800 rounded-lg p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <Monitor size={16} className="text-green-400" />
                        <span className="text-gray-300">OS: {systemRequirements.recommended.os}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Cpu size={16} className="text-green-400" />
                        <span className="text-gray-300">Processor: {systemRequirements.recommended.processor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HardDrive size={16} className="text-green-400" />
                        <span className="text-gray-300">Memory: {systemRequirements.recommended.memory}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Monitor size={16} className="text-green-400" />
                        <span className="text-gray-300">Graphics: {systemRequirements.recommended.graphics}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <HardDrive size={16} className="text-green-400" />
                        <span className="text-gray-300">Storage: {systemRequirements.recommended.storage}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Game Info and Actions */}
          <div className="lg:w-1/3 p-6 border-l border-zinc-700">
            <div className="space-y-6">
              {/* Game Rating */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {renderRatingStars(game.rating)}
                  <span className="text-gray-400">({Math.floor(Math.random() * 1000) + 100} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">{game.category}</span>
                  <span className="text-gray-400 text-sm">{game.level} Level</span>
                </div>
              </div>

              {/* Price and Purchase */}
              <div className="bg-zinc-800 rounded-lg p-4">
                <div className="mb-4">
                  {game.discount > 0 ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-red-600 text-white px-2 py-1 text-sm font-bold rounded">
                          -{Math.round(game.discount * 100)}%
                        </span>
                        <span className="text-gray-400 line-through">${game.price.toFixed(2)}</span>
                      </div>
                      <div className="text-2xl font-bold text-white">
                        ${calculateDiscountedPrice(game.price, game.discount).toFixed(2)}
                      </div>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-white">
                      {game.price === 0 ? "Free" : `$${game.price.toFixed(2)}`}
                    </div>
                  )}
                </div>

                {isOwned ? (
                  <div className="space-y-2">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                      <Play size={20} />
                      Play Now
                    </button>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleLike}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    isLiked ? "bg-red-600 hover:bg-red-700 text-white" : "bg-zinc-700 hover:bg-zinc-600 text-gray-300"
                  }`}
                >
                  <Heart size={16} fill={isLiked ? "white" : "none"} />
                  {isLiked ? "Liked" : "Like"}
                </button>
                <button className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-gray-300 py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Share2 size={16} />
                  Share
                </button>
              </div>

              {/* Game Stats */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Game Stats</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Players</span>
                    <span className="text-white">{Math.floor(Math.random() * 10000) + 1000}+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Release Date</span>
                    <span className="text-white">Jan 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Size</span>
                    <span className="text-white">{Math.floor(Math.random() * 50) + 10} GB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Languages</span>
                    <span className="text-white">English, Spanish, French</span>
                  </div>
                </div>
              </div>

              {/* Developer Info */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Developer</h3>
                <div className="bg-zinc-800 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">GS</span>
                    </div>
                    <div>
                      <div className="text-white font-medium">Game Studio</div>
                      <div className="text-gray-400 text-sm">Verified Developer</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
