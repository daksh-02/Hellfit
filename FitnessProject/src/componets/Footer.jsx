import React from "react";
import Logo from "../images/Logo.png";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo on the left */}
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-10 w-10" />
          <span className="ml-2 font-semibold text-lg">Your Company</span>
        </div>

        {/* Navigation Links in the middle */}
        <div className="flex space-x-4 items-center">
          <div className="text-white hover:text-gray-400 cursor-pointer">
            Home
          </div>
          <div className="text-white hover:text-gray-400 cursor-pointer">
            Exercises
          </div>
        </div>

        {/* Footer info */}
        <div className="text-sm text-center">
          <p>
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
          <p className="hover:text-gray-400 cursor-pointer">Privacy Policy</p>
          <p className="hover:text-gray-400 cursor-pointer">Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
