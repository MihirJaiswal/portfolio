import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/mdx";
import React from 'react'

interface BlogPostHeroProps {
  post: BlogPost;
}

export function BlogPostHero({ post }: BlogPostHeroProps) {
  return (
    <div className="mb-8">
      <div
      >
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
          <span className="bg-gradient-to-r uppercase from-neutral-500 via-black to-neutral-500 dark:from-neutral-400 dark:via-white dark:to-neutral-200 bg-clip-text text-transparent">
            {post.title}
          </span>
        </h2>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm sm:text-md md:text-xl text-neutral-600 dark:text-neutral-400 tracking-tight max-w-3xl leading-relaxed">
            {post.description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-neutral-600 dark:text-neutral-400 whitespace-nowrap">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readingTime}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-3">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tags/${tag}`}
              className="px-3 py-1 text-xs bg-neutral-100 dark:bg-neutral-800 rounded-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}