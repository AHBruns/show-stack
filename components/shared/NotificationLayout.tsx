import React from "react";
import { motion } from "framer-motion";

export const NotificationLayout = ({ name, children }) => {
  return (
    <motion.div
      key={name}
      initial={{ x: 500 }}
      animate={{ x: 0 }}
      exit={{ x: 500, height: 0, marginBottom: 0, scale: 0 }}
      transition={{ ease: "easeInOut", duration: 1 }}
      className="w-full max-w-sm mb-4 bg-white rounded-lg shadow-lg pointer-events-auto"
    >
      {children}
    </motion.div>
  );
};
