"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Grid3X3, List, ExternalLink, Play, Calendar, Code2, Filter } from "lucide-react"
import { projects } from "@/lib/data"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { FadeIn, StaggerContainer, StaggerItem } from "../../components/animation/scroll-animations"
import { Navbar } from "@/components/navbar/Navbar"

type SortOption = "name" | "year" | "category"
type ViewMode = "grid" | "list"

export default function ProjectsPage() {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("year")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [expandedListItems, setExpandedListItems] = useState<Set<string>>(new Set())

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Toggle expanded state for list items
  const toggleListItem = (projectId: string) => {
    const newExpanded = new Set(expandedListItems)
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId)
    } else {
      newExpanded.add(projectId)
    }
    setExpandedListItems(newExpanded)
  }

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(projects.map((project) => project.category)))]

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects

    // Apply category filter
    if (filter !== "all") {
      filtered = filtered.filter((project) => project.category === filter)
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title)
        case "year":
          return Number.parseInt(b.year) - Number.parseInt(a.year)
        case "category":
          return a.category.localeCompare(b.category)
        default:
          return 0
      }
    })

    return filtered
  }, [filter, searchQuery, sortBy])

  const ProjectCard = ({ project, index }: { project: any; index: number }) => (
    <StaggerItem key={project.id}>
      <motion.div
        className="group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300">
          <Link href={`/projects/${project.id}`}>
            <div className="h-64 overflow-hidden">
              <Image
                src={project.mainImage || "/placeholder.svg"}
                alt={project.title}
                width={600}
                height={300}
                className="w-full h-full object-contain bg-black"
              />
            </div>
          </Link>

          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <Link href={`/projects/${project.id}`}>
                  <h2 className="text-xl font-bold group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors mb-1">
                    {project.title}
                  </h2>
                </Link>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">{project.category}</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <span className="text-xs text-neutral-500 dark:text-neutral-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {project.year}
                </span>
              </div>
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 3).map((tech: string) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 rounded"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-2 py-1 text-xs text-neutral-500 dark:text-neutral-500">
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
              {project.youtube && (
                <a
                  href={project.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Video
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </StaggerItem>
  )

  const ProjectListItem = ({ project, index }: { project: any; index: number }) => (
    <motion.div
      key={project.id}
      className="border-b border-neutral-200 dark:border-neutral-800 last:border-b-0"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-center gap-6 p-6 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
        <Link href={`/projects/${project.id}`} className="flex-shrink-0">
          <div className="w-20 h-20 rounded-lg overflow-hidden">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={80}
              height={80}
              className="w-full h-full object-contain"
            />
          </div>
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <Link href={`/projects/${project.id}`}>
                <h3 className="text-lg font-bold hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">
                  {project.title}
                </h3>
              </Link>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 uppercase tracking-wide">{project.category}</p>
            </div>
            <span className="text-xs text-neutral-500 dark:text-neutral-500 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {project.year}
            </span>
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-1">{project.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech: string) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {project.youtube && (
                <a
                  href={project.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  <Play className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 dark:text-white">
      <div className="max-w-7xl mx-auto px-6 my-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link
            href="/"
            className="inline-flex items-center text-sm mb-12 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
        </motion.div>

        <FadeIn direction="up">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-neutral-500 via-black to-neutral-500 dark:from-neutral-300 dark:via-neutral-50 dark:to-neutral-300 bg-clip-text text-transparent">
                  ALL PROJECTS
                </span>
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                {filteredAndSortedProjects.length} of {projects.length} projects
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 rounded-lg transition-colors",
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
                  "p-2 rounded-lg transition-colors",
                  viewMode === "list"
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800",
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search projects, technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-3 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
              >
                <option value="year">Sort by Year</option>
                <option value="name">Sort by Name</option>
                <option value="category">Sort by Category</option>
              </select>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 overflow-hidden"
              >
                <div className="flex flex-wrap gap-3 p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg border border-neutral-200 dark:border-neutral-800">
                  {categories.map((category, index) => (
                    <motion.button
                      key={category}
                      onClick={() => setFilter(category)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all",
                        filter === category
                          ? "bg-black text-white dark:bg-white dark:text-black"
                          : "bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700",
                      )}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      {category.toUpperCase()}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </FadeIn>

        <AnimatePresence mode="wait">
          {filteredAndSortedProjects.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <Code2 className="w-16 h-16 mx-auto mb-4 text-neutral-400" />
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-neutral-600 dark:text-neutral-400">Try adjusting your search or filter criteria</p>
            </motion.div>
          ) : viewMode === "grid" ? (
            <StaggerContainer
              key="grid-view"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              staggerChildren={0.1}
            >
              {filteredAndSortedProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </StaggerContainer>
          ) : (
            <motion.div
              key="list-view"
              className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {filteredAndSortedProjects.map((project, index) => (
                <ProjectListItem key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}