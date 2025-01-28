import { Link } from "react-router-dom";
import { TiWeatherDownpour } from "react-icons/ti";
import { IoOptions } from "react-icons/io5";
import { CiMap, CiSettings } from "react-icons/ci";
import { RiLogoutBoxRLine } from "react-icons/ri"; // Import the logout icon
import { useState } from "react";
import { useAuth } from "../Context/AuthContext"; // Import the useAuth hook

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logOut } = useAuth(); // Get the logOut function from the context

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="bg-gray-950 text-white w-20 rounded-2xl my-5 h-[91%] fixed top-0 left-7 flex flex-col items-center py-6 shadow-lg">
      {/* Brand/Logo */}
      <div className="text-xl font-bold mb-12 text-blue-400">Breez</div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-white mb-4" onClick={toggleMenu}>
        ☰
      </button>

      {/* Navigation Links */}
      <ul className={`space-y-8 ${isOpen ? "block" : "hidden"} md:block`}>
        <li>
          <Link
            to="/weather"
            className="flex flex-col items-center text-gray-400 hover:text-blue-400"
          >
            <TiWeatherDownpour className="text-3xl mb-1" />
            <span className="text-xs">Weather</span>
          </Link>
        </li>
        <li>
          <Link
            to="/cities"
            className="flex flex-col items-center text-gray-400 hover:text-blue-400"
          >
            <IoOptions className="text-3xl mb-1" />
            <span className="text-xs">Cities</span>
          </Link>
        </li>
        <li>
          <Link
            to="/maps"
            className="flex flex-col items-center text-gray-400 hover:text-blue-400"
          >
            <CiMap className="text-3xl mb-1" />
            <span className="text-xs">Maps</span>
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className="flex flex-col items-center text-gray-400 hover:text-blue-400"
          >
            <CiSettings className="text-3xl mb-1" />
            <span className="text-xs">Settings</span>
          </Link>
        </li>
        {/* Logout Icon */}
        <li>
          <button
            onClick={logOut}
            className="flex flex-col items-center text-gray-400 hover:text-red-500"
          >
            <RiLogoutBoxRLine className="text-3xl mb-1" />
            <span className="text-xs">Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
