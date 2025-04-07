import React from "react";

function NavListItem({ item }) {
  return (
    <li className="">
      <a href="" className="text-white flex items-center gap-6 p-4 text-lg font-semibold font-poppins rounded-xl active:shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:bg-zinc-600 transition duration-400 ease-in-out cursor-pointer">
        <i className={`bi ${item.icon} text-2xl`}></i>
        <span>{item.name}</span>
      </a>
    </li>
  );
}

export default NavListItem;
