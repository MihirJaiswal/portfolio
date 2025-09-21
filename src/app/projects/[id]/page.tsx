import { notFound } from "next/navigation"
import { projects } from "@/lib/project"
import { ProjectDetailClient } from "@/components/projects/projectdetail/ProjectDetailClient"
import React from "react"

interface ProjectPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProjectDetail({ params }: ProjectPageProps) {
  const resolvedParams = await params
  const projectId = resolvedParams.id
  
  const currentProjectIndex = projects.findIndex((p) => p.id === projectId)
  
  if (currentProjectIndex === -1) {
    notFound()
  }

  const project = projects[currentProjectIndex]
  const relatedProjects = projects.filter(
    (p) => p.id !== project.id && p.category === project.category
  )
  
  const moreProjects = projects.filter(
    (p) => p.id !== project.id && p.category !== project.category
  )
  
  const projectsToShow = [...relatedProjects, ...moreProjects].slice(0, 3)

  return (
    <ProjectDetailClient
      project={project}
      currentProjectIndex={currentProjectIndex}
      projectsToShow={projectsToShow}
    />
  )
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}