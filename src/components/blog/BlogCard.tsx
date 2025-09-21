import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { Calendar } from 'lucide-react'
import React from 'react'

interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  image: string
  tags: string[]
}

interface BlogCardProps {
  post: BlogPost
  index: number
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.article
      className="group"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: Math.min(index * 0.05, 0.5),
        ease: "easeOut"
      }}
    >
      <div className="border border-neutral-200 dark:border-neutral-800 rounded-md overflow-hidden hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300">
        <Link href={`/blogs/${post.slug}`}>
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
        </Link>

        <div className="p-4 sm:p-5 md:p-6">
          <div className="flex flex-col items-start mb-2 gap-1">
            <div className="flex items-center gap-2 flex-shrink-0 ">
              <span className="text-xs text-neutral-500 dark:text-neutral-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex flex-col items-start min-w-0 flex-1">
              <Link href={`/blogs/${post.slug}`}>
                <h2 className="text-lg sm:text-xl font-bold group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors mb-1 line-clamp-2">
                  {post.title}
                </h2>
              </Link>
            </div>
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2 sm:line-clamp-3 leading-relaxed">
            {post.description.length > 120 
              ? `${post.description.substring(0, 120)}...` 
              : post.description
            }
          </p>

          <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 rounded border border-neutral-200 dark:border-neutral-700 truncate"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-2 py-1 text-xs text-neutral-500 dark:text-neutral-500 whitespace-nowrap">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}