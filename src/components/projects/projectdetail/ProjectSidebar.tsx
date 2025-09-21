import { Tag, User, Calendar } from "lucide-react"

interface ProjectSidebarProps {
  project: {
    technologies: string[]
    client: string
    year: string
  }
}

export function ProjectSidebar({ project }: ProjectSidebarProps) {
  return (
    <div className="sticky top-24">
      <div className="mb-10">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <Tag className="w-4 h-4 mr-2 text-zinc-500" />
          Technologies
        </h3>
        <div 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2"
        >
          {project.technologies?.map((tech: string) => (
            <div 
              key={tech}
            >
              <div className="px-4 py-3 bg-zinc-100 dark:bg-zinc-900 rounded-md text-sm">{tech}</div>
            </div>
          ))}
        </div>
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
    </div>
  )
}