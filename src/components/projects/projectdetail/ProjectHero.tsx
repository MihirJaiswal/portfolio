import { Calendar, User, Code2 } from "lucide-react"

interface ProjectHeroProps {
  project: {
    category: string
    title: string
    subtitle: string
    year: string
    client: string
    technologies: string[]
  }
}

export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <div
    >
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6">
                <span className="bg-gradient-to-r uppercase from-neutral-500 via-black to-neutral-500 dark:from-neutral-400 dark:via-white dark:to-neutral-200 bg-clip-text text-transparent">
                  {project.title}
                </span>
              </h2>
            <span className="inline-block px-3 py-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 text-xs font-medium rounded-xs mb-4">
              {project.category.toUpperCase()}
            </span>
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
    </div>
  )
}