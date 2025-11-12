import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn,} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-gray-200 py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-3">
            EduNest<span className="text-blue-400">.</span>
          </h2>
          <p className="text-gray-300 mb-4">
            EduNest is your digital learning nest — a platform where knowledge
            meets innovation. Learn anytime, anywhere, and build your future with confidence.
          </p>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} EduNest EdTech Ltd. <br />
            All rights reserved.
          </p>
        </div>

       
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
            <li><Link to="/courses" className="hover:text-blue-400 transition">Courses</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
          </ul>
        </div>

      
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2">
            <li><Link to="/faq" className="hover:text-blue-400 transition">FAQs</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-blue-400 transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-blue-400 transition">Terms & Conditions</Link></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a href="#" className="bg-blue-800 p-2 rounded-full hover:bg-blue-600 transition">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="bg-blue-800 p-2 rounded-full hover:bg-blue-600 transition">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="bg-blue-800 p-2 rounded-full hover:bg-blue-600 transition">
              <FaLinkedinIn size={18} />
            </a>
            <a href="#" className="bg-blue-800 p-2 rounded-full hover:bg-blue-600 transition">
              <FaXTwitter size={18} />
            </a>
          </div>

          <p className="mt-5 text-gray-400 text-sm">
            Stay connected and never stop learning with EduNest.
          </p>
        </div>
      </div>

      
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        Built with 💙 by EduNest Team
      </div>
    </footer>
  );
};

export default Footer;
