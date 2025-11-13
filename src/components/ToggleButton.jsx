import React from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

const ToggleButton = ({ theme, toggleTheme }) => {
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={() => toggleTheme(!isDark)}
      className={`relative flex items-center justify-between w-14 h-7 rounded-full transition-colors duration-300 
        ${isDark ? "bg-gray-700" : "bg-yellow-400"}`}
      whileTap={{ scale: 0.9 }}
    >
      {/* সূর্য আইকন */}
      <motion.span
        initial={{ opacity: isDark ? 0 : 1 }}
        animate={{ opacity: isDark ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute left-1 text-yellow-800"
      >
        <Sun size={16} />
      </motion.span>

      {/* চাঁদ আইকন */}
      <motion.span
        initial={{ opacity: isDark ? 1 : 0 }}
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute right-1 text-white"
      >
        <Moon size={16} />
      </motion.span>

      {/* চলমান বল */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        className={`absolute w-5 h-5 rounded-full top-1 ${
          isDark ? "bg-white right-1" : "bg-gray-900 left-1"
        }`}
      />
    </motion.button>
  );
};

export default ToggleButton;
