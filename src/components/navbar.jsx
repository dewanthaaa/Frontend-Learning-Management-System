import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex items-center gap-[60px] max-w-56">
      <img
        src="/assets/images/logos/logo2.svg"
        className="flex shrink-0 object-contain"
        alt="logo"
      />
      <ul className="flex items-center gap-10">
        <li className="font-semibold transition-all duration-300 hover:text-[#662FFF] text-white">
          <Link to="#">Home</Link>
        </li>
        <li className="font-semibold transition-all duration-300 hover:text-[#662FFF] text-white">
          <Link to="/pricing">Pricing</Link>
        </li>
        <li className="font-semibold transition-all duration-300 hover:text-[#662FFF] text-white">
          <Link to="#">Features</Link>
        </li>
        <li className="font-semibold transition-all duration-300 hover:text-[#662FFF] text-white">
          <Link to="#">Testimonials</Link>
        </li>
      </ul>
    </div>
  );
}
