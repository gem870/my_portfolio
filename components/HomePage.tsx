"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useMotionValueEvent, animate } from "framer-motion";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const HomePage = () => {
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
  }, [color, borderColor]);

  // Update state whenever `color` changes
  useMotionValueEvent(color, "change", (latest) => {
    setCurrentColor(latest);
  });

  return (
    <motion.main
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="flex flex-col items-center w-full text-white mt-10"
    >
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="border-2 flex flex-col justify-center items-center text-center p-16 md:p-20 my-4 bg-gray-100 rounded-lg shadow-xl md:max-w-4xl"
        //style={{ borderColor: currentColor }} // ✅ Fix: Applied currentColor
      >
        <h1 className="text-2xl md:text-4xl font-bold" style={{ color: currentColor }}>
          Welcome to My Portfolio
        </h1>
        <p className="text-gray-800 mt-4 text-lg">
          I&apos;m Victor, a passionate software developer with a love for crafting efficient, user-friendly, and scalable
          solutions. Explore my projects to see how I turn complex ideas into elegant code. From sleek user interfaces
          to robust backend systems, my work showcases a commitment to clean design and cutting-edge technologies.
          Let&apos;s build something amazing together!
        </p>
      </motion.section>

      {/* Portfolio Section */}
      <section id="portfolio" className="w-full py-4 px-6 my-4 rounded-lg md:max-w-4xl">
        <h2 className="text-3xl font-bold text-center" style={{ color: currentColor }}>
          Explore...
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Projects */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 md:p-6 border-2 rounded-lg shadow-lg"
            //style={{ borderColor: borderColor.get() }}
          >
            <Link href="/project">
              <h3 className="text-xl font-semibold" style={{ color: currentColor }}>
                Projects
              </h3>
              <p className="text-gray-500">Get in touch with my projects.</p>
            </Link>
          </motion.div>

          {/* Certificates */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 md:p-6 border-2 rounded-lg shadow-lg"
            //style={{ borderColor: borderColor.get() }}
          >
            <Link href="/certificates">
              <h3 className="text-xl font-semibold" style={{ color: currentColor }}>
                Certificates
              </h3>
              <p className="text-gray-500">Get in touch with my certificates.</p>
            </Link>
          </motion.div>

          {/* Code Blog */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-4 md:p-6 border-2 rounded-lg shadow-lg"
            //style={{ borderColor: borderColor.get() }}
          >
            <Link href="/codeblog">
              <h3 className="text-xl font-semibold" style={{ color: currentColor }}>
                Code Blog
              </h3>
              <p className="text-gray-500">Explore my code with detailed information on how they work.</p>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </motion.main>
  );
};
