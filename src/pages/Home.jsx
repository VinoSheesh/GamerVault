import { useEffect, useState } from "react";
import GameSwiper from "../components/GameSwiper.jsx";
import GameCard from "../components/GameCard.jsx";

function Home({ games }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className={`home absolute w-full px-[30px] bottom-0 top-28 opacity-0 overflow-hidden transition-all duration-1000 z-[1] scrollbar-none ${
        isActive ? "translate-y opacity-100" : "translate-y-full"
      }`}
    >
      <div className="container-fluid">
        <div className="row">
          <GameSwiper games={games} />
        </div>

        

        <div className="flex mt-2">
          <GameCard></GameCard>
        </div>
      </div>
    </section>
  );
}

export default Home;
