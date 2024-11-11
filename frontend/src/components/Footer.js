import React from "react";
import { Link } from "react-router-dom"; // Sử dụng nếu bạn dùng React Router
import caffee from "../assest/logocaffee.png";
import { FaFacebook, FaTwitter, FaGithub } from "react-icons/fa";
import { SiInstagram } from "react-icons/si";
import { BiSolidToTop } from "react-icons/bi";
import scrollTop from "../helper/scrollTop";

const Footer = () => {
  return (
    <footer className="bg-coffee-background text-coffee-dark border-t-2 py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 px-4 md:px-0">
        {/* Logo and About */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img
            src={caffee}
            alt="Coffee Shop Logo"
            className="w-auto h-auto max-w-[150px] max-h-[60px] object-contain"
          />
          <p className="text-sm max-w-xs mt-4">
            Welcome to CaFFEE, your ultimate coffee destination. Enjoy the
            finest brews and cozy vibes!
          </p>
          <p className="text-sm max-w-xs mt-2">
            Địa chỉ: Phòng 702, Tầng 7, Tòa nhà Central Plaza, số 17 Lê Duẩn,
            phường Bến Nghé, quận 1, Hồ Chí Minh.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <nav className="flex flex-col space-y-2">
            <div>
              <Link to="/" className="hover:text-coffee-brown transition-colors">
              Home
            </Link>
            </div>
            <div className=" flex gap-4">
              <Link
              to="/about"
              className="hover:text-coffee-brown transition-colors"
            >
              About Us
            </Link>
            <Link  className="hover:text-coffee-brown transition-colors">
              Cart
            </Link>
            <Link className="hover:text-coffee-brown transition-colors">
              Favorite
            </Link>
            <Link className="hover:text-coffee-brown transition-colors">
              Notifacaion
            </Link>
            </div>
            <div className="flex gap-4">
            <Link  className="hover:text-coffee-brown transition-colors">
              Products
            </Link>
            <Link  className="hover:text-coffee-brown transition-colors">
              Category
            </Link>
              <Link
              to="/menu"
              className="hover:text-coffee-brown transition-colors"
            >
              Our Menu
            </Link>
            </div>
            
            <Link
              to="/contact"
              className="hover:text-coffee-brown transition-colors"
            >
              Contact Us
            </Link>
            <div className="flex gap-4">
            <Link
              to="/booking"
              className="hover:text-coffee-brown transition-colors"
            >
              Book a Table
            </Link>
            <Link  className="hover:text-coffee-brown transition-colors">
              Tables
            </Link>
            </div>
            
          </nav>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6 justify-center md:justify-start">
          <a
            href="https://www.facebook.com/ddh.duyhung"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="w-6 h-6 hover:scale-110 transition-transform" />
          </a>
          <a
            href="https://www.instagram.com/duongduyhwng"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiInstagram className="w-6 h-6 hover:scale-110 transition-transform" />
          </a>
          <a
            href="https://github.com/duyhungduong"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="w-6 h-6 hover:scale-110 transition-transform" />
          </a>
          <a
            href="https://x.com/duongduyhwng"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="w-6 h-6 hover:scale-110 transition-transform" />
          </a>
          <button onClick={scrollTop}>
            <BiSolidToTop className="w-6 h-6 hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-slate-400 pt-4 text-center text-sm">
        <p>
          © 2024 CaFFEE. All Rights Reserved | Designed by Duong Duy Hung -
          B2103500
        </p>
      </div>
    </footer>
  );
};

export default Footer;
