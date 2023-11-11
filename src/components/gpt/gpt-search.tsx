"use client";

import { useState } from "react";
import { Input } from "@nextui-org/react";
import GptCard from "./gpt-card";
import { GPT } from "@prisma/client";
import { cn } from "@/lib/utils";

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
      gpt.name.toLowerCase().includes(searchQuery.toLowerCase());
    return isTagMatch && isSearchMatch;
  });

  return (
    <section id="explore" className="flex flex-col my-24 items-center">
      <h1 className="font-heading text-5xl text-center">Explore GPTs</h1>
      <Input
        isRequired
        type="text"
        label="Search"
        className="w-full lg:w-1/2 my-4"
        onChange={handleInput}
      />
      <div className="flex flex-wrap gap-3 my-5 max-w-7xl justify-center items-center">
        <span
          className={cn(
            "px-2 py-1 border backdrop-blur-md rounded-md cursor-pointer",
            currentTag == "all" && "bg-primary"
          )}
          onClick={() => handleTagClick("all")}
        >
          All
        </span>
        {tags.map((tag, key) => {
          return (
            <span
              key={key}
              className={cn(
                "px-2 py-1 border backdrop-blur-md rounded-md cursor-pointer",
                currentTag == tag && "bg-primary"
              )}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </span>
          );
        })}
      </div>
      <section
        id="collection"
        className="mt-10 lg:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
      >
        {filteredGpts.map((gpt) => {
          return <GptCard key={gpt.id} gpt={gpt} />;
        })}
      </section>
    </section>
  );
}
