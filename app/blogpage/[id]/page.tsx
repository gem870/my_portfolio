"use client";

import { notFound, useParams } from "next/navigation";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // Highlight.js theme
import { motion } from "framer-motion";

const MONGODB_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

interface Blog {
  id: string;
  title: string;
  description: string;
  programmingLanguage: string;
  code: string;
}

export default function BlogPage() {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null); // ✅ Typed state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) {
      notFound();
      return;
    }

    const fetchBlog = async () => {
      try {
        const res = await fetch(`${MONGODB_URL}/api/blogs/${params.id as string}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          notFound();
        }

        const data: Blog = await res.json(); // ✅ Ensure type correctness
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [params.id]);

  useEffect(() => {
    if (blog) {
      hljs.highlightAll();
    }
  }, [blog]);

  const copyCode = () => {
    const codeBlock = document.getElementById("codeBlock") as HTMLElement;
    if (!codeBlock?.innerText) {
      alert("No code available to copy.");
      return;
    }

    if (navigator?.clipboard && typeof navigator.clipboard.writeText === "function") {
      navigator.clipboard.writeText(codeBlock.innerText)
        .then(() => alert("Code copied to clipboard!"))
        .catch((err) => {
          console.error("Clipboard API failed, using fallback.", err);
          fallbackCopy(codeBlock.innerText);
        });
    } else {
      fallbackCopy(codeBlock.innerText);
    }
  };

  const fallbackCopy = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("Code copied using fallback method!");
  };

  if (loading) {
    return <div className="w-full py-[25%] flex flex-col items-center justify-center"><p>Loading...</p></div>;
  }

  return (
    <div className="p-4 pt-20 xl:p-14">
      <div>
        <h2 className="text-5xl font-bold text-[#22ac99]">
          Code<span className="text-gray-500"> Blog</span>
        </h2>
        <h4 className="mb-8 text-gray-400 text-lg">
          Explore the code by using the button (copy) to highlight the whole code.
        </h4>
      </div>

      <div className="xl:flex">
        <div className="xl:w-[30%] xl:py-4 xl:pr-4">
          <h1 className="text-[#22ac99] text-2xl">{blog?.title}</h1>
          <p
            className="text-gray-500"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog?.description || "") }}
          />
        </div>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="xl:w-[70%] relative p-1 rounded-lg shadow-lg"
        >
          <button
            onClick={copyCode}
            className="absolute top-2 right-4 bg-gray-200 bg-opacity-60 text-gray-600 px-4 py-2 mt-2 rounded-md shadow-lg text-xs hover:bg-gray-300"
          >
            Copy
          </button>

          <pre id="codeBlock" className="text-white  rounded-lg overflow-x-auto ">
            <code className={`language-${blog?.programmingLanguage || "plaintext"}`}>
              {blog?.code || "Loading content..."}
            </code>
          </pre>
        </motion.section>
      </div>
    </div>
  );
}
