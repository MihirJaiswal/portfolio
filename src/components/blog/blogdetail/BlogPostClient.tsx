import { BlogPostContent } from "@/components/blog/blogdetail/BlogPostContent";
import { BlogPostHero } from "@/components/blog/blogdetail/BlogPostHero";
import { BlogPostSidebar } from "@/components/blog/blogdetail/BlogPostSidebar";
import PageNav from "@/components/navbar/PageNav"
import type { BlogPost } from "@/lib/mdx";
import React from "react";

interface BlogPostClientProps {
  post: BlogPost;
  mdxSource: any;
}

export default function BlogDetail({
  post,
  mdxSource,
}: BlogPostClientProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 dark:text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mb-12">
        <PageNav type="blog" isSlug />
        <BlogPostHero post={post} />
        <div className="flex flex-col lg:flex-row gap-10">
          <BlogPostContent post={post} mdxSource={mdxSource} />
          <BlogPostSidebar post={post} />
        </div>
      </div>
    </div>
  );
}