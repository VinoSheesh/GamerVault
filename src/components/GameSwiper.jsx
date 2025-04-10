import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

// Swiper modules
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";

function GameSwiper({ games }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative w-[90%] pb-[30px] mx-auto">
      {/* Tombol Panah Kiri */}
      <div
        ref={prevRef}
        className="absolute z-50 top-1/2 left-2 -translate-y-1/2 bg-white/20 text-white p-3 rounded-full cursor-pointer hover:bg-white/50 ease-in-out duration-200"
      >
        <i className="bi bi-chevron-left text-xl" />
      </div>

      {/* Tombol Panah Kanan */}
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
        className="gameSwiper cursor-pointer"
      >
        {games.map((game) => (
          <SwiperSlide key={game._id} className="!w-[550px] !h-[320px]">
            <div className="relative w-full h-full bg-center bg-cover p-7 overflow-hidden after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:bg-[rgba(0,0,0,0.3)] after:!rounded-[20px] font-poppins">
              <img
                src={game.img}
                alt="Game Image"
                className="absolute left-0 top-0 w-full h-full object-cover object-center !rounded-[20px]"
              />

              <div className="content text-white relative z-10">
                <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
                <p className="mb-4">{game.description}</p>

                <div className="flex gap-3">
                  <a
                    href="#"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                  >
                    Order Now
                  </a>
                  <a
                    href="#"
                    className="px-4 py-2 bg-white/30 hover:bg-white/50 text-white rounded-md"
                  >
                    <i className="bi bi-play-fill mr-1" />
                    Play
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default GameSwiper;
