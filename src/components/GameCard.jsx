import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
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
  
  const games = [
    {
      id: 1,
      title: "Assassin's Creed Shadows",
      edition: "Standard Edition",
      price: 69.99,
      image: "./assets/games/AssasinsShadow.jpg",
      isNew: true,
      discount: null,
    },
    {
      id: 2,
      title: "War Thunder",
      edition: "Standard Edition",
      originalPrice: 39.99,
      price: 19.99,
      image: "./assets/games/WarThunder.jpg",
      discount: 50,
    },
    {
      id: 3,
      title: "Hogwarts Legacy",
      edition: "Deluxe Edition",
      originalPrice: 49.99,
      price: 24.99,
      image: "./assets/games/Hogwarts.jpg",
      discount: 50,
    },
    {
      id: 4,
      title: "Black Myth Wukong",
      edition: "Standard Edition",
      price: 69.99,
      image: "./assets/games/Wukong.jpg",
      discount: null,
    },
    {
      id: 5,
      title: "Tom Clancy's Rainbow Six Siege",
      edition: "Standard Edition",
      price: 19.99,
      image: "./assets/games/RSS6.jpg",
      discount: null,
    },
    {
      id: 6,
      title: "Far Cry 6",
      edition: "Standard Edition",
      price: 59.99,
      image: "./assets/games/FarCry6.jpg",
      discount: null,
    },
    {
      id: 7,
      title: "Watch Dogs: Legion",
      edition: "Standard Edition",
      price: 49.99,
      image: "/api/placeholder/300/400",
      discount: null,
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
                        {/* Cover art container with fixed aspect ratio 3:4 */}
                        <div className="relative w-full pb-[133%]">
                          <img
                            src={game.image}
                            alt={game.title}
                            className="absolute inset-0 w-full h-full object-cover object-center"
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
                          <h3 className="text-sm lg:text-base font-bold font-poppins truncate">{game.title}</h3>
                          <p className="text-gray-400 font-montserrat text-xs lg:text-sm mb-2">{game.edition}</p>

                          <div className="flex items-center flex-wrap">
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
            {/* Custom pagination container */}
            <div className="swiper-pagination mt-4 flex justify-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
}