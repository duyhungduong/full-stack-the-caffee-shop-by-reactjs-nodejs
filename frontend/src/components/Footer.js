import React from "react";

import caffee from "../assest/logocaffee.png";
import { FaFacebook } from "react-icons/fa";
import { SiInstagram } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { BiSolidToTop } from "react-icons/bi";
import { FaYoutube } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import scrollTop from "../helper/scrollTop";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
  const changeLanguage= (lng) => {

  }

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
          <p className="text-sm max-w-xs mx-auto md:mx-0">
            Welcome to CaFFEE, your ultimate coffee destination. Enjoy the
            finest brews and cozy vibes!
          </p>
          <p className="text-sm max-w-xs mx-auto md:mx-0">
            Address: Khu II, 3/2 Street, Xuan Khanh, Ninh Kieu, Can Tho, VN
          </p>
          
        </div>

        {/* Contact Info */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p>350 Dong Van Cong Street, An Thoi, Binh Thuy, Can Tho City</p>
          <p>Email: hungb2103500@student.ctu.edu.vn</p>
          <p className="">Trụ sở chính: Công ty Cổ Phần Caffee Heritage
          </p>
          <p>ĐKKD: 0316 871719 do sở KHĐT TPHCM cấp lần đầu ngày 17/10/2024</p>
          <p className="">Hotline Đặt hàng: 1800 6779</p>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6 justify-center md:justify-start">
          <a
            href="https://facebook.com/CTUDHCT"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook
              // src="/path-to-your-icons/facebook-icon.png"
              // alt="Facebook"
              className="w-6 h-6 hover:scale-110 transition-all transform"
            />
          </a>
          <a
            href="https://zalo.me/CTUDHCT"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiZalo
              // src="/path-to-your-icons/facebook-icon.png"
              // alt="Facebook"
              className="w-6 h-6 hover:scale-110 transition-all transform"
            />
          </a>
          <a
            href="https://www.instagram.com/duongduyhwng"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiInstagram
              // src="/path-to-your-icons/instagram-icon.png"
              alt="Instagram"
              className="w-6 h-6 hover:scale-110 transition-all transform"
            />
          </a>
          <a
            href="https://www.youtube.com/CTUDHCT"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube 
              // src="/path-to-your-icons/instagram-icon.png"
              alt="Instagram"
              className="w-6 h-6 hover:scale-110 transition-all transform"
            />
          </a>
          <a
            href="https://github.com/duyhungduong"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub
              src="/path-to-your-icons/twitter-icon.png"
              alt="Github"
              className="w-6 h-6 hover:scale-110 transition-all transform"
            />
          </a>
          <a
            href="https://x.com/duongduyhwng"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter
              src="/path-to-your-icons/twitter-icon.png"
              alt="Twitter"
              className="w-6 h-6 hover:scale-110 transition-all transform"
            />
          </a>
          <a
            href="https://tiktok.com/@ctudhct"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok
              src="/path-to-your-icons/twitter-icon.png"
              alt="Twitter"
              className="w-6 h-6 hover:scale-110 transition-all transform"
            />
          </a>
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
