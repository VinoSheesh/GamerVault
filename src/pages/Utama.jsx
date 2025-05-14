import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SideMenu from "../components/SideMenu";
import Header from "../pages/Header";
import Home from "./Home";
import Categories from "./Categories";
import MyLibrary from "./MyLibrary";
import Bag from "./Bag";
import './utama.css';

function Utama() {
  const [active, setActive] = useState(false);
  const [games, setGames] = useState([]);
  const [activeSection, setActiveSection] = useState("home"); 
  const homeRef = useRef();
  const categoriesRef = useRef();
  const libraryRef = useRef();
  const bagRef = useRef();

  const sections = [
    {
      name: "home",
      ref: homeRef,
      active: false,
    },
    {
      name: "categories",
      ref: categoriesRef,
      active: false,
    },
    {
      name: "library",
      ref: libraryRef,
      active: false,
    },
    {
      name: "bag",
      ref: bagRef,
      active: false,
    },
  ];

  const handleToggleActive = () => {
    setActive(!active);
  };

  const handleSectionActive = target => {
    setActiveSection(target); 
    
    sections.map(section => {
      section.ref.current.classList.remove('active');
      if(section.ref.current.id === target) {
        section.ref.current.classList.add('active');
      }
      return section;
    });
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
    handleSectionActive("home");
  }, []);

  return (
    <div className="absolute h-[200dvh] top-0 left-0 right-0 bottom-0 border-black flex items-center gap-4 overflow-hidden bg-zinc-900">
      <SideMenu 
        active={active} 
        className="sticky" 
        sectionActive={handleSectionActive}
        activeSection={activeSection}
      />

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
        <Header toggleActive={handleToggleActive} active={active} />
        <div className="container-fliud">
          <Home games={games} reference={homeRef} isActive={activeSection === "home"} />
          <Categories games={games} reference={categoriesRef} isActive={activeSection === "categories"} />
          <MyLibrary games={games} reference={libraryRef} isActive={activeSection === "library"} />
          <Bag games={games} reference={bagRef} isActive={activeSection === "bag"} />
        </div>
      </motion.div>
    </div>
  );
}

export default Utama;