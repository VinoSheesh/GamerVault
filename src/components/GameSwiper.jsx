import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";

function GameSwiper({ games }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const [selectedGame, setSelectedGame] = useState(null);

  const handleTrailerClick = (game) => {
    setSelectedGame(game);
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleCloseVideo = () => {
    setSelectedGame(null);
    if (swiperRef.current) {
      swiperRef.current.autoplay.start();
    }
  };

  return (
    <div className="relative w-[90%] pb-[30px] mx-auto">
      <div
        ref={prevRef}
        className="absolute z-50 top-1/2 left-2 -translate-y-1/2 bg-white/20 text-white p-3 rounded-full cursor-pointer hover:bg-white/50 ease-in-out duration-200"
      >
        <i className="bi bi-chevron-left text-xl" />
      </div>

      <div
        ref={nextRef}
        className="absolute z-50 top-1/2 right-2 -translate-y-1/2 bg-white/20 text-white p-3 rounded-full cursor-pointer hover:bg-white/50 ease-in-out duration-200"
      >
        <i className="bi bi-chevron-right text-xl" />
      </div>

      <Swiper
        effect="coverflow"
        grabCursor={true}
        loop={true}
        centeredSlides={true}
        slidesPerView="auto"
        speed={1000}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        coverflowEffect={{
          rotate: 35,
          stretch: 200,
          depth: 250,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Navigation, Autoplay]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="gameSwiper cursor-pointer z-10"
      >
        {games.map((game) => (
          <SwiperSlide key={game._id} className="!w-[550px] !h-[320px] group">
            <div className="relative w-full h-full p-7 overflow-hidden font-poppins group-hover:bg-black/40 transition-all duration-300 rounded-[20px]">

              <img
                src={game.img}
                alt={game.title}
                className="absolute left-0 top-0 w-full h-full object-cover object-center !rounded-[20px] transition-all duration-300 group-hover:filter group-hover:blur-sm"
              />

              <div
                className="relative z-10 text-white opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 text-center top-7"
              >
                <h2 className="text-5xl font-semibold mb-4 font-Bauhaus">{game.title}</h2>
                <p className="text-lg mb-6">{game.description}</p>
                <div className="flex justify-center gap-6">
                  <a
                    href="#"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-lg transition duration-300"
                  >
                    Order Now
                  </a>
                  <button
                    onClick={() => handleTrailerClick(game)}
                    className="px-6 py-3 bg-white/30 hover:bg-white/50 text-white rounded-md text-lg transition duration-300"
                  >
                    <i className="bi bi-play-fill mr-1" />
                    Watch Trailer
                  </button>
                </div>
              </div>

              {selectedGame && selectedGame._id === game._id && (
                <div className="absolute top-0 left-0 w-full h-full z-[9990] bg-black rounded-[20px] overflow-hidden">
                  <iframe
                    src={`${game.trailer}?autoplay=1`}
                    className="w-full h-full pointer-events-none"
                    title={`Trailer ${game.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedGame && (
        <div className="w-full flex justify-center mt-4">
          <button
            onClick={handleCloseVideo}
            className="z-[9999] w-8 h-8 bg-white/20 text-white text-md rounded-full hover:bg-red-500 transition duration-300 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default GameSwiper;
