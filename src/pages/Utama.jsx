import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SideMenu from "../components/SideMenu";
import Header from "../pages/Header";
import Home from "./Home";

function Utama() {
  const [active, setActive] = useState(false);
  const [games, setGames] = useState([]);

  const handleToggleActive = () => {
    setActive(!active);
  };

  const fetchData = () => {
    fetch("http://localhost:5173/api/gamesData.json")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 border-black flex items-center gap-4 overflow-hidden bg-zinc-900">
      <SideMenu active={active} />

      <motion.div
        className="relative h-full rounded-l-2xl bg-black"
        animate={{
          width: active ? "calc(100% - 80px)" : "calc(100% - 240px)",
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        <Header toggleActive={handleToggleActive}  active={active} />
        <div className="container-fliud">
          <Home games={games} />
        </div>
      </motion.div>
    </div>
  );
}

export default Utama;
