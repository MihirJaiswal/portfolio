import { notFound } from "next/navigation"
import { projects } from "@/lib/project"
import { ProjectDetailClient } from "@/components/projects/projectdetail/ProjectDetailClient"
import React from "react"
import type { Metadata } from 'next'

interface ProjectPageProps {
  params: Promise<{
    id: string
  }>
}

const siteUrl = 'https://mihirjaiswal.me'

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const projectId = resolvedParams.id
  
  const project = projects.find((p) => p.id === projectId)
  
  if (!project) {
    return {
      title: 'Project Not Found | Mihir Jaiswal',
      description: 'The requested project could not be found.'
    }
  }

  const projectUrl = `${siteUrl}/projects/${project.id}`
  
  const getImageUrl = (image: any) => {
    if (typeof image === 'string') return image
    if (image?.src) return `${siteUrl}${image.src}`
    return `${siteUrl}/mihir.webp` 
  }

  const projectImageUrl = getImageUrl(project.mainImage || project.image)
  
  return {
    title: `${project.title} - ${project.subtitle} | Mihir Jaiswal`,
    description: project.fullDescription || project.description,
    keywords: [
      project.title,
      project.subtitle,
      ...project.technologies,
      'Mihir Jaiswal',
      project.category,
      'full stack developer',
      'portfolio project',
      ...(project.client ? [project.client] : [])
    ],
    openGraph: {
      type: 'article',
      url: projectUrl,
      title: `${project.title} - ${project.subtitle}`,
      description: project.fullDescription || project.description,
      images: [
        {
          url: projectImageUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} - ${project.subtitle} by Mihir Jaiswal`
        }
      ],
      siteName: 'Mihir Jaiswal - Official Website',
      publishedTime: project.year ? `${project.year}-01-01T00:00:00Z` : undefined,
      authors: ['Mihir Jaiswal'],
      section: 'Technology',
      tags: project.technologies
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} - ${project.subtitle}`,
      description: project.description,
      images: [projectImageUrl],
      creator: '@mihir_jaiswal_'
    },
    alternates: {
      canonical: projectUrl
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': 160
      }
    },
    other: {
      'article:author': 'Mihir Jaiswal',
      'article:section': project.category,
      'article:tag': project.technologies.join(', ')
    }
  }
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