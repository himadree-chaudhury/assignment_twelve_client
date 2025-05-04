import React, { useContext, useState } from "react";
import Title from "../Utilities/Title";
import useAuth from "../../../hooks/useAuth";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaMoon, FaSun, FaTimes } from "react-icons/fa";
import { FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import ThemeToggle from "../Utilities/ThemeToggle";
import { ThemeContext } from "../../../providers/ThemeProvider";

const Navbar = () => {
  // *Context States
  const { user = true, logOut } = useAuth();
  const [isDark] = useContext(ThemeContext);

  // *Data States
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // *Toggle Mobile Menu Open/Close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // *Styles For Active/Inactive Links
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      transition: "color ease-in-out",
      duration: "1s",
      ...(isActive && {
        backgroundImage:
          "linear-gradient(to right, oklch(58.87% 0.246 347.77), oklch(58% 0.18 340), oklch(58% 0.2 0))",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }),
    };
  };

  // *Handle Logout
  const handleLogout = () => {
    logOut()
      .then(() => {
        setIsMenuOpen(false);
        toast.success("Logout successful!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong. Try again");
      });
  };

  // *Animation Variants
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  // *Links For Mobile And Desktop Views
  const links = (isMobile = false) => (
    <>
      {isMobile ? (
        // *Mobile Links
        <>
          <motion.div variants={itemVariants}>
            <NavLink
              style={navLinkStyles}
              onClick={() => setIsMenuOpen(false)}
              to="/"
              className="block py-2"
            >
              Home
            </NavLink>
          </motion.div>
          <motion.div variants={itemVariants}>
            <NavLink
              style={navLinkStyles}
              onClick={() => setIsMenuOpen(false)}
              to="/all-biodata"
              className="block py-2"
            >
              All Biodata
            </NavLink>
          </motion.div>
          <motion.div variants={itemVariants}>
            <NavLink
              style={navLinkStyles}
              onClick={() => setIsMenuOpen(false)}
              to="/about-us"
              className="block py-2"
            >
              About Us
            </NavLink>
          </motion.div>
          <motion.div variants={itemVariants}>
            <NavLink
              style={navLinkStyles}
              onClick={() => setIsMenuOpen(false)}
              to="/contact-us"
              className="block py-2"
            >
              Contact Us
            </NavLink>
          </motion.div>
          {/* Conditional Rendering For Authenticated User */}
          {user ? (
            <>
              <motion.div variants={itemVariants}>
                <NavLink
                  style={navLinkStyles}
                  onClick={() => setIsMenuOpen(false)}
                  to="/dashboard"
                  className="block py-2"
                >
                  Dashboard
                </NavLink>
              </motion.div>
            </>
          ) : (
            <motion.div variants={itemVariants}>
              <NavLink
                style={navLinkStyles}
                onClick={() => setIsMenuOpen(false)}
                to="/login"
                className="block py-2"
              >
                Login
              </NavLink>
            </motion.div>
          )}
        </>
      ) : (
        // *Desktop Links
        <>
          <NavLink
            style={navLinkStyles}
            onClick={() => setIsMenuOpen(false)}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            style={navLinkStyles}
            onClick={() => setIsMenuOpen(false)}
            to="/all-biodata"
          >
            All Biodata
          </NavLink>
          <NavLink
            style={navLinkStyles}
            onClick={() => setIsMenuOpen(false)}
            to="/about-us"
          >
            About Us
          </NavLink>
          <NavLink
            style={navLinkStyles}
            onClick={() => setIsMenuOpen(false)}
            to="/contact-us"
          >
            Contact Us
          </NavLink>
          {/* Conditional Rendering For Authenticated User */}
          {user ? (
            <>
              <NavLink
                style={navLinkStyles}
                onClick={() => setIsMenuOpen(false)}
                to="/dashboard"
              >
                Dashboard
              </NavLink>
            </>
          ) : (
            <NavLink
              style={navLinkStyles}
              onClick={() => setIsMenuOpen(false)}
              to="/login"
            >
              Login
            </NavLink>
          )}
        </>
      )}
    </>
  );

  return (
    <div>
      {/* Navbar Container */}
      <motion.nav
        className="flex-centric font-button dark:shadow-text-secondary bg-background-light dark:bg-background-dark fixed top-0 left-0 z-[100] w-full justify-between gap-5 px-3 shadow-md xl:px-5"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Title />
        {/* Desktop Links */}
        <div className="flex-centric **:hover:text-text-secondary **:dark:hover:text-text-secondary-dark hidden gap-5 **:text-lg lg:flex">
          {links(false)}
        </div>

        <div className="flex-centric gap-3">
          {/* Profile Menu */}
          <Menu>
            <MenuButton>
              {/* User Profile Or Default Icon */}
              <motion.div
                className={`rounded-full p-2 ${
                  isDark
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-200 hover:bg-gray-300"
                } transition-colors duration-300`}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                <FiUser className="text-accent" />
              </motion.div>
            </MenuButton>
            <MenuItems
              anchor="bottom"
              className="bg-background-light dark:bg-background-dark font-button dark:shadow-text-secondary z-[100] mt-2 rounded-lg px-5 py-2 shadow-md"
            >
              {["Profile", "Login", "Logout"].map((profileMenu) => (
                <MenuItem>
                  <Link
                    className="hover:text-text-secondary dark:hover:text-text-secondary-dark flex-centric gap-2 text-lg dark:text-white"
                    to="/settings"
                  >
                    {profileMenu} <FiLogIn /> <FiLogOut />
                  </Link>
                  {/* <FiLogIn />
                  <FiLogOut /> */}
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>

          {/* Dark Mode Toggle Button */}
          <ThemeToggle />
          {/* Mobile Menu Toggle Button */}
          <motion.button
            onClick={toggleMenu}
            className={`rounded-md p-2 ${
              isDark
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            } flex transition-colors lg:hidden`}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isMenuOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="bg-background-light dark:bg-background-dark fixed top-16 left-0 z-[90] w-full overflow-hidden shadow-lg lg:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <motion.div className="flex flex-col items-start space-y-2 px-8 py-4 text-lg">
              {links(true)}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
