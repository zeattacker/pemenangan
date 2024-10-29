import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Outlet } from "@remix-run/react";

const AnimatedOutlet = () => {
  const location = useLocation();

//   const pageVariants = {
//     initial: { x: "100%", opacity: 0 },
//     in: { x: 0, opacity: 1 },
//     out: { x: "-100%", opacity: 0 },
//   };

//   const pageTransition = {
//     type: "tween",
//     ease: "anticipate",
//     duration: 0.5,
//   };

  const pageVariants = {
    initial: { y: '100%' },
    in: { y: 0 },
    out: { y: '100%' }
  };

  const pageTransition = {
    type: 'spring',
    stiffness: 300,
    damping: 30
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedOutlet;
