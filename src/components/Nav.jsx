import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className=" text-white px-10 py-5 flex flex-col md:flex-row md:items-center md:justify-between">
      <h1 className="font-bacley text-5xl mb-4 md:mb-0 md:text-6xl text-center md:text-left mt-1">
        Frame
      </h1>
      <div className="flex justify-center md:justify-end gap-6 md:gap-10 text-lg">
        <Link className="hover:text-yellow-500 transition-colors duration-300" to="/" >Home</Link>
        <Link className="hover:text-yellow-500 transition-colors duration-300" to="/cars" >Cars</Link>
        <Link className="hover:text-yellow-500 transition-colors duration-300" to="/minimal" >Minimal</Link>
        <Link className="hover:text-yellow-500 transition-colors duration-300" to="/black" >Black</Link>
      </div>
    </nav>
  );
};

export default Nav;
