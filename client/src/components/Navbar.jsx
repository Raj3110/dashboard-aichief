import React from "react";
import { Link, NavLink } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Navbar = ({ theme, setTheme }) => {
  const handleThemeChange = () => {
    if (localStorage.getItem("theme") === "light" || theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="shadow-xl bg-white text-black border-slate-800 z-[2000] py-4 fixed top-0 left-0 px-4 md:px-8 w-screen flex items-center justify-between">
      <h1 className="text-3xl font-semibold font-primary flex items-center justify-between gap-x-2">
        <a href="/">
          <img
            src="https://www.aichefmaster.com/assets/logo.jpeg"
            width={40}
            className="rounded-md"
            alt="logo"
          />
        </a>
        <a href="/">AIChefMaster</a>
      </h1>

      <div className="flex items-center">
        <ul className="hidden xl:flex xl:items-center h-full">
          <li
            key="home"
            className=" text-base font-medium  font-primary px-4 h-full  transition-all duration-300   py-2 hover:text-green-600"
          >
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>
        <button
          title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
          onClick={handleThemeChange}
          className="flex items-center justify-center rounded-md ml-4 px-2 py-2 bg-[#eaeaea] text-sm font-medium"
        >
          {theme === "light" ? (
            <MdDarkMode size={20} />
          ) : (
            <MdLightMode size={20} />
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
