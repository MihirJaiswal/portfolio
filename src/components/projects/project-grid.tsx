"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useGrayscaleStore } from "@/lib/store"

type Project = {
  id: string
  title: string
  subtitle?: string
  description: string
  category: string
  image: string
  mainImage: string
  details?: string
}

interface ProjectGridProps {
  projects: Project[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [isHoveringCard, setIsHoveringCard] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const projectsPerPage = 2
  const totalPages = Math.ceil(projects.length / projectsPerPage)
  const { isGrayscaleEnabled } = useGrayscaleStore()

  // Dispatch custom event to hide/show main cursor
  const dispatchProjectHover = (isHovering: boolean) => {
    const event = new CustomEvent('projectHover', {
      detail: { isHovering }
    });
    document.dispatchEvent(event);
  };

  // Update cursor position globally
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({
        x: e.clientX,
        y: e.clientY
      })
    }

    if (isHoveringCard) {
      document.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isHoveringCard])

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const currentProjects = projects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  )

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cursorVariants = {
    default: {
      scale: 0,
      opacity: 0
    },
    hover: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full"
    >
      {/* Custom Project Cursor - Fixed positioning */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          transform: 'translate(-50%, -50%)'
        }}
        variants={cursorVariants}
        animate={isHoveringCard ? "hover" : "default"}
      >
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
          <span className="text-black text-xs font-bold uppercase tracking-wider">
            Check Out
          </span>
        </div>
      </motion.div>

      <div className="flex flex-col md:flex-row justify-end items-center mb-8 gap-4">
        <div className="flex items-center space-x-6">
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300 transform",
                  currentPage === index
                    ? "bg-black dark:bg-white scale-150"
                    : "bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-500"
                )}
                onClick={() => setCurrentPage(index)}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex space-x-3">
            <button
              onClick={goToPrevPage}
              className="w-10 h-10 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center group hover:border-neutral-900 dark:hover:border-neutral-300 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Previous projects"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={goToNextPage}
              className="w-10 h-10 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center group hover:border-neutral-900 dark:hover:border-neutral-300 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Next projects"
            >
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        key={currentPage}
      >
        {currentProjects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onHoverStart={() => {
              setHoveredProject(project.id)
              setIsHoveringCard(true)
              dispatchProjectHover(true)
            }}
            onHoverEnd={() => {
              setHoveredProject(null)
              setIsHoveringCard(false)
              dispatchProjectHover(false)
            }}
            className="group cursor-none" // Hide default cursor on cards
          >
            <Link href={`/projects/${project.id}`} className="block cursor-none">
              <div className="relative overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-neutral-100 dark:bg-neutral-800">
                <div className="relative aspect-[5/4] overflow-hidden rounded-sm">
                  <Image
                    src={project.mainImage || "/placeholder.svg"}
                    alt={project.title}
                    width={450}
                    height={450}
                    quality={100}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700 ease-in-out transform bg-neutral-900 dark:bg-neutral-950 border",
                      hoveredProject === project.id || !isGrayscaleEnabled ? "filter-none" : "filter grayscale"
                    )}
                  />
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                  )}>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            width={50}
                            height={50}
                          />
                          <h3 className="text-md font-semibold text-white transition-colors">
                            {project.title}
                          </h3>
                        </div>
                        <div className="flex space-x-2">
                          <div className="rounded-full bg-white p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                            <ExternalLink className="w-3 h-3 text-black" />
                          </div>
                          <div className="rounded-full bg-white p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                            <Github className="w-3 h-3 text-black" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}