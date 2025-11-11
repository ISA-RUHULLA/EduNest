import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Animated 404 Text */}
      <motion.h1
        className="text-9xl font-extrabold text-red-600"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        404
      </motion.h1>

      {/* Animated Subtitle */}
      <motion.p
        className="text-2xl text-gray-700 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Oops! Page not found.
      </motion.p>

      <motion.p
        className="text-gray-500 mt-2 text-center max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </motion.p>

      {/* Back to Home Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-6"
      >
        <Link
          to="/"
          className="btn btn-primary px-6 py-3 text-lg font-semibold"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
