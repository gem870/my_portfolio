"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import DOMPurify from "dompurify";
import Link from "next/link";
import Image from "next/image";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

interface Project {
  _id: string;
  title: string;
  description: string;
  createdAt?: string;
  url: string;
  file?: string;
}

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const color = useMotionValue(COLORS_TOP[0]);
  const borderColor = useMotionValue(COLORS_TOP[0]);

  const MONGODN_URL = process.env.NEXT_PUBLIC_BACKEND_PROJECT_URL as string;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${MONGODN_URL}/api/project`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        console.log("Fetched projects:", data);
        setProjects(data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, [MONGODN_URL]);

  useEffect(() => {
    const controls = animate(color, COLORS_TOP, { ease: "easeInOut", duration: 10, repeat: Infinity, repeatType: "mirror" });
    const borderControls = animate(borderColor, COLORS_TOP, { ease: "easeInOut", duration: 10, repeat: Infinity, repeatType: "mirror" });

    return () => {
      controls.stop();
      borderControls.stop();
    };
  }, [color, borderColor]);

  const isVideo = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);
  const getMediaUrl = (file: string) => `${MONGODN_URL}${file}`;

  return (
    <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.9 }} className="pb-[12%] text-[#2df7ad] pt-12">
      <div className="mx-auto shadow-xl">
        <motion.section id="portfolio" className="pt-14 text-[#10c2aa]">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8">
            <div className="px-2">
              <h2 className="text-5xl font-bold">My <span className="text-gray-500">Projects</span></h2>
              <h4 className="mb-8 text-gray-400 text-md">Explore my projects and feel free to review the code on GitHub.</h4>

              {projects.length === 0 && <p>Please reload the page after 20sec.</p>}

              {projects.map((project) => (
                <div key={project._id} onClick={() => setSelectedProject(selectedProject === project._id ? null : project._id)} className="cursor-pointer py-2 group">
                  <p className="text-gray-400 text-lg mb-2">
                    {project.createdAt ? new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date(project.createdAt)) : "Date N/A"}
                  </p>
                  <h3 className={`text-3xl font-semibold transition-colors duration-300 ${selectedProject === project._id ? "text-gray-600" : "group-hover:text-gray-400"}`}>
                    {project.title}
                  </h3>
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={selectedProject === project._id ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }} className="overflow-hidden">
                    <div className="border-b-2 border-gray-400 my-4"></div>
                    <p className="text-gray-500" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.description) }} />
                    <Link href={project.url}>
                      <motion.button style={{ border: `2px solid`, borderColor: borderColor, boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.3)" }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex w-fit items-center bg-gray-200 shadow-2xl p-1 gap-2 rounded-md my-4 ml-2 text-[#22ac99] transition-all">
                        Review
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>

            {selectedProject !== null && (
              <motion.div key={selectedProject} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: "easeOut" }} className="flex h-[40%]">
                {(() => {
                  const selectedMedia = projects.find((p) => p._id === selectedProject)?.file;

                  if (!selectedMedia) {
                    return (
                      <div>
                        <div className="flex items-center shadow-lg justify-center text-gray-500  rounded-md p-4">
                        No media available for this project.
                      </div>
                      </div>
                    )
                  }

                  const mediaUrl = getMediaUrl(selectedMedia);

                  return isVideo(selectedMedia) ? (
                    <video src={mediaUrl} controls className="rounded-md shadow-lg transition-opacity duration-500 w-full h-auto" onError={(e) => console.error("Video failed to load", e)} />
                  ) : (
                    <Image src={mediaUrl} alt={projects.find((p) => p._id === selectedProject)?.title || ""} className="rounded-md shadow-lg transition-opacity duration-500" width={700} height={700} priority onError={(e) => console.error("Image failed to load", e)} />
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
