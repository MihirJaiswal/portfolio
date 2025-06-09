'use client'
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MDXRemote } from "next-mdx-remote";
import type { BlogPost } from "@/lib/mdx";
import {
  Calendar,
  Clock,
} from "lucide-react";
import { FadeIn } from "@/components/animation/scroll-animations";
import PageNav from "@/components/navbar/PageNav";
import TableOfContents from "@/components/blog/TableOfContents";
import { MDXComponents } from "@/components/blog/MDXComponents";

interface BlogPostClientProps {
  post: BlogPost;
  mdxSource: any;
}

export default function BlogPostClient({
  post,
  mdxSource,
}: BlogPostClientProps) {



  
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 dark:text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation */}
        <PageNav type="blog" isSlug />

        {/* Hero Section */}
        <div className="mb-8">
          <FadeIn direction="up">
            <h1 className="text-3xl md:text-5xl lg:text-6xl bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent font-bold mb-5 tracking-tight leading-tight line-clamp-3">
              {post.title}
            </h1>

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
            {/*tags*/}
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
          </FadeIn>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main content */}
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
            <FadeIn direction="up" className="mb-16" delay={0.2}>
          <div className="relative aspect-[4/3] md:aspect-video w-full overflow-hidden rounded-sm border">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={1200}
              height={675}
              quality={100}
              priority
              className="w-full h-full aspect-video border border-neutral-300 dark:border-neutral-800 object-contain bg-white"
            />
          </div>
        </FadeIn>
            <MDXRemote {...mdxSource} components={MDXComponents} />
          </motion.article>
          
          {/* Table of contents - Desktop (Sticky) */}
          <motion.aside
            className="hidden lg:block lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="sticky top-8 h-fit">
              <TableOfContents items={post.tableOfContents || []} />
            </div>
          </motion.aside>
        </div>

        {/* Author bio */}
        <FadeIn direction="up" className="mt-16">
          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-12"/>
        </FadeIn>
      </div>
    </div>
  );
}