import React from "react";
import { Search } from "lucide-react";

import userImg from "../assets/Profile.png";
function Header({ toggleActive, active }) {
  return (
    <header className="absolute fixed top-0 left-0 w-full flex justify-between items-center p-5 z-30 bg-transparent font-poppins  ">
      <a href="#" onClick={toggleActive} className="text-3xl text-white">
        <div
          className={`transform transition-transform duration-300 ${
            active ? "rotate-180" : "rotate-0"
          }`}
        >
          <i className="bi bi-chevron-right"></i>
        </div>
      </a>

      <div className="inline-flex items-center gap-5">
        <div className="relative text-white text-[1.5rem] w-[50px] h-[50px] rounded-[10px] shadow-[ -5px_-5px_15px_rgba(255,255,255,0.1),5px_5px_15px_rgba(0,0,0,0.35)] flex items-center justify-center no-underline hover:bg-zinc-400 duration-500 rounded-full">
          <a href="#">
            <i className="bi bi-heart"></i>
            <span className="absolute right-0 bottom-[20px] text-[0.8rem] font-extrabold w-[20px] h-[20px] p-[3px] text-white bg-red-600 rounded-full flex items-center justify-center font-poppins">
              0
            </span>
          </a>
        </div>

        <div className="relative text-white text-[1.5rem] w-[50px] h-[50px] rounded-[10px] shadow-[ -5px_-5px_15px_rgba(255,255,255,0.1),5px_5px_15px_rgba(0,0,0,0.35)] flex items-center justify-center no-underline hover:bg-zinc-400 duration-500 rounded-full">
          <a href="#">
            <i className="bi bi-bag"></i>
            <span className="absolute right-0 bottom-[20px] text-[0.8rem] font-extrabold w-[20px] h-[20px] p-[3px] text-white bg-red-600 rounded-full flex items-center justify-center font-poppins">
              0
            </span>
          </a>
        </div>

        <div className="w-[150px] h-[60px] flex justify-center items-center gap-2 rounded-[10px] shadow-[-5px_-5px_15px_rgba(255,255,255,0.1),5px_5px_15px_rgba(0,0,0,0.35)] font-montserrat">
          <a href="#" className="w-9 h-9">
            <img
              src={userImg}
              alt="User Image"
              className="w-full h-9 rounded-full "
            />
          </a>
          <div className="flex flex-col">
            <span className="text-white text-sm">Username</span>
            <a href="#" className="text-white text-xs">
              View Profile
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
