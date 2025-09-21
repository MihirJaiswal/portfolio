'use client'
import type { TOCItem } from '@/lib/mdx'

interface TableOfContentsProps {
  items: TOCItem[]
  className?: string
}

export default function TableOfContents({ items, className = '' }: TableOfContentsProps) {



  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.offsetTop
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Only show H2 headings (main sections)
  const mainHeadings = items.filter(item => item.level === 2)

  if (mainHeadings.length === 0) return null

  return (
    <div className={`${className}`}>
      <div className="sticky top-4">
        <div className="rounded-sm">
          <h3 className="font-black text-xl mb-3 bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent">
           TABLE OF CONTENT
          </h3>
          <nav className="space-y-2">
            {mainHeadings.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left text-sm transition-colors py-2 px-2 rounded text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-700"
              >
                {item.title}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}