import { div } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import GameSwiper from "../components/GameSwiper.jsx";

function Home({games}) {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsActive(true);
        }, 500); // Slider muncul setelah 500ms
        return () => clearTimeout(timer);
      }, []);
    return(
        <section
        id="home"
        className={`home absolute w-full top-[100vh] px-[30px] bottom-0 opacity-0 overflow-hidden transition-all duration-1000 origin-bottom z-[1000] scrollbar-none ${
          isActive ? "top-[100px] h-auto overflow-y-visible opacity-100" : ""
        }`}
      >
        <div className="container-fluid">
            <div className="row">
                <GameSwiper games={games} />
            </div>
        </div>
       </section>
    )
}

export default Home;