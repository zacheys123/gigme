"use client";

import { motion } from "framer-motion";

export default function Transition({
  children,
  variant,
  className,
  navStates,
  onClick,
}) {
  return (
    <>
      {navStates ? (
        <motion.div
          initial={variant.initial}
          animate={variant.animate}
          transition={variant.transition}
          className={className}
        >
          {children}
        </motion.div>
      ) : (
        <motion.div
          //   initial={initialStyle}
          //   animate={animateStyle}
          //   transition={transitionStyle}
          initial={variant.initial}
          animate={variant.animate}
          transition={variant.transition}
          className={className}
          onClick={onClick}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}
