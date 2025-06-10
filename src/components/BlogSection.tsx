"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useGrayscaleStore } from "@/lib/store"
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { BlogPost } from "@/lib/mdx"

interface BlogSectionProps {
  posts: BlogPost[]
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const { isGrayscaleEnabled } = useGrayscaleStore()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredPost, setHoveredPost] = useState<string | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % posts.slice(0, 3).length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + posts.slice(0, 3).length) % posts.slice(0, 3).length)
  }

  const displayPosts = posts.slice(0, 3)

  return (
    <section className="pb-24 pt-8 md:pt-0 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gradient-to-b dark:from-background dark:to-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block">
            <h2 className="text-6xl lg:text-7xl font-black tracking-tight mb-6">
              <br />
              <span className="bg-gradient-to-r from-neutral-500 via-black to-neutral-500 dark:from-neutral-400 dark:via-white dark:to-neutral-200 bg-clip-text text-transparent">My Blogs</span>
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Blogs you might find interesting and useful.
          </p>
        </motion.div>

        {/* Mobile Slider */}
        {isMobile ? (
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full"
                >
                  <BlogCard 
                    post={displayPosts[currentSlide]} 
                    isGrayscaleEnabled={isGrayscaleEnabled} 
                    isMobile={true}
                    hoveredPost={hoveredPost}
                    setHoveredPost={setHoveredPost}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-black border border-neutral-600 dark:border-neutral-400 rounded-full flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 z-10"
              aria-label="Previous post"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-black border border-neutral-600 dark:border-neutral-400 rounded-full flex items-center justify-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 z-10"
              aria-label="Next post"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {displayPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-black dark:bg-white scale-125"
                      : "bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Desktop Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <BlogCard 
                  post={post} 
                  isGrayscaleEnabled={isGrayscaleEnabled} 
                  isMobile={false}
                  hoveredPost={hoveredPost}
                  setHoveredPost={setHoveredPost}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Link
            href="/blogs"
            className="inline-flex items-center gap-3 px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 group"
          >
            View All Posts
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

interface BlogCardProps {
  post: BlogPost
  isGrayscaleEnabled: boolean
  isMobile: boolean
  hoveredPost: string | null
  setHoveredPost: (slug: string | null) => void
}

function BlogCard({ post, isGrayscaleEnabled, isMobile, hoveredPost, setHoveredPost }: BlogCardProps) {
  return (
    <article
      className={`group bg-white dark:bg-neutral-900 border-2 border-gray-200 dark:border-neutral-800 rounded-sm shadow-lg overflow-hidden hover:border-black dark:hover:border-neutral-600 transition-all duration-500 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-white/10 ${isMobile ? "mx-2" : ""}`}
      onMouseEnter={() => setHoveredPost(post.slug)}
      onMouseLeave={() => setHoveredPost(null)}
    >
      <Link href={`/blogs/${post.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className={cn(
              "object-cover transition-all duration-700 ease-in-out transform border-b border-dashed border-neutral-400 dark:border-neutral-600",
              hoveredPost === post.slug || !isGrayscaleEnabled ? "filter-none" : "filter grayscale"
            )}
          />
        </div>

        <div className="p-6 lg:p-8">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300 mb-4">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold mb-4 text-black dark:text-white group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 rounded-sm border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Read More */}
          <div className="flex items-center gap-2 text-sm font-semibold text-black dark:text-white group-hover:gap-3 transition-all duration-300">
            Read Article
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </Link>
    </article>
  )
}