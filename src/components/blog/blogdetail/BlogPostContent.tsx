'use client'
import { motion } from "motion/react";
import { MDXRemote } from "next-mdx-remote";
import { MDXComponents } from "@/components/blog/blogdetail/MDXComponents";
import { BlogPostImage } from "./BlogPostImage";
import type { BlogPost } from "@/lib/mdx";
import React from 'react'

interface BlogPostContentProps {
  post: BlogPost;
  mdxSource: any;
}

export function BlogPostContent({ post, mdxSource }: BlogPostContentProps) {
  return (
    <motion.article
      id="blog-content"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="lg:col-span-9 flex-1 prose prose-neutral dark:prose-invert max-w-none 
        prose-headings:font-bold prose-headings:tracking-tight prose-headings:mt-12 prose-headings:mb-6
        prose-h2:text-3xl prose-h3:text-2xl
        prose-p:text-base prose-p:leading-relaxed prose-p:my-6
        prose-a:text-black dark:prose-a:text-white prose-a:font-medium prose-a:no-underline prose-a:border-b prose-a:border-neutral-400 hover:prose-a:border-black dark:hover:prose-a:border-white
        prose-blockquote:border-l-2 prose-blockquote:border-neutral-300 dark:prose-blockquote:border-neutral-700 prose-blockquote:pl-6 prose-blockquote:italic
        prose-img:rounded-lg prose-img:my-12
        prose-code:text-sm prose-code:bg-neutral-100 dark:prose-code:bg-neutral-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
        prose-pre:bg-neutral-100 dark:prose-pre:bg-neutral-900 prose-pre:p-4 prose-pre:rounded-lg"
    >
      <BlogPostImage post={post} />
      <MDXRemote {...mdxSource} components={MDXComponents} />
    </motion.article>
  );
}