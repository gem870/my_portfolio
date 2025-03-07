"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useMotionValueEvent, animate } from "framer-motion";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export default function TopLayer() {
  const color = useMotionValue(COLORS_TOP[0]);
  const borderColor = useMotionValue(COLORS_TOP[0]); // Border color animation
  const [currentColor, setCurrentColor] = useState(COLORS_TOP[0]);

  useEffect(() => {
    const controls = animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });

    const borderControls = animate(borderColor, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });

    return () => {
      controls.stop();
      borderControls.stop();
    };
  }, [color, borderColor]); // ✅ Added missing dependencies

  // Update state whenever `color` changes
  useMotionValueEvent(color, "change", (latest) => {
    setCurrentColor(latest);
  });

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 40% 0%, #020303 40%, ${currentColor})`;

  return (
    <motion.section
      style={{ backgroundImage }}
      className="w-full md:hidden py-4 text-2xl pl-20 z-[5] fixed top-0 text-white"
    >
      E. Victor <span className="text-gray-400 text-xl">Portfolio</span>
    </motion.section>
  );
}
