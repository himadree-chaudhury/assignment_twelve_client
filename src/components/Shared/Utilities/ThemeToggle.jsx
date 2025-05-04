import { useContext } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa";
import { ThemeContext } from "../../../providers/ThemeProvider";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useContext(ThemeContext);

  // *Toggle Dark Mode
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(document.documentElement.classList.contains("dark"));
  };

  return (
    <motion.button
      onClick={toggleDarkMode}
      className={`rounded-full p-2 ${
        isDark
          ? "bg-gray-700 hover:bg-gray-600"
          : "bg-gray-200 hover:bg-gray-300"
      } transition-colors duration-300`}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
    >
      {isDark ? (
        <FaSun className="text-yellow-400" />
      ) : (
        <FaMoon className="text-gray-700" />
      )}
    </motion.button>
  );
};
export default ThemeToggle;
