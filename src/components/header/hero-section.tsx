"use client";

import { motion } from "framer-motion";

const motionProps = {
  initial: { y: 10, scale: 0.6, opacity: 0 },
  animate: { y: 0, scale: 1, opacity: 1 },
  transition: { duration: 0.4, type: "tween" },
};

export default function HeroSection() {
  return (
    <motion.section className="flex flex-col items-center justify-center my-0 lg:my-20">
      <motion.div className="shine shine-anim px-4 py-1 rounded-full border border-primary/20 btn-gradient my-2">
        <a href="#explore">Discover AI Workforce</a>
      </motion.div>
      <motion.h1 className="head-text text-center" {...motionProps}>
        Transform Your Business with{" "}
        <span className="orange-gradient">TheFirm</span>
      </motion.h1>
      <motion.h1 className="text-lg text-center" {...motionProps}>
        A Diverse Team of GPTs Ready for Any Task
      </motion.h1>
    </motion.section>
  );
}
