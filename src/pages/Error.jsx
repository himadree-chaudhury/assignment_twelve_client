import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { FiHeart, FiHome } from "react-icons/fi";

const Error = () => {
  const navigate = useNavigate();

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  // Animation variants for child elements
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  // Heartbeat animation for the icon
  const heartVariants = {
    beat: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const handleBackToHome = () => {
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-pink-50 to-white px-4 py-12">
      <title>Error | Pathway</title>
      <motion.div
        className="max-w-lg text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Error Icon with Heartbeat Animation */}
        <motion.div variants={itemVariants}>
          <motion.div
            className="mb-6 text-pink-500"
            variants={heartVariants}
            animate="beat"
          >
            <FiHeart className="mx-auto text-6xl" />
          </motion.div>
        </motion.div>

        {/* Error Message */}
        <motion.h1
          className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl"
          variants={itemVariants}
        >
          Oops! Something Went Wrong
        </motion.h1>

        <motion.p
          className="mb-6 text-lg leading-relaxed text-gray-600"
          variants={itemVariants}
        >
          It looks like we've hit a little bump on the road to love. Don't
          worry, our team is working on it. Let's get you back on track to
          finding your perfect match!
        </motion.p>

        {/* Error Code */}
        <motion.div
          className="mb-6 inline-block rounded-lg bg-pink-100 px-4 py-2 text-pink-700"
          variants={itemVariants}
        >
          Error 404 - Page Not Found
        </motion.div>

        {/* Back to Home Button */}
        <motion.div variants={itemVariants}>
          <button
            onClick={handleBackToHome}
            className="mx-auto flex items-center rounded-lg bg-pink-500 px-6 py-3 text-white transition duration-300 hover:bg-pink-600"
          >
            <FiHome className="mr-2" />
            Go Back
          </button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="mt-8 flex justify-center space-x-2"
          variants={itemVariants}
        >
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              className="h-3 w-3 rounded-full bg-pink-300"
              animate={{
                y: [0, -10, 0],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.3,
                },
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Error;
