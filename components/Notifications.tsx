import React from "react";
import { NotificationContext } from "../contexts/NotificationsContext";
import { AnimatePresence, motion } from "framer-motion";

export const Notifications = () => {
  const [state, dispatch, notifications] = React.useContext(
    NotificationContext
  );

  return (
    <div className="fixed inset-0 flex items-end justify-end pointer-events-none">
      <motion.div
        animate
        className="flex flex-col-reverse items-end w-full mx-4 transition-all duration-1000 ease-in-out"
      >
        <AnimatePresence>{notifications}</AnimatePresence>
      </motion.div>
    </div>
  );
};
