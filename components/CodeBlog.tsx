"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import DOMPurify from "dompurify";
import Link from "next/link";
import Image from "next/image";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

interface Project {
  _id: string;
  title: string;
  description: string;
  file?: string;
  createdAt?: string;
}

const CodeBlog = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const color = useMotionValue(COLORS_TOP[0]);
  const borderColor = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!BACKEND_URL) {
        console.error("❌ Backend URL is not defined. Check your .env.local file.");
        return;
      }

      try {
        const apiUrl = `${BACKEND_URL}/api/blogs`.replace(/([^:]\/)\/+/g, "$1"); // Prevent double slashes
        console.log("📡 Fetching data from:", apiUrl);
        
        const response = await fetch(apiUrl);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log("✅ API Response:", data);

        setProjects(data.projects || data);
      } catch (error) {
        console.error("❌ Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

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

  const isVideo = (url: string) => /\.(mp4|webm|ogg|mov|avi|mkv)$/i.test(url);

  const getMediaUrl = (file: string | undefined) => {
    if (!file) return "";
    const url = `${BACKEND_URL}/${file}`.replace(/([^:]\/)\/+/g, "$1");
    console.log("📸 Media URL:", url);
    return url;
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.9 }}
      className="text-[#2df7ad] h-screen"
    >
      <div className="mx-auto shadow-xl h-full">
        <motion.section id="portfolio" className="text-[#10c2aa] h-full">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8 h-full">
            <div className="px-2 custom-scroll overflow-y-auto pt-20">
              <h2 className="text-5xl font-bold">
                Code<span className="text-gray-500"> Blog</span>
              </h2>
              <h4 className="mb-8 text-gray-400 text-lg">
                Explore my codes and feel free to run them. Each section of the blogs has a snippet explaining how the code works.
              </h4>

              {projects.length === 0 ? (
                <p className="text-[#10c2aa]">Please reload the page after 20 seconds.</p>
              ) : (
                projects.map((project) => (
                  <div
                    key={project._id}
                    onClick={() => setSelectedProject(selectedProject === project._id ? null : project._id)}
                    className="cursor-pointer py-2 group"
                  >
                    <p className="text-gray-400 text-md">
                      {project.createdAt
                        ? new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date(project.createdAt))
                        : "Date N/A"}
                    </p>
                    <h3
                      className={`text-2xl font-semibold transition-colors duration-300 ${
                        selectedProject === project._id ? "text-gray-600" : "group-hover:text-gray-400"
                      }`}
                    >
                      {project.title}
                    </h3>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={selectedProject === project._id ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-b-2 border-gray-400 my-4"></div>
                      <p
                        className="text-gray-500"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.description) }}
                      />
                      <Link href={`/blogpage/${project._id}`}>
                        <motion.button
                          style={{
                            border: `0.5px solid`,
                            borderColor: borderColor,
                            boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.3)",
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex w-fit items-center bg-gray-200 shadow-2xl p-1 gap-2 rounded-md my-4 ml-2 text-[#22ac99] transition-all"
                        >
                          Review code
                        </motion.button>
                      </Link>
                    </motion.div>
                  </div>
                ))
              )}
            </div>

            {selectedProject !== null && (
              <motion.div
                key={selectedProject}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex h-[40%] lg:pt-24"
              >
                {(() => {
                  const selectedMedia = projects.find((p) => p._id === selectedProject)?.file;
                  const mediaUrl = getMediaUrl(selectedMedia);

                  if (!selectedMedia) {
                    return (
                      <div className="flex items-center justify-center text-gray-500 shadow-lg rounded-md p-4">
                        No media available for this blog.
                      </div>
                    );
                  }

                  return isVideo(selectedMedia) ? (
                    <div>
                      <video src={getMediaUrl(selectedMedia)} controls className="rounded-md shadow-lg transition-opacity duration-500 w-full h-auto py-6" />
                    </div>
                  ) : (
                    <div>
                      <Image
                        src={mediaUrl}
                        alt="Project Image"
                        width={700}
                        height={700}
                        className="rounded-md shadow-lg object-cover"
                        onError={(e) => console.error("❌ Image failed to load:", e)}
                      />
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </div>
        </motion.section>
      </div>
    </motion.section>
  );
};

export default CodeBlog;
