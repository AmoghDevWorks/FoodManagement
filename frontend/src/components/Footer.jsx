import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white w-full py-3">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
        {/* Logo & Tagline */}
        <div className="text-center md:text-left mb-2 md:mb-0">
          <h1 className="text-lg font-bold text-yellow-400">Left Over Love</h1>
          <p className="text-gray-400 text-xs">Turning surplus food into shared love.</p>
        </div>

        {/* Quick Links */}
        <div className="flex space-x-4 text-gray-400 text-xs">
          <a href="/" className="hover:text-yellow-400 transition">Home</a>
          <a href="/about" className="hover:text-yellow-400 transition">About</a>
          <a href="/donate" className="hover:text-yellow-400 transition">Donate</a>
          <a href="/contact" className="hover:text-yellow-400 transition">Contact</a>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-3 mt-2 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-yellow-400 transition">
            <FaFacebookF size={16} />
          </a>
          <a href="#" className="text-gray-400 hover:text-yellow-400 transition">
            <FaInstagram size={16} />
          </a>
          <a href="#" className="text-gray-400 hover:text-yellow-400 transition">
            <FaTwitter size={16} />
          </a>
          <a href="#" className="text-gray-400 hover:text-yellow-400 transition">
            <FaLinkedin size={16} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-xs mt-2">
        © {new Date().getFullYear()} Left Over Love. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
