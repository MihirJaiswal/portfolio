"use client"
import { useState, useEffect, useMemo } from "react"
import { Grid3X3, List, BookOpen } from "lucide-react"
import type { BlogPost } from '@/lib/mdx'
import { ContentHeader } from "../content/ContentHeader"
import { SearchAndFilters } from "../content/SearchAndFilters"
import { EmptyState } from "../content/EmptyState"
import { ContentGrid } from "../content/ContentGrid"
import { ContentList } from "../content/ContentList"
import { BlogCard } from "./BlogCard"
import { BlogListItem } from "./BlogListItem"
import React from 'react'

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
  
  const tagFilterButtons = tags.map(tag => ({
    label: tag,
    value: tag
  }))

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

  const sortOptions = [
    { label: "Date", value: "date" },
    { label: "Title", value: "title" }
  ]

  // Show a loading state until animations are ready
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950 dark:text-white mt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6 sm:my-12">
          {/* Static header during loading */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6">
                <span className="bg-gradient-to-r uppercase from-neutral-500 via-black to-neutral-500 dark:from-neutral-400 dark:via-white dark:to-neutral-200 bg-clip-text text-transparent">
                  All Blogs
                </span>
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                {posts.length} of {posts.length} posts
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors touch-manipulation ${
                  viewMode === "grid"
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors touch-manipulation ${
                  viewMode === "list"
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
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
    <div className="min-h-screen bg-white dark:bg-neutral-950 dark:text-white my-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
        <ContentHeader  
          title="All Blogs"
          totalCount={posts.length}
          filteredCount={filteredAndSortedPosts.length}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          subtitle="Blogs"
        />

        <SearchAndFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search posts, tags, authors..."
          sortBy={sortBy}
          onSortChange={(newSort) => setSortBy(newSort as SortOption)}
          sortOptions={sortOptions}
          selectedFilter={selectedTag}
          onFilterChange={setSelectedTag}
          filterButtons={tagFilterButtons}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          filterLabel="ALL TAGS"
        />

        {filteredAndSortedPosts.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No posts found"
            description="Try adjusting your search or filter criteria"
          />
        ) : viewMode === "grid" ? (
          <ContentGrid>
            {filteredAndSortedPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </ContentGrid>
        ) : (
          <ContentList>
            {filteredAndSortedPosts.map((post, index) => (
              <BlogListItem key={post.slug} post={post} index={index} />
            ))}
          </ContentList>
        )}
      </div>
    </div>
  )
}