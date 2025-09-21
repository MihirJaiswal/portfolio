import { ExternalLink, Play } from "lucide-react"
import Link from "next/link"

interface ProjectActionsProps {
  project: {
    link?: string
    youtube?: string
  }
}

export function ProjectActions({ project }: ProjectActionsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mt-8 w-full">
      {project.link && (
        <Link
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center inline-flex items-center justify-center px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-md text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          Visit Live Project
          <ExternalLink className="w-4 h-4 ml-2" />
        </Link>
      )}

      {project.youtube && (
        <Link
          href={project.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex justify-center items-center px-8 py-4 border border-black dark:border-white text-black dark:text-white rounded-md text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
        >
          Watch Video
          <Play className="w-4 h-4 ml-2" />
        </Link>
      )}
    </div>
  )
}