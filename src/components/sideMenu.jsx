import React, { useState } from "react";
import NavListItem from "./NavListItem";
import navListData from "../data/NavListData";

function SideMenu() {
  const [navData, setNavData] = useState(navListData);
  return (
    <div className="w-1/5 h-full p-7 border-1 border-solid rounded-2xl border-gray-500 flex flex-col duration-100 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-zinc-800">
      <a
        href="#"
        className="inline-flex relative items-center justif gap-4 text-white text-6xl font-bold uppercase"
      >
        <img src="../src/assets/Vino.png" alt="" className="w-14" />
        <p className="font-bebas text-5xl flex items-center justify-center">
          GamerVault
        </p>
      </a>
      <ul className="w-full flex flex-col gap-2 mt-5">
        {navData.map((item) => (
          <NavListItem key={item._id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default SideMenu;
