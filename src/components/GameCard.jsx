import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

export default function GameCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const [maxIndex, setMaxIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [likedGames, setLikedGames] = useState([]);
  
  const games = [
    {
      id: 1,
      title: "Assassin's Creed Shadows",
      edition: "Standard Edition",
      price: 69.99,
      image: "/api/placeholder/300/400",
      isNew: true,
      discount: null
    },
    {
      id: 2,
      title: "Skull and Bones",
      edition: "Standard Edition",
      originalPrice: 39.99,
      price: 19.99,
      image: "/api/placeholder/300/400",
      discount: 50
    },
    {
      id: 3, 
      title: "Skull and Bones Deluxe Edition",
      edition: "Deluxe Edition",
      originalPrice: 49.99,
      price: 24.99,
      image: "/api/placeholder/300/400",
      discount: 50
    },
    {
      id: 4,
      title: "Avatar: Frontiers of Pandora",
      edition: "Standard Edition",
      price: 69.99,
      image: "/api/placeholder/300/400",
      discount: null
    },
    {
      id: 5,
      title: "Tom Clancy's Rainbow Six Siege",
      edition: "Standard Edition",
      price: 19.99,
      image: "/api/placeholder/300/400",
      discount: null
    },
    {
      id: 6,
      title: "Far Cry 6",
      edition: "Standard Edition",
      price: 59.99,
      image: "/api/placeholder/300/400",
      discount: null
    },
    {
      id: 7,
      title: "Watch Dogs: Legion",
      edition: "Standard Edition",
      price: 49.99,
      image: "/api/placeholder/300/400",
      discount: null
    }
  ];

  useEffect(() => {
    const calculateVisibleCards = () => {
      const containerWidth = sliderRef.current?.offsetWidth || 0;
      const cardWidth = 280; // Approximate width of each card including margins
      const visibleCards = Math.floor(containerWidth / cardWidth);
      setMaxIndex(Math.max(0, games.length - visibleCards));
    };
    
    calculateVisibleCards();
    window.addEventListener('resize', calculateVisibleCards);
    
    return () => window.removeEventListener('resize', calculateVisibleCards);
  }, [games.length]);

  const slideNext = () => {
    setCurrentIndex(prevIndex => 
      prevIndex < maxIndex ? prevIndex + 1 : prevIndex
    );
  };

  const slidePrev = () => {
    setCurrentIndex(prevIndex => 
      prevIndex > 0 ? prevIndex - 1 : 0
    );
  };

  const toggleLike = (gameId) => {
    setLikedGames(prev => {
      if (prev.includes(gameId)) {
        return prev.filter(id => id !== gameId);
      } else {
        return [...prev, gameId];
      }
    });
  };

  return (
    <div className="bg-black text-white w-full">
      <div className=" mx-auto">
         <div className="flex gap-2">
            <button 
              onClick={slidePrev}
              disabled={currentIndex === 0}
              className={`p-2 rounded-full ${currentIndex === 0 ? 'text-gray-600' : 'text-white hover:bg-gray-800'}`}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={slideNext}
              disabled={currentIndex >= maxIndex}
              className={`p-2 rounded-full ${currentIndex >= maxIndex ? 'text-gray-600' : 'text-white hover:bg-gray-800'}`}
            >
              <ChevronRight size={24} />
            </button>

        <div className="relative overflow-hidden" ref={sliderRef}>
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 280}px)` }}
          >
            {games.map(game => (
              <div 
                key={game.id} 
                className="w-64 flex-shrink-0 mx-2 bg-gray-900 rounded-lg overflow-hidden"
                onMouseEnter={() => setHoveredCard(game.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative h-80">
                  <img 
                    src={game.image} 
                    alt={game.title} 
                    className="w-full h-full object-cover"
                  />
                  {game.isNew && (
                    <div className="absolute top-3 left-3 bg-white text-black text-xs font-bold px-2 py-1 rounded">
                      New
                    </div>
                  )}
                  
                  <button 
                    className={`absolute top-3 right-3 p-2 rounded-full bg-gray-900 bg-opacity-70 transition-opacity duration-200 ${
                      hoveredCard === game.id || likedGames.includes(game.id) ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={() => toggleLike(game.id)}
                  >
                    <Heart 
                      size={20} 
                      fill={likedGames.includes(game.id) ? "white" : "none"} 
                      color="white" 
                    />
                  </button>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-bold truncate">{game.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{game.edition}</p>
                  
                  <div className="flex items-center">
                    {game.discount ? (
                      <>
                        <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold mr-2">
                          -{game.discount}%
                        </span>
                        <span className="text-gray-400 line-through text-sm mr-2">
                          ${game.originalPrice}
                        </span>
                        <span className="text-white font-bold">
                          ${game.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-white font-bold">${game.price}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
