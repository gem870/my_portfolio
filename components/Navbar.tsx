"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { motion, useMotionTemplate, useMotionValue, useMotionValueEvent, animate } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import MyPic from "@/components/asset/vitor.png";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#1E67C6", "#DD335C"];

const navLinks = [
  { title: "Home", path: "/home" },
  { title: "Project", path: "/project" },
  { title: "About", path: "/about" },
  { title: "Certificates", path: "/certificates" },
  { title: "Code Blog", path: "/codeblog" },
];

export const Navbar = () => {
  const [nav, setNav] = useState(false);
  const color = useMotionValue(COLORS_TOP[0]);
  const borderColor = useMotionValue(COLORS_TOP[0]);
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
  }, [color, borderColor]); // ✅ Fixed: Added missing dependencies

  useMotionValueEvent(color, "change", (latest) => {
    setCurrentColor(latest);
  });

  const backgroundImage = useMotionTemplate`radial-gradient(120% 120% at 20% 0%, #020303 20%, ${currentColor})`;
  const borderColorStyle = useMotionTemplate`${borderColor}`;

  const toggleNav = () => {
    setNav(!nav);
  };

  return (
    <>
      {/* Navbar for larger screens */}
      <div className="z-50 fixed w-full font-bold bg-opacity-40 backdrop-blur-3xl bg-black ">
        <motion.section style={{ backgroundImage, radius: 10 }} className="hidden md:flex absolute top-4 right-8 rounded-md">
          <ul className="flex flex-row p-2 space-x-6 border-2 border-gray-600 rounded-md bg-black/50 px-6 py-2">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.path} className="transform hover:text-white/60 transition-all text-gray-100 duration-300 ease-in-out">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </motion.section>
      </div>

      {/* Mobile Navbar */}
      <div className="z-50 fixed top-5 left-5 md:hidden">
        <div onClick={toggleNav} className="border rounded text-gray-300 border-gray-300 p-2">
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>

        <motion.section
          style={{ backgroundImage, radius: 10 }}
          className={`fixed top-0 right-0 w-2/3 h-full bg-black/90 transform transition-transform duration-300 ${nav ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex flex-col items-center border-b border-gray-600 p-3 rounded-full shadow-lg w-[100%] max-w-md">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white text-white">
              <Image src={MyPic} alt="Profile Picture" layout="fill" objectFit="cover" />
            </div>
            <h2 className="mt-1 text-xl font-bold text-white">E. Victor</h2>
            <p className="text-gray-400">Software Developer</p>
            <p className="text-center text-gray-300 text-sm">Passionate developer. Loves building innovative solutions.</p>
            <motion.button
              style={{
                border: `2px solid`,
                borderColor: borderColorStyle,
                boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.3)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex w-fit items-center shadow-2xl gap-2 rounded-md px-4 my-2 py-1 bg-gray-900 text-white transition-all"
            >
              <a href="/resume.pdf" download>Resume</a>
            </motion.button>
            <div className="mt-2 flex space-x-4 justify-center">
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
          </div>
          <ul className="flex flex-col items-center mt-6 space-y-4 h-full">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.path} onClick={() => setNav(false)} className="text-white">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </motion.section>
      </div>
    </>
  );
};
