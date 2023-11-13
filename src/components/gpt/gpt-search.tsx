"use client";

import { useState } from "react";
import { Input } from "@nextui-org/react";
import GptCard from "./gpt-card";
import { GPT } from "@prisma/client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const tagVariant = {
  hidden: {
    opacity: 0,
    x: -10,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.1,
    },
  },
};

const motionProps = {
  initial: { scale: 0.6, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.6, delay: 0.1, type: "tween" },
};

export default function GptGrid({ gpts }: { gpts: GPT[] }) {
  const [currentTag, setCurrentTag] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleTagClick = (tag: string) => {
    setCurrentTag(tag);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const tags = Array.from(new Set(gpts.map((gpt) => gpt.tag)));

  const filteredGpts = gpts.filter((gpt) => {
    const isTagMatch = currentTag === "all" || currentTag === gpt.tag;
    const isSearchMatch =
      searchQuery.length === 0 ||
      gpt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gpt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gpt.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return isTagMatch && isSearchMatch;
  });

  return (
    <motion.section id="explore" className="flex flex-col my-24 items-center">
      <motion.h1 className="font-heading text-5xl text-center" {...motionProps}>
        Explore The FIRM
      </motion.h1>
      <motion.div
        {...motionProps}
        transition={{ delay: 0.3 }}
        className="w-full lg:w-1/2 my-4"
      >
        <Input
          type="text"
          label="Search"
          className="w-full"
          onChange={handleInput}
        />
      </motion.div>
      <motion.div
        className="flex flex-wrap gap-3 my-5 max-w-7xl justify-center items-center"
        variants={variants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.span
          className={cn(
            "px-2 py-1 border backdrop-blur-md rounded-md cursor-pointer",
            currentTag == "all" && "bg-primary"
          )}
          onClick={() => handleTagClick("all")}
          variants={tagVariant}
        >
          All
        </motion.span>
        {tags.map((tag, key) => {
          return (
            <motion.span
              key={key}
              className={cn(
                "px-2 py-1 border backdrop-blur-md rounded-md cursor-pointer",
                currentTag == tag && "bg-primary"
              )}
              onClick={() => handleTagClick(tag)}
              variants={tagVariant}
            >
              {tag}
            </motion.span>
          );
        })}
      </motion.div>
      <section
        id="collection"
        className="mt-10 lg:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {filteredGpts.map((gpt) => {
          return (
            <div key={gpt.id}>
              <GptCard gpt={gpt} />
            </div>
          );
        })}
      </section>
    </motion.section>
  );
}
