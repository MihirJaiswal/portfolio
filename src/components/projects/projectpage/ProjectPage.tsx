"use client"
import { useState, useEffect, useMemo } from "react"
import { Grid3X3, List, Code2 } from "lucide-react"
import { projects } from "@/lib/project"
import ProjectCard from "./ProjectCard"
import { ProjectListItem } from "./ProjectsListItems"
import { ContentHeader } from "@/components/content/ContentHeader"
import { SearchAndFilters } from "@/components/content/SearchAndFilters"
import { EmptyState } from "@/components/content/EmptyState"
import { ContentGrid } from "@/components/content/ContentGrid"
import { ContentList } from "@/components/content/ContentList"

type SortOption = "name" | "year"
type ViewMode = "grid" | "list"

export default function ProjectsPage() {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("year")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setIsMounted(true)
  }, [])

  const categories = ["all", ...Array.from(new Set(projects.map((project) => project.category)))]
  
  // Remove "all" from filter buttons since we handle that separately
  const categoryFilterButtons = categories.slice(1).map(category => ({
    label: category,
    value: category
  }))

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects

    if (filter !== "all") {
      filtered = filtered.filter((project) => project.category === filter)
    }

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
        default:
          return 0
      }
    })

    return filtered
  }, [filter, searchQuery, sortBy])

  const sortOptions = [
    { label: "Year", value: "year" },
    { label: "Name", value: "name" }
  ]

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950 dark:text-white my-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
          {/* Static header during loading to avoid animation issues */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6">
                <span className="bg-gradient-to-r uppercase from-neutral-500 via-black to-neutral-500 dark:from-neutral-400 dark:via-white dark:to-neutral-200 bg-clip-text text-transparent">
                  Projects
                </span>
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                {projects.length} of {projects.length} projects
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
          
          <div className="animate-pulse mt-6 sm:mt-12">
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
          title="Projects"
          totalCount={projects.length}
          filteredCount={filteredAndSortedProjects.length}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          subtitle="projects"
        />

        <SearchAndFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search projects, technologies..."
          sortBy={sortBy}
          onSortChange={(newSort) => setSortBy(newSort as SortOption)}
          sortOptions={sortOptions}
          selectedFilter={filter === "all" ? null : filter}
          onFilterChange={(newFilter) => setFilter(newFilter || "all")}
          filterButtons={categoryFilterButtons}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          filterLabel="ALL CATEGORIES"
        />

        {filteredAndSortedProjects.length === 0 ? (
          <EmptyState
            icon={Code2}
            title="No projects found"
            description="Try adjusting your search or filter criteria"
          />
        ) : viewMode === "grid" ? (
          <ContentGrid>
            {filteredAndSortedProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </ContentGrid>
        ) : (
          <ContentList>
            {filteredAndSortedProjects.map((project, index) => (
              <ProjectListItem key={project.id} project={project} index={index} />
            ))}
          </ContentList>
        )}
      </div>
    </div>
  )
}