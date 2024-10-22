"use client";
import useStore from "@/app/zustand/useStore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Notification = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: "-50px" }}
      animate={{ opacity: 1, y: "50px" }}
      transition={{ duration: 0.5 }}
      whileInView={{
        type: "spring",
        damping: 15,
        stiffness: 300,
        delay: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="fixed top-0 right-0 bg-white p-4   text-sm h-[70px] w-[50vw] shadow-md shadow-slate-700 rounded-md"
      style={{ zIndex: 9999 }}
    >
      {message}
    </motion.div>
  );
};

export default Notification;
