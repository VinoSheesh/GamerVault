import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function NavListItem({ item, isCollapsed }) {
  return (
    <li>
      <a
        href="#"
        className={`flex items-center 
          ${isCollapsed ? "justify-center" : "justify-start gap-4 pl-4"}
          h-14 w-full rounded-xl text-white font-poppins font-medium
          hover:bg-zinc-600 transition-colors duration-300
        `}
      >
        <motion.i
          className={`bi ${item.icon} ${isCollapsed ? 'text-xl' : 'text-2xl'}`}
      
          animate={{ scale: isCollapsed ? 1.4 : 1 }}
          transition={{ duration: 0.3 }}
        />
        <AnimatePresence>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="text-base"
            >
              {item.name}
            </motion.span>
          )}
        </AnimatePresence>
      </a>
    </li>
  );
}

export default NavListItem;
