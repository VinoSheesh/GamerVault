import { useState, useRef } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
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
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function GameCard() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [likedGames, setLikedGames] = useState([]);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  
  // Genre icons mapping
  const genreIcons = {
    "Action RPG": <Swords size={12} />,
    "Combat Simulation": <Gamepad2 size={12} />,
    "Fantasy RPG": <Wand2 size={12} />,
    "Action Adventure": <Mountain size={12} />,
    "Tactical Shooter": <Target size={12} />,
    "Open World FPS": <Compass size={12} />,
    "Adventure": <Map size={12} />
  };
  
  const games = [
    {
      id: 1,
      title: "Assassin's Creed Shadows",
      edition: "Standard Edition",
      price: 69.99,
      image: "./assets/games/AssasinsShadow.jpg",
      isNew: true,
      discount: null,
      rating: 4.5,
      genre: "Action RPG"
    },
    {
      id: 2,
      title: "War Thunder",
      edition: "Standard Edition",
      originalPrice: 39.99,
      price: 19.99,
      image: "./assets/games/WarThunder.jpg",
      discount: 50,
      rating: 4.2,
      genre: "Combat Simulation"
    },
    {
      id: 3,
      title: "Hogwarts Legacy",
      edition: "Deluxe Edition",
      originalPrice: 49.99,
      price: 24.99,
      image: "./assets/games/Hogwarts.jpg",
      discount: 50,
      rating: 4.7,
      genre: "Fantasy RPG"
    },
    {
      id: 4,
      title: "Black Myth Wukong",
      edition: "Standard Edition",
      price: 69.99,
      image: "./assets/games/Wukong.jpg",
      discount: null,
      rating: 4.9,
      genre: "Action Adventure"
    },
    {
      id: 5,
      title: "Tom Clancy's Rainbow Six Siege",
      edition: "Standard Edition",
      price: 19.99,
      image: "./assets/games/RSS6.jpg",
      discount: null,
      rating: 4.3,
      genre: "Tactical Shooter"
    },
    {
      id: 6,
      title: "Far Cry 6",
      edition: "Standard Edition",
      price: 59.99,
      image: "./assets/games/FarCry6.jpg",
      discount: null,
      rating: 4.0,
      genre: "Open World FPS"
    },
    {
      id: 7,
      title: "Watch Dogs: Legion",
      edition: "Standard Edition",
      price: 49.99,
      image: "/api/placeholder/300/400",
      discount: null,
      rating: 3.8,
      genre: "Action Adventure"
    },
  ];

  // Group games into chunks of 6 for sliding
  const gameSlides = [];
  for (let i = 0; i < games.length; i += 6) {
    gameSlides.push(games.slice(i, i + 6));
  }

  const toggleLike = (gameId) => {
    setLikedGames((prev) => {
      if (prev.includes(gameId)) {
        return prev.filter((id) => id !== gameId);
      } else {
        return [...prev, gameId];
      }
    });
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

  return (
    <div className="bg-black text-white w-full">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-2">
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <div className="flex justify-start">
                <h2 className="font-bebas text-3xl md:text-4xl lg:text-5xl text-white">Hot Sale!</h2>
              </div>

              <div className="flex items-center justify-end text-white font-montserrat">
                <button
                  ref={navigationPrevRef}
                  className="p-2 rounded-full text-white hover:bg-gray-800"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  ref={navigationNextRef}
                  className="p-2 rounded-full text-white hover:bg-gray-800"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={1}
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              pagination={{ 
                clickable: true,
                el: '.swiper-pagination',
                bulletClass: 'swiper-pagination-bullet',
                bulletActiveClass: 'swiper-pagination-bullet-active'
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                swiper.params.navigation.nextEl = navigationNextRef.current;
              }}
              className="w-full"
            >
              {gameSlides.map((slideGames, slideIndex) => (
                <SwiperSlide key={slideIndex}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
                    {slideGames.map((game) => (
                      <div
                        key={game.id}
                        className="bg-zinc-900 rounded-lg overflow-hidden"
                        onMouseEnter={() => setHoveredCard(game.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        <div className="relative w-full pb-[133%]">
                          <img
                            src={game.image}
                            alt={game.title}
                            className="absolute inset-0 w-full h-full object-cover object-center hover:scale-[1.05] transition duration-50"
                          />
                          {game.isNew && (
                            <div className="absolute top-3 left-3 bg-white text-black text-xs font-bold px-2 py-1 rounded">
                              New
                            </div>
                          )}

                          <button
                            className={`absolute top-3 right-3 p-2 rounded-full bg-gray-900 bg-opacity-70 transition-opacity duration-200 ${
                              hoveredCard === game.id || likedGames.includes(game.id)
                                ? "opacity-100"
                                : "opacity-0"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              toggleLike(game.id);
                            }}
                          >
                            <Heart
                              size={20}
                              fill={likedGames.includes(game.id) ? "white" : "none"}
                              color="white"
                            />
                          </button>
                        </div>

                        <div className="p-3">
                          <h3 className="text-sm lg:text-base xl:text-lg font-bold font-poppins truncate">{game.title}</h3>
                          <p className="text-gray-400 font-montserrat text-xs lg:text-sm">{game.edition}</p>
                          
                          {/* Game Genre with icon */}
                          <div className="mt-1 mb-4">
                            <span className="inline-flex items-center gap-1 bg-gray-800 text-gray-300 text-xs px-2 py-0.5 rounded rounded-xl">
                              {genreIcons[game.genre]}
                              {game.genre}
                            </span>
                          </div>
                          
                          {/* Rating stars */}
                          <div className="mb-2">
                            {renderRatingStars(game.rating)}
                          </div>

                          <div className="flex items-center flex-wrap mt-2">
                            {game.discount ? (
                              <>
                                <span className="bg-red-600 text-white px-1 py-0.5 text-xs font-bold mr-1">
                                  -{game.discount}%
                                </span>
                                <span className="text-gray-400 line-through text-xs mr-1">
                                  ${game.originalPrice}
                                </span>
                                <span className="text-white text-sm font-bold">
                                  ${game.price}
                                </span>
                              </>
                            ) : (
                              <span className="text-white text-sm font-bold">
                                ${game.price}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
           
          </div>
        </div>
      </div>
    </div>
  );
}