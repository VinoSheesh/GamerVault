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
    <div className="absolute top-0 left-0 right-0 bottom-0 p-8 border-black flex items-center gap-8 overflow-hidden bg-black">
      <SideMenu active={active} />

      <motion.div
        className="relative h-full rounded-2xl border border-[rgba(0,0,0,0.1)] bg-zinc-800 
          shadow-[-5px_-5px_15px_rgba(255,255,255,0.1),5px_5px_15px_rgba(0,0,0,0.35)]"
        animate={{
          width: active ? "calc(100% - 80px)" : "calc(100% - 240px)",
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        <Header toggleActive={handleToggleActive} />
        <div className="container-fliud">
          <Home games={games} />
        </div>
      </motion.div>
    </div>
  );
}

export default Utama;
