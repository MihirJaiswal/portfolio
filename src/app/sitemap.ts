import { MetadataRoute } from 'next'
import { projects } from '@/lib/data' 

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mihirjaiswal-portfolio.vercel.app'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  // Dynamic project pages from your actual data
  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/project/${project.id}`,
    lastModified: new Date(project.year + '-12-01'), // Use project year
    changeFrequency: 'monthly' as const,
    priority: getPriorityByCategory(project.category),
  }))

  return [...staticPages, ...projectPages]
}

function getPriorityByCategory(category: string): number {
  const priorities: Record<string, number> = {
    'full stack': 0.9,
    'ai application': 0.9,
    'web development': 0.8,
    'web application': 0.8,
    'cybersecurity': 0.8,
    'game development': 0.8,
    'client work': 0.8,
    'web design': 0.7,
    'web tool': 0.7,
    'web platform': 0.7,
    'event website': 0.6,
  }
  return priorities[category] || 0.7
}