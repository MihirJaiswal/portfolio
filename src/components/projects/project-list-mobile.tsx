"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

type Project = {
  id: string
  title: string
  subtitle?: string
  description: string
  category: string
  image: string
  mainImage: string
  details?: string
}

interface ProjectListMobileProps {
  projects: Project[]
}

export function ProjectListMobile({ projects }: ProjectListMobileProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="space-y-6 mt-8">
      {projects.map((project) => (
        <motion.div
          key={project.id}
          className={cn(
            "border border-neutral-200 dark:border-neutral-800 overflow-hidden transition-all duration-300",
            expandedId === project.id ? "shadow-lg" : "shadow-sm",
          )}
          layout
        >
          <div className="flex items-center cursor-pointer p-4" onClick={() => toggleExpand(project.id)}>
            <div className="w-10 h-10 overflow-hidden mr-4 flex-shrink-0">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={200}
                height={200}
                quality={100}
                className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="flex-grow">
              <h3 className="font-bold">{project.title}</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase">{project.category}</p>
            </div>
            <div className="ml-2">
              {expandedId === project.id ? (
                <ChevronUp className="w-5 h-5 text-neutral-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-neutral-500" />
              )}
            </div>
          </div>

          <AnimatePresence>
            {expandedId === project.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0">
                  <div className="w-full aspect-square h-56 overflow-hidden mb-4">
                    <Image
                      src={project.mainImage || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover bg-black filter md:grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  {project.subtitle && <p className="text-sm font-bold mb-2">{project.subtitle}</p>}
                  <p className="text-sm mb-4">{project.description}</p>
                  {project.details && (
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4">{project.details}</p>
                  )}

                  <Link href={`/projects/${project.id}`}>
                    <motion.div
                      className="flex items-center justify-center w-full py-3 bg-black dark:bg-white text-white dark:text-black rounded-sm text-sm font-medium"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      VIEW PROJECT <ArrowRight className="ml-2 w-4 h-4" />
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}
