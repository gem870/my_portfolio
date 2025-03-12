"use client";
import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { motion, useMotionValue, useMotionValueEvent, animate } from "framer-motion";
import MyPic from "@/components/asset/vitor.png";
import Image from "next/image";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const AboutPage = () => {
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

  useMotionValueEvent(color, "change", (latest) => {
    setCurrentColor(latest);
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-gray-700 mt-16">
      <div className="w-full max-w-3xl p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col items-center justify-center mx-auto w-fit p-4 text-center"
        >
          <div
            className="relative w-40 h-40 rounded-full shadow-xl overflow-hidden border-4 text-white"
            style={{ borderColor: currentColor }}
          >
            <Image src={MyPic} alt="Profile Picture" fill className="object-cover" />
          </div>

          <h2 className="font-bold text-xl mt-4" style={{ color: currentColor }}>
            Emmanuel Chibuike Victor
          </h2>
          <p className="text-gray-700 font-bold">Software Developer</p>
        </motion.div>

        <h2 className="text-3xl font-bold text-[#2df7ad] mb-4">About Me</h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="bg-gray-100 rounded-md p-4 px-1 mb-4 bg-opacity-60 shadow-lg"
        >
          <p>
            Hello! I&apos;m Victor, a software developer based in Lagos, Nigeria. My journey started in
            Mechanical Engineering, where I honed my problem-solving skills and developed an analytical
            approach to tackling challenges. However, my passion for technology and innovation led me to
            pivot into software development. Today, I specialize in C++, Qt/QML, and have experience with
            the MERN stack (MongoDB, Express.js, React, Node.js) and Next.js, building robust, scalable
            applications across a variety of platforms.
          </p>
        </motion.div>

        {/* Additional Sections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="bg-gray-100 rounded-md p-4 px-1 mb-4 bg-opacity-60 shadow-lg"
        >
          <p>
            As a C++ developer, I&apos;m drawn to its efficiency and power, using it to create performance-critical
            software. My experience with Qt/QML allows me to develop cross-platform user interfaces with rich,
            interactive designs, combining functionality with aesthetics. In web development, the MERN stack lets
            me build dynamic, full-stack applications, while Git ensures seamless version control and collaboration
            on all my projects.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="bg-gray-100 rounded-md p-4 px-1 mb-4 bg-opacity-60 shadow-lg"
        >
          <p>
            Outside of coding, I enjoy learning new technologies, collaborating on open-source projects, and
            continuously pushing myself to grow as a developer. I&apos;m committed to building quality software
            that makes a difference, and I believe that through perseverance and curiosity, anything can be
            achieved.
          </p>
          <p className="font-bold my-2 py-1 bg-[#2df7ad] rounded-md pl-2 text-gray-700">
            Let&apos;s connect and create something amazing!
          </p>
        </motion.div>
        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="mt-6 mb-2 w-full text-center md:hidden"
        >
          <h3 className="text-lg font-semibold text-white">Skills</h3>
          <div className="mt-2 flex flex-wrap justify-center gap-2 text-sm text-gray-500">
            {["C++", "Qt/QML", "Python", "MERN stack", "Next.js", "Tailwind CSS", "Git"].map((skill) => (
              <span key={skill} className="px-3 py-1 border border-gray-500 rounded-lg">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Location */}
        <div className="flex items-center space-x-2">
          <FaMapMarkerAlt className="text-gray-400" />
          <span className="text-gray-500">Lagos, Nigeria</span>
        </div>

        {/* Academic Background */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.9 }}
          className="mt-6"
        >
          <h3 className="text-lg font-semibold text-[#2df7ad]">Academic Background</h3>
          <p className="text-gray-500">I studied Mechanical Engineering.</p>
          <p>Design and Manufacturing (Mechanics, Materials, and Production Engineering)</p>
          <p>This background helps me think systematically when designing software solutions.</p>
        </motion.div>

       {/* Quote */}
       <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9 }}
          className="bg-gray-100 rounded-md p-4 mt-4 px-1 mb-4 bg-opacity-60 shadow-lg"
        >
          <p>
            Quote: <br />
            When you have a dream, you&apos;ve got to grab it and never let go. There is nothing impossible for
            those who give it a try. The bad news is time flies, but the good news is you&apos;re the pilot.
          </p>
          <p className="font-bold my-2 py-1 bg-[#2df7ad] rounded-md pl-2 text-gray-700">
            Carol Burnett, Alexander the Great, and Michael Altshuler.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
