"use client";

import { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import Image from "next/image";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const Certificate = () => {
  const color = useMotionValue(COLORS_TOP[0]);
  const borderColor = useMotionValue(COLORS_TOP[0]); // Border color animation

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
  }, [color, borderColor]); // Added dependencies

  const borderColorStyle = useMotionTemplate`${borderColor}`;

  const images = [
    "/certificates/maturity cert.jpg",
    "/certificates/Emmanuel cert.PNG",
    "/certificates/Adas certificates.PNG",
    "/certificates/Qt practical cert.PNG",
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.9 }}
      className="flex flex-col items-center justify-center text-white px-4 pt-20"
    >
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-[#2df7ad] mb-8 pb-2">
        My Certificates
      </h2>

      {/* Grid Layout for Certificates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {images.map((image, index) => (
          <div key={index} className="bg-gray-200 rounded-lg shadow-lg p-4 transition duration-300 transform hover:scale-105">
            {/* Certificate Image */}
            <div className="relative w-full h-64 overflow-hidden rounded-md">
              <div>
              <Image
                src={image}
                alt={`Certificate ${index + 1}`}
                className="object-cover rounded-md"
                layout="fill"
              />
              </div>
            </div>

            {/* Download Button */}
            <div className="mt-4 text-center">
              <a href={image} download>
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.2 }}
                  style={{
                    border: `2px solid`,
                    borderColor: borderColorStyle, // Dynamic border color
                    boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.3)",
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.85 }}
                  className="bg-gray-800 text-[#2df7ad] px-6 py-2 rounded-md transition duration-300 hover:bg-gray-700 hover:scale-105"
                >
                  Download Certificate
                </motion.button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};
