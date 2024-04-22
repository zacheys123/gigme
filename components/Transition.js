"use client";

import { motion } from "framer-motion";

export default function Transition({
  children,
  variant,
  className,
  navStates,
}) {
  return (
    <>
      {navStates ? (
        <motion.h3
          initial={variant.initial}
          animate={variant.animate}
          transition={variant.transition}
          className={className}
        >
          {children}
        </motion.h3>
      ) : (
        <motion.div
          //   initial={initialStyle}
          //   animate={animateStyle}
          //   transition={transitionStyle}
          initial={variant.initial}
          animate={variant.animate}
          transition={variant.transition}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}
