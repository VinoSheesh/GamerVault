import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import GameCard from "../components/GameCard";
import GameSwiper from "../components/GameSwiper.jsx";

function Home({ games, reference, isActive, onAddToCart }) {
  const [mounted, setMounted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [likedGames, setLikedGames] = useState([]);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const gameSlides = [];
  if (games && games.length > 0) {
    for (let i = 0; i < games.length; i += 5) {
      gameSlides.push(games.slice(i, i + 5));
    }
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
    <section
      id="home"
      ref={reference}
      className={`home absolute w-full overflow-y-auto px-[30px] bottom-0 top-28 opacity-0 transition-all duration-1000 z-[1] ${
        isActive && mounted ? "translate-y opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="container-fluid">
        <div className="row">
          <GameSwiper games={games} />
        </div>

        <div className="bg-black text-white w-full mt-6">
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
                        {slideGames.map((game) => (
                          <GameCard 
                            key={game._id}
                            game={game}
                            hoveredCardId={hoveredCard}
                            onHover={setHoveredCard}
                            onLikeToggle={toggleLike}
                            likedGames={likedGames}
                            onAddToCart={onAddToCart}
                          />
                        ))}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;