"use client";
import * as React from "react";

import { motion } from "framer-motion";
import { Dialog } from "../ui/dialog";
const Modal = ({ children, width }) => {
  let variant = {
    initial: {
      y: ["1500px", "1000px", "600px", "400px", "200px", "0px", ""],
      opacity: [-10, -7, 0],
    },
    animate: {
      y: 0,
      opacity: [-10, -7, -5, -3, 1],
    },
    transition: {
      ease: "easeInOut",
      duration: 0.75,
    },
  };

  return (
    <motion.div className={width} variant={variant}>
      {children}
    </motion.div>
  );
};

export default Modal;
