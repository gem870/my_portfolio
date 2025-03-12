"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion, useMotionTemplate, useMotionValue, useMotionValueEvent, animate } from "framer-motion";
import Link from "next/link";
import MyPic from "@/components/asset/vitor.png";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const ProfileBody = () => {
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
  }, [color, borderColor]); // ✅ Fixed: Added dependencies

  // Update state whenever `color` changes
  useMotionValueEvent(color, "change", (latest) => {
    setCurrentColor(latest);
  });

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #000 50%, ${currentColor})`;
  const borderColorStyle = useMotionTemplate`${borderColor}`;

  return (
    <motion.section style={{ backgroundImage }} className="h-screen md:flex flex-col justify-center items-center hidden">
      {/* Profile Container */}
      <div className="flex flex-col items-center border border-gray-700 p-6 rounded-2xl h-full my-20 shadow-lg w-[90%] max-w-md">
        {/* Profile Picture */}
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white text-white">
          <Image src={MyPic} alt="Profile Picture" layout="fill" objectFit="cover" />
        </div>

        {/* Name & Title */}
        <h2 className="mt-4 text-2xl font-bold text-white">E. Victor</h2>
        <p className="text-gray-400">Software Developer</p>

        {/* Bio */}
        <p className="mt-2 text-center text-gray-300 text-sm">
          Passionate developer with experience in C++, Qt/Qml and more. Loves building innovative solutions.
        </p>

        {/* Contact Information */}
        <div className="mt-4 flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-2">
            <FaEnvelope className="text-gray-400" />
            <span className="text-gray-300">ve48381@gmail.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-gray-400" />
            <span className="text-gray-300">Lagos, Nigeria</span>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-4 flex space-x-4">
          <Link href="https://github.com/gem870" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-white text-2xl hover:text-gray-400 transition" />
          </Link>
          <Link href="https://www.linkedin.com/in/chibuike-emmanuel-b8b29b269/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-white text-2xl hover:text-gray-400 transition" />
          </Link>
          <Link href="https://x.com/gem_vic" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-white text-2xl hover:text-gray-400 transition" />
          </Link>
        </div>

        {/* Skills */}
        <div className="mt-6 w-full text-center">
          <h3 className="text-lg font-semibold text-white">Skills</h3>
          <div className="mt-2 flex flex-wrap justify-center gap-2 text-sm text-gray-300">
            <span className="px-3 py-1 border border-gray-500 rounded-lg">C++</span>
            <span className="px-3 py-1 border border-gray-500 rounded-lg">Qt/Qml</span>
            <span className="px-3 py-1 border border-gray-500 rounded-lg">Python</span>
            <span className="px-3 py-1 border border-gray-500 rounded-lg">MERN stack</span>
            <span className="px-3 py-1 border border-gray-500 rounded-lg">Next.js</span>
            <span className="px-3 py-1 border border-gray-500 rounded-lg">Tailwind CSS</span>
            <span className="px-3 py-1 border border-gray-500 rounded-lg">Git</span>
          </div>
        </div>

        {/* Download Resume Button */}
        <motion.button
          style={{
            border: `2px solid`,
            borderColor: borderColorStyle, // Dynamic border color
            boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.3)",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex w-fit items-center gap-2 rounded-md px-6 my-4 py-3 bg-gray-900 text-white transition-all"
        >
          <a href="/e_victor_resume.pdf" download>Download Resume</a>
        </motion.button>
      </div>
    </motion.section>
  );
};
