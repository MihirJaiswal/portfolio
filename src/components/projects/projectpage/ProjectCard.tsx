import { motion } from "motion/react"
import Link from "next/link"
import Image, { StaticImageData } from "next/image"
import { Calendar, ExternalLink, Play } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  category: string
  year: string
  technologies: string[]
  mainImage?: string | StaticImageData
  link?: string
  youtube?: string
}

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project}: ProjectCardProps) {
  return (
    <motion.div
      className="group"
    >
      <div className="border border-neutral-200 w-full dark:border-neutral-800 rounded-md overflow-hidden hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300">
        <Link href={`/projects/${project.id}`}>
          <div className="h-full w-full aspect-5/4 overflow-hidden">
            <Image
              src={project.mainImage || "/placeholder.svg"}
              alt={project.title}
              width={1000}
              height={1000}
              loading="lazy"
              placeholder="blur"
              className="w-full h-full object-cover bg-black"
            />
          </div>
        </Link>

        <div className="p-4 sm:p-5 md:p-6">
          <div className="flex items-start justify-between mb-1">
            <div className="flex-1 min-w-0">
              <Link href={`/projects/${project.id}`}>
                <h2 className="text-lg sm:text-xl font-bold group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors mb-1 truncate">
                  {project.title}
                </h2>
              </Link>
            </div>
            <div className="flex items-center gap-2 ml-2 sm:ml-4 flex-shrink-0">
              <span className="text-xs text-neutral-500 dark:text-neutral-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {project.year}
              </span>
            </div>
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2 sm:line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech: string) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 rounded truncate"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 text-xs text-neutral-500 dark:text-neutral-500 whitespace-nowrap">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {project.link && (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors touch-manipulation"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">Live</span>
                <span className="sm:hidden">Demo</span>
              </Link>
            )}
            {project.youtube && (
              <Link
                href={project.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors touch-manipulation"
              >
                <Play className="w-4 h-4" />
                Video
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}