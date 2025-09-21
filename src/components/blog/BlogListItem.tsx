import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { Calendar, BookOpen, ArrowUpRight } from 'lucide-react'

interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  image: string
  tags: string[]
}

interface BlogListItemProps {
  post: BlogPost
  index: number
}

export function BlogListItem({ post, index }: BlogListItemProps) {
  return (
    <motion.div
      className="border-b border-neutral-200 dark:border-neutral-800 last:border-b-0"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: Math.min(index * 0.05, 0.5),
        ease: "easeOut"
      }}
    >
      <article className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-all duration-200 group">
        {/* Blog Image */}
        <Link 
          href={`/blogs/${post.slug}`} 
          className="flex-shrink-0 w-full sm:w-auto group/image"
          aria-label={`Read ${post.title}`}
        >
          <div className="relative w-full h-32 sm:w-20 sm:h-20 rounded-md overflow-hidden bg-neutral-100 dark:bg-neutral-800 transition-transform duration-200 group-hover/image:scale-105">
            <Image
              src={post.image}
              alt={`${post.title} blog post image`}
              width={80}
              height={80}
              loading="lazy"
              className="w-full h-full object-cover transition-opacity duration-200 group-hover/image:opacity-90"
            />
            <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/5 transition-colors duration-200" />
          </div>
        </Link>

        {/* Blog Content */}
        <div className="flex-1 min-w-0 w-full">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
            <div className="min-w-0 flex-1">
              <Link 
                href={`/blogs/${post.slug}`}
                className="group/title"
              >
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 group-hover/title:text-neutral-600 dark:group-hover/title:text-neutral-300 transition-colors duration-200 line-clamp-1 flex items-center gap-2">
                  {post.title}
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover/title:opacity-100 transition-all duration-200 transform translate-x-0 group-hover/title:translate-x-1 group-hover/title:-translate-y-1" />
                </h3>
              </Link>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 uppercase tracking-wide truncate font-medium">
                  {post.author}
                </p>
                <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600"></span>
                <span className="text-xs text-neutral-500 dark:text-neutral-500 flex items-center gap-1 flex-shrink-0">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2 sm:line-clamp-1 leading-relaxed">
            {post.description.length > 150 
              ? `${post.description.substring(0, 150)}...` 
              : post.description
            }
          </p>

          {/* Footer Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Tags */}
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {post.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-md border border-neutral-200 dark:border-neutral-700 transition-colors duration-200 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                >
                  {tag}
                </span>
              ))}
              {post.tags.length > 4 && (
                <span className="px-2.5 py-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  +{post.tags.length - 4} more
                </span>
              )}
            </div>

            {/* Action Links */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="text-xs text-neutral-500 dark:text-neutral-500">
                {Math.ceil(post.description.split(' ').length / 200)} min read
              </div>
              
              <Link
                href={`/blogs/${post.slug}`}
                className="group/link flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200 touch-manipulation"
              >
                <BookOpen className="w-4 h-4 transition-transform duration-200 group-hover/link:scale-110" />
                <span className="hidden sm:inline font-medium">Read</span>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </motion.div>
  )
}