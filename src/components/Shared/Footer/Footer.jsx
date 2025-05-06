import { Link } from "react-router";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

import Title from "../Utilities/Title";

const Footer = () => {
  // Dynamically calculate the current year for the copyright notice
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-dark text-text-primary-dark pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* About Section */}
          <div>
            {/* Logo and site name with a link to the homepage */}
            <Title />
            {/* Description of the website */}
            <p className="mb-4 text-gray-400">
              Discover, explore, and track your favorite partner with our
              comprehensive biodata. Add biodata to your favorites and keep up
              with the latest releases.
            </p>
            {/* Social media icons linking to external platforms */}
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors duration-300 hover:text-white"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors duration-300 hover:text-white"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors duration-300 hover:text-white"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors duration-300 hover:text-white"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            {/* Title for the quick links section */}
            <h3 className="mb-4">Quick Links</h3>
            {/* List of navigation links */}
            <ul className="space-y-2 *:text-gray-400 *:transition-colors *:duration-300 *:hover:text-white">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link>Guideline</Link>
              </li>
              <li>
                <Link>Terms & Conditions</Link>
              </li>
              <li>
                <Link>Privacy Policy</Link>
              </li>
              <li>
                <Link>Refund & Support</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="mb-4">Contact Us</h3>
            {/* Contact details displayed with icons */}
            <div className="space-y-3 *:flex *:items-center">
              <div>
                <FaEnvelope className="text-primary mr-2" />
                <span className="text-gray-400">contact@pathway.com</span>
              </div>
              <div>
                <FaPhone className="text-primary mr-2" />
                <span className="text-gray-400">+88 012-345-67890</span>
              </div>
              <div>
                <FaMapMarkerAlt className="text-primary mr-2" />
                <span className="text-gray-400">
                  123 Pathway Avenue, Couple City
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-400">
          {/* Dynamic copyright notice with the current year */}
          &copy; {currentYear} Pathway. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
