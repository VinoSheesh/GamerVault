import React, { useState } from "react";
import NavListItem from "./NavListItem";
import navListData from "../data/NavListData";
import { motion, AnimatePresence } from "framer-motion";

function SideMenu({ active }) {
  return (
    <motion.div
      animate={{
        width: active ? "90px" : "250px",
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="h-full p-4 bg-zinc-800 rounded-2xl 
        shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col gap-4 overflow-hidden"
    >
      <AnimatePresence>
        <div className="flex items-center justify-center gap-[5px]">
          <img
            src="../src/assets/GamerVaultLogo.png"
            alt="Logo"
            className="w-16"
          />
          {!active && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="text-white font-bebas text-4xl h-full flex items-center pt-2"
            >
              GamerVault
            </motion.p>
          )}
        </div>
      </AnimatePresence>

      <ul className="flex flex-col gap-2 w-full">
        {navListData.map((item) => (
          <NavListItem key={item._id} item={item} isCollapsed={active} />
        ))}
      </ul>
    </motion.div>
  );
}

export default SideMenu;
