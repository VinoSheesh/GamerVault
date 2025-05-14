import { useState } from "react";
import { 
  Heart, 
  Star, 
  Swords, 
  Gamepad2, 
  Wand2, 
  Mountain, 
  Target, 
  Compass, 
  Map 
} from "lucide-react";

export default function GameCard({ game, hoveredCardId, onHover, onLikeToggle, likedGames }) {
  // Genre icons mapping
  const genreIcons = {
    "Action RPG": <Swords size={12} />,
    "Combat Simulation": <Gamepad2 size={12} />,
    "Fantasy RPG": <Wand2 size={12} />,
    "Action Adventure": <Mountain size={12} />,
    "Tactical Shooter": <Target size={12} />,
    "Open World FPS": <Compass size={12} />,
    "Adventure": <Map size={12} />,
    "MOBA": <Swords size={12} />,
    "Racing": <Compass size={12} />,
    "Battle Royale": <Target size={12} />,
    "Shooter": <Target size={12} />,
    "Sandbox": <Mountain size={12} />,
    "Action": <Swords size={12} />,
    "RPG": <Wand2 size={12} />,
    "Platformer": <Mountain size={12} />
  };

  // Improved function to render rating stars
  const renderRatingStars = (rating) => {
    // Create an array of 5 stars
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          if (star <= rating) {
            // Full star
            return <Star key={star} size={14} fill="gold" color="gold" />;
          } else if (star - 0.5 <= rating && star > rating) {
            // Half star
            return (
              <div key={star} className="relative">
                <Star size={14} color="gold" />
                <div className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%' }}>
                  <Star size={14} fill="gold" color="gold" />
                </div>
              </div>
            );
          } else {
            // Empty star
            return <Star key={star} size={14} color="gold" />;
          }
        })}
        <span className="ml-1 text-xs text-gray-300 font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Function to calculate discounted price
  const calculateDiscountedPrice = (originalPrice, discount) => {
    return originalPrice * (1 - discount);
  };

  // Function to determine if a game is new (for example, games with ID greater than 14)
  const isNewGame = (gameId) => {
    return gameId > 14;
  };

  return (
    <div
      className="bg-zinc-900 rounded-lg overflow-hidden w-56"
      onMouseEnter={() => onHover(game._id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="relative w-full pb-[125%]">
        <img
          src={game.img}
          alt={game.title}
          className="absolute inset-0 w-full h-full object-cover object-center hover:scale-[1.05] transition duration-50"
        />
        {isNewGame(game._id) && (
          <div className="absolute top-3 left-3 bg-white text-black text-xs font-bold px-2 py-1 rounded">
            New
          </div>
        )}

        <button
          className={`absolute top-3 right-3 p-2 rounded-full bg-gray-900 bg-opacity-70 transition-opacity duration-200 ${
            hoveredCardId === game._id || likedGames.includes(game._id)
              ? "opacity-100"
              : "opacity-0"
          }`}
          onClick={(e) => {
            e.preventDefault();
            onLikeToggle(game._id);
          }}
        >
          <Heart
            size={20}
            fill={likedGames.includes(game._id) ? "white" : "none"}
            color="white"
          />
        </button>
      </div>

      <div className="p-3">
        <h3 className="text-sm lg:text-base xl:text-lg font-bold font-poppins truncate">{game.title}</h3>
        <p className="text-gray-400 font-montserrat text-xs lg:text-sm">{game.level} Level</p>
        
        <div className="mt-1 mb-4">
          <span className="inline-flex items-center gap-1 bg-gray-800 text-gray-300 text-xs px-2 py-0.5 rounded rounded-xl">
            {genreIcons[game.category]}
            {game.category}
          </span>
        </div>
        
        {/* Rating stars */}
        <div className="mb-2">
          {renderRatingStars(game.rating)}
        </div>

        <div className="flex items-center flex-wrap mt-2">
          {game.discount > 0 ? (
            <>
              <span className="bg-red-600 text-white px-1 py-0.5 text-xs font-bold mr-1">
                -{Math.round(game.discount * 100)}%
              </span>
              <span className="text-gray-400 line-through text-xs mr-1">
                ${game.price.toFixed(2)}
              </span>
              <span className="text-white text-sm font-bold">
                ${calculateDiscountedPrice(game.price, game.discount).toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-white text-sm font-bold">
              {game.price === 0 ? "Free" : `$${game.price.toFixed(2)}`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}