'use client'
import Link from "next/link"
import Image, { StaticImageData } from "next/image"

interface RelatedProjectsProps {
  projects: Array<{
    id: string
    title: string
    category: string
    description: string
    image?: string | StaticImageData
  }>
}

export function RelatedProjects({ projects }: RelatedProjectsProps) {
  return (
    <div
    >
      <div className="border-t border-dashed border-zinc-300 dark:border-zinc-800 py-16">
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
        
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {projects.map((relatedProject) => (
            <div
              key={relatedProject.id}
            >
              <Link 
                href={`/projects/${relatedProject.id}`}
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}
              >
                <div 
                  className="group border border-zinc-200 dark:border-zinc-800 rounded-md overflow-hidden hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300"
                >
                  <div className="aspect-video overflow-hidden flex items-center justify-center">
                    <Image 
                      src={relatedProject.image || "/placeholder.svg"} 
                      alt={relatedProject.title} 
                      width={180} 
                      height={100} 
                      quality={100}
                      loading="lazy"
                      placeholder="blur"
                      className="object-contain p-4" 
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
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}