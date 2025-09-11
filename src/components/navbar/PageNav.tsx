'use client'
import { useState } from "react"
import { ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import { motion } from "motion/react"
import { ThemeToggle } from "./theme-toggle"

interface PageNavProps {
  type: "blog" | "project"
  isSlug?: boolean
  title?: string // Add optional title prop
}

export default function PageNav({ type, isSlug = false, title }: PageNavProps) {
  const [showShareOptions, setShowShareOptions] = useState(false)

  const handleShare = async (platform: string) => {
    const url = window.location.href
    // Method 1: Use prop title, fallback to document title, then default
    const pageTitle = title || document.title || `${type === "blog" ? "Blog Post" : "Project"}`

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(pageTitle)}&url=${encodeURIComponent(url)}`,
          "_blank",
        )
        break
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank")
        break
      case "copy":
        try {
          await navigator.clipboard.writeText(url)
          alert("Link copied to clipboard!")
        } catch (err) {
          console.error("Failed to copy link: ", err)
        }
        break
    }

    setShowShareOptions(false)
  }

  return (
    <motion.div
      className="flex justify-between items-center mb-12"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex gap-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
        >
          <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={2} />
          Home
        </Link>
        {isSlug && (
          <Link
            href={`/${type}s`}
            className="inline-flex items-center text-sm font-medium hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
          >
            All {type === "blog" ? "Posts" : "Projects"}
          </Link>
        )}
      </div>

      <div className="flex items-center gap-4">
        {isSlug && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="flex gap-6">
              <button
                onClick={() => setShowShareOptions(!showShareOptions)}
                className="inline-flex items-center text-sm hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
              >
                <Share2 className="w-4 h-4 mr-2" />
                <span className="hidden md:block">Share</span>
              </button>
              <motion.div>
                <ThemeToggle />
              </motion.div>
            </div>

            {showShareOptions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-full mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-lg p-2 z-10"
              >
                <button
                  onClick={() => handleShare("twitter")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded"
                >
                  Twitter
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded"
                >
                  LinkedIn
                </button>
                <button
                  onClick={() => handleShare("copy")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded"
                >
                  Copy Link
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}