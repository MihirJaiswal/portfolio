"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  ExternalLink,
  Calendar,
  Code2,
  Play,
  ChevronLeft,
  ChevronRight,
  User,
  Tag,
  Layers,
} from "lucide-react"
import { projects } from "@/lib/project"
import { motion } from "motion/react"
import { FadeIn, StaggerContainer, StaggerItem } from "../animation/scroll-animations"
import { CustomCursor } from "@/components/CustomCursor"
import PageNav from "../navbar/PageNav"

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)

  // Force scroll to top immediately when component mounts
  useEffect(() => {
    // Multiple approaches to ensure scroll to top
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    
    // Also set scroll restoration to manual to prevent browser from restoring scroll position
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    const projectId = params.id
    const foundProjectIndex = projects.findIndex((p) => p.id === projectId)

    if (foundProjectIndex !== -1) {
      setProject(projects[foundProjectIndex])
      setCurrentProjectIndex(foundProjectIndex)
    } else {
      router.push("/projects")
    }

    setLoading(false)
    
    // Ensure scroll to top after state updates
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }, 0)
  }, [params.id, router])

  // Also scroll to top when navigating between projects
  useEffect(() => {
    if (project) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }, [project])


  const navigateToProject = (direction: "prev" | "next") => {
    let newIndex = currentProjectIndex

    if (direction === "prev") {
      newIndex = currentProjectIndex > 0 ? currentProjectIndex - 1 : projects.length - 1
    } else {
      newIndex = currentProjectIndex < projects.length - 1 ? currentProjectIndex + 1 : 0
    }

    // Scroll to top before navigation
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    router.push(`/projects/${projects[newIndex].id}`)
  }

  // Get related projects (same category)
  const relatedProjects = project ? projects.filter((p) => p.id !== project.id && p.category === project.category) : []

  // If not enough related projects by category, add some other projects
  const moreProjects = project ? projects.filter((p) => p.id !== project.id && p.category !== project.category) : []

  const projectsToShow = [...relatedProjects, ...moreProjects].slice(0, 3)

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 py-24">
          {/* Skeleton UI */}
          <div className="w-40 h-6 bg-zinc-200 dark:bg-zinc-800 rounded mb-12 animate-pulse"></div>

          <div className="w-3/4 h-16 bg-zinc-200 dark:bg-zinc-800 rounded mb-4 animate-pulse"></div>
          <div className="w-1/2 h-8 bg-zinc-200 dark:bg-zinc-800 rounded mb-16 animate-pulse"></div>

          <div className="w-full aspect-video bg-zinc-200 dark:bg-zinc-800 rounded mb-16 animate-pulse"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
            <div className="md:col-span-2">
              <div className="w-48 h-8 bg-zinc-200 dark:bg-zinc-800 rounded mb-6 animate-pulse"></div>
              <div className="space-y-4">
                <div className="w-full h-4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
                <div className="w-full h-4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
                <div className="w-3/4 h-4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
              </div>
            </div>

            <div>
              <div className="w-40 h-6 bg-zinc-200 dark:bg-zinc-800 rounded mb-4 animate-pulse"></div>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-full h-4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!project) return null

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null

    const regex = /(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    const match = url.match(regex)

    return match ? `https://www.youtube.com/embed/${match[1]}` : null
  }

  const youtubeEmbedUrl = project.youtube ? getYouTubeEmbedUrl(project.youtube) : null

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 dark:text-white">
      <CustomCursor/>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <PageNav type="project" isSlug={true} />

        {/* Hero Section */}
        <FadeIn direction="up">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div>
                <span className="inline-block px-3 py-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 text-xs font-medium rounded-full mb-4">
                  {project.category.toUpperCase()}
                </span>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">
                  {project.title}
                </h1>
                <p className="md:text-xl text-zinc-600 dark:text-zinc-400">{project.subtitle}</p>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center">
                  <Calendar className="w-5 h-5 mb-2 text-zinc-500" />
                  <span className="text-sm font-medium">{project.year}</span>
                </div>

                <div className="flex flex-col items-center">
                  <User className="w-5 h-5 mb-2 text-zinc-500" />
                  <span className="text-sm font-medium">{project.client}</span>
                </div>

                <div className="flex flex-col items-center">
                  <Code2 className="w-5 h-5 mb-2 text-zinc-500" />
                  <span className="text-sm font-medium">{project.technologies.length}</span>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
        {/* Project Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24">
          <FadeIn direction="up" className="md:col-span-2" delay={0.3}>
            {/* Main Image */}
        <motion.div
          className="aspect-square md:aspect-[4/3] w-full mb-16 rounded-xs overflow-hidden border border-zinc-200 dark:border-zinc-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Image
            src={project.mainImage || project.image || "/placeholder.svg"}
            alt={project.title}
            width={500}
            height={500}
            priority
            className="w-full h-full object-cover  bg-black"
          />
        </motion.div>
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Layers className="w-6 h-6 mr-3 text-zinc-500" />
                Project Overview
              </h2>
              <p className="text-lg leading-relaxed mb-8">{project.fullDescription}</p>

              <div className="mb-12">
                <h3 className="text-xl font-bold mb-4">Key Features</h3>
                <p className="text-lg leading-relaxed mb-6">{project.details}</p>
              </div>
            </div>

            {/* YouTube Video */}
            {youtubeEmbedUrl && (
              <div className="mb-12">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Play className="w-5 h-5 mr-3 text-zinc-500" />
                  Project Video
                </h3>
                <div className="aspect-video w-full rounded-md overflow-hidden border border-zinc-200 dark:border-zinc-800">
                  <iframe
                    src={youtubeEmbedUrl}
                    title={`${project.title} video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="flex flex-col md:flex-row gap-4 mt-8 w-full">
              {project.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center inline-flex items-center justify-center px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-md text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Visit Live Project
                  <ExternalLink className="w-4 h-4 ml-2" />
                </motion.a>
              )}

              {project.youtube && (
                <motion.a
                  href={project.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center px-8 py-4 border border-black dark:border-white text-black dark:text-white rounded-md text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Watch Video
                  <Play className="w-4 h-4 ml-2" />
                </motion.a>
              )}
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <div className="sticky top-24">
              <div className="mb-10">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Tag className="w-4 h-4 mr-2 text-zinc-500" />
                  Technologies
                </h3>
                <StaggerContainer className="grid grid-cols-2 gap-2" staggerChildren={0.05}>
                  {project.technologies?.map((tech: string) => (
                    <StaggerItem key={tech}>
                      <div className="px-4 py-3 bg-zinc-100 dark:bg-zinc-900 rounded-md text-sm">{tech}</div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <User className="w-4 h-4 mr-2 text-zinc-500" />
                  Client
                </h3>
                <div className="px-4 py-3 bg-zinc-100 dark:bg-zinc-900 rounded-md">
                  <p className="text-sm">{project.client}</p>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-zinc-500" />
                  Year
                </h3>
                <div className="px-4 py-3 bg-zinc-100 dark:bg-zinc-900 rounded-md">
                  <p className="text-sm">{project.year}</p>
                </div>
              </div>

              {/* Project Navigation (Small) */}
              <div className="hidden md:block mt-12 pt-8 border-t border-dashed border-zinc-400 dark:border-zinc-800">
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => navigateToProject("prev")}
                    className="flex items-center text-sm hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </button>

                  <button
                    onClick={() => navigateToProject("next")}
                    className="flex items-center text-sm hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* More Projects Section */}
        <FadeIn direction="up" delay={0.5}>
          <div className="border-t border-dashed border-zinc-300 dark:border-zinc-800 pt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">More Projects</h2>
              <Link 
                href="/projects" 
                className="text-sm hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}
              >
                View All
              </Link>
            </div>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerChildren={0.1}>
              {projectsToShow.map((relatedProject) => (
                <StaggerItem key={relatedProject.id}>
                  <Link 
                    href={`/projects/${relatedProject.id}`}
                    onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}
                  >
                    <motion.div
                      className="group border border-zinc-200 dark:border-zinc-800 rounded-md overflow-hidden hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300"
                      whileHover={{ y: -5 }}
                    >
                      <div className="aspect-video overflow-hidden">
                        <Image
                          src={relatedProject.image || "/placeholder.svg"}
                          alt={relatedProject.title}
                          width={400}
                          height={225}
                          quality={100}
                          className="w-full h-full object-contain p-4"
                        />
                      </div>
                      <div className="p-6">
                        <span className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">
                          {relatedProject.category}
                        </span>
                        <h3 className="text-xl font-bold group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                          {relatedProject.title}
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-2">
                          {relatedProject.description}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}