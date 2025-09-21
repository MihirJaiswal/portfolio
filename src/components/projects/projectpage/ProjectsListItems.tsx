import { motion } from "motion/react"
import Link from "next/link"
import Image, { StaticImageData } from "next/image"
import { Calendar, ExternalLink, Play, ArrowUpRight } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  category: string
  year: string
  technologies: string[]
  image?: string | StaticImageData
  link?: string
  youtube?: string
}

interface ProjectListItemProps {
  project: Project
  index: number
}

export function ProjectListItem({ project, index }: ProjectListItemProps) {
  return (
    <motion.article
      key={project.id}
      className="group border-b border-neutral-200 dark:border-neutral-800 last:border-b-0"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: Math.min(index * 0.05, 0.5),
        ease: "easeOut"
      }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-all duration-200">
        {/* Project Image */}
        <Link 
          href={`/projects/${project.id}`} 
          className="flex-shrink-0 w-full sm:w-auto group/image"
          aria-label={`View ${project.title} project details`}
        >
          <div className="relative w-full h-32 sm:w-20 sm:h-20 rounded-lg overflow-hidden transition-transform duration-200 group-hover/image:scale-105">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={`${project.title} project preview`}
              width={80}
              height={80}
              loading="lazy"
              placeholder="blur"
              className="w-full h-full object-contain transition-opacity duration-200 group-hover/image:opacity-90"
            />
            <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/5 transition-colors duration-200" />
          </div>
        </Link>

        {/* Project Content */}
        <div className="flex-1 min-w-0 w-full">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-2">
            <div className="min-w-0 flex-1">
              <Link 
                href={`/projects/${project.id}`}
                className="group/title"
              >
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 group-hover/title:text-neutral-600 dark:group-hover/title:text-neutral-300 transition-colors duration-200 truncate flex items-center gap-2">
                  {project.title}
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover/title:opacity-100 transition-all duration-200 transform translate-x-0 group-hover/title:translate-x-1 group-hover/title:-translate-y-1" />
                </h3>
              </Link>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-neutral-600 dark:text-neutral-400 uppercase tracking-wide font-medium">
                  {project.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600"></span>
                <span className="text-xs text-neutral-500 dark:text-neutral-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {project.year}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* Footer Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.technologies.slice(0, 4).map((tech: string) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xs border border-neutral-200 dark:border-neutral-700 transition-colors duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2.5 py-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  +{project.technologies.length - 4} more
                </span>
              )}
            </div>

            {/* Action Links */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {project.link && (
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200 touch-manipulation"
                >
                  <ExternalLink className="w-4 h-4 transition-transform duration-200 group-hover/link:scale-110" />
                  <span className="hidden sm:inline font-medium">Demo</span>
                </Link>
              )}
              {project.youtube && (
                <Link
                  href={project.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/video flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 touch-manipulation"
                >
                  <Play className="w-4 h-4 transition-transform duration-200 group-hover/video:scale-110" />
                  <span className="hidden sm:inline font-medium">Video</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
