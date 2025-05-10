// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const Dropdown = ({ sortOptions, sortOption, setSortOption }) => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  // *Handle SortOptions
  return (
    <div className="relative z-[50]">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowSortDropdown(!showSortDropdown)}
        className="btn"
      >
        <span>
          {sortOptions.find((opt) => opt.value === sortOption)?.label}
        </span>
        <FiChevronDown
          className={`transition-transform ${showSortDropdown ? "rotate-180" : ""}`}
        />
      </motion.button>

      {showSortDropdown && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute right-0 z-10 mt-0 w-38 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
        >
          {sortOptions.map((option) => (
            <button
              key={option.value}
              className={`block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${sortOption === option.value ? "bg-gray-100 dark:bg-gray-700" : ""}`}
              onClick={() => {
                setSortOption(option.value);
                setShowSortDropdown(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};
export default Dropdown;
