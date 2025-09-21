import { Layers } from "lucide-react"

interface ProjectOverviewProps {
  project: {
    fullDescription: string
    details: string
  }
}

export function ProjectOverview({ project }: ProjectOverviewProps) {
  return (
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
  )
}