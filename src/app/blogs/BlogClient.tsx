'use client'
import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { BlogPost } from '@/lib/mdx'
import { Search, Grid3X3, List,  Calendar, Filter, ArrowLeft, BookOpen } from 'lucide-react'
import { ThemeToggle } from '@/components/navbar/theme-toggle'
import { CustomCursor } from "@/components/CustomCursor"
import { cn } from "@/lib/utils"

interface BlogClientProps {
  posts: BlogPost[]
}

type SortOption = "date" | "title" 
type ViewMode = "grid" | "list"

export default function BlogClient({ posts }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>("date")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Scroll to top when component mounts and set mounted state
  useEffect(() => {
    window.scrollTo(0, 0)
    setIsMounted(true)
  }, [])

  const tags = Array.from(new Set(posts.flatMap((post) => post.tags)))

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Apply tag filter
    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags.includes(selectedTag))
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title)
        case "date":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [posts, searchQuery, selectedTag, sortBy])

  const BlogCard = ({ post, index }: { post: BlogPost; index: number }) => (
    <motion.article
      key={post.slug}
      className="group"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: Math.min(index * 0.05, 0.5),
        ease: "easeOut"
      }}
    >
      <div className="border border-neutral-200 dark:border-neutral-800 rounded-md overflow-hidden hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300">
        <Link href={`/blogs/${post.slug}`}>
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-contain transition-all duration-500 bg-white"
            />
          </div>
        </Link>

        <div className="p-4 sm:p-5 md:p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex flex-col items-start min-w-0">
              <Link href={`/blogs/${post.slug}`}>
                <h2 className="text-lg sm:text-xl font-bold group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors mb-1 line-clamp-2">
                  {post.title}
                </h2>
              </Link>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs text-neutral-500 dark:text-neutral-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            </div>
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2 sm:line-clamp-3">
  {post.description.length > 80 
    ? `${post.description.substring(0, 80)}...` 
    : post.description
  }
</p>

          <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 rounded truncate"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-2 py-1 text-xs text-neutral-500 dark:text-neutral-500 whitespace-nowrap">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <Link
              href={`/blogs/${post.slug}`}
              className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors touch-manipulation"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Read More</span>
              <span className="sm:hidden">Read</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  )

  const BlogListItem = ({ post, index }: { post: BlogPost; index: number }) => (
    <motion.div
      key={post.slug}
      className="border-b border-neutral-200 dark:border-neutral-800 last:border-b-0"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: Math.min(index * 0.05, 0.5),
        ease: "easeOut"
      }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
        <Link href={`/blogs/${post.slug}`} className="flex-shrink-0 w-full sm:w-auto">
          <div className="w-full h-32 sm:w-20 sm:h-20 rounded-md overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              width={80}
              height={80}
              className="bg-white w-full h-full object-contain"
            />
          </div>
        </Link>

        <div className="flex-1 min-w-0 w-full">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
            <div className="min-w-0 flex-1">
              <Link href={`/blogs/${post.slug}`}>
                <h3 className="text-lg font-bold hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors line-clamp-1">
                  {post.title}
                </h3>
              </Link>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 uppercase tracking-wide truncate">{post.author}</p>
            </div>
            <span className="text-xs text-neutral-500 dark:text-neutral-500 flex items-center gap-1 flex-shrink-0">
              <Calendar className="w-3 h-3" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2 sm:line-clamp-1">{post.description}</p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {post.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <Link
                href={`/blogs/${post.slug}`}
                className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors touch-manipulation"
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Read</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  // Show a loading state until animations are ready
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6 sm:my-12">
          <div className="flex items-center justify-between w-full mb-8 sm:mb-12">
            <Link
              href="/"
              className="inline-flex items-center text-sm hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors touch-manipulation"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to home</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <ThemeToggle />
          </div>
          <div className="animate-pulse">
            <div className="h-12 bg-neutral-200 dark:bg-neutral-800 rounded mb-4"></div>
            <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 dark:text-white mb-8">
      <CustomCursor />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
        <motion.div
          className="flex items-center justify-between w-full mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Link
            href="/"
            className="inline-flex items-center text-sm hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Back to home</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <div>
            <ThemeToggle />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 leading-tight">
                <span className="bg-gradient-to-r from-neutral-500 via-black to-neutral-500 dark:from-neutral-300 dark:via-neutral-50 dark:to-neutral-300 bg-clip-text text-transparent">
                  ALL BLOGS
                </span>
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                {filteredAndSortedPosts.length} of {posts.length} posts
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 rounded-md transition-colors touch-manipulation",
                  viewMode === "grid"
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800",
                )}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 rounded-md transition-colors touch-manipulation",
                  viewMode === "list"
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800",
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search posts, tags, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors text-sm sm:text-base"
              />
            </div>

            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-3 sm:px-4 py-3 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors touch-manipulation text-sm"
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 sm:px-4 py-3 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors text-sm min-w-0"
              >
                <option value="date">Date</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 sm:mb-8 overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 sm:gap-3 p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-md border border-neutral-200 dark:border-neutral-800">
                  <motion.button
                    onClick={() => setSelectedTag(null)}
                    className={cn(
                      "px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all touch-manipulation",
                      selectedTag === null
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700",
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ALL TAGS
                  </motion.button>
                  {tags.map((tag, index) => (
                    <motion.button
                      key={tag}
                      onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                      className={cn(
                        "px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all touch-manipulation",
                        selectedTag === tag
                          ? "bg-black text-white dark:bg-white dark:text-black"
                          : "bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700",
                      )}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: (index + 1) * 0.05 }}
                    >
                      {tag.toUpperCase()}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence mode="wait">
          {filteredAndSortedPosts.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 sm:py-16"
            >
              <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-neutral-400" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">No posts found</h3>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 px-4">Try adjusting your search or filter criteria</p>
            </motion.div>
          ) : viewMode === "grid" ? (
            <motion.div
              key="grid-view"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {filteredAndSortedPosts.map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list-view"
              className="border border-neutral-200 dark:border-neutral-800 rounded-md overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {filteredAndSortedPosts.map((post, index) => (
                <BlogListItem key={post.slug} post={post} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}