'use server'

import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const blogDirectory = join(process.cwd(), 'src/content/blog')

export interface TOCItem {
  id: string
  title: string
  level: number
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  readingTime: string
  author: string
  image: string
  tags: string[]
  content: string
  tableOfContents: TOCItem[]
}

// Function to extract table of contents from markdown content
function extractTableOfContents(content: string): TOCItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const toc: TOCItem[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const title = match[2].trim()
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-|-$/g, '') // Remove leading/trailing hyphens

    toc.push({
      id,
      title,
      level
    })
  }

  return toc
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const files = readdirSync(blogDirectory)
    const posts = files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => {
        const filePath = join(blogDirectory, file)
        const fileContents = readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
          slug: file.replace(/\.mdx$/, ''),
          title: data.title,
          description: data.description || '',
          date: data.date,
          author: data.author,
          readingTime: data.readingTime,
          image: data.image,
          tags: data.tags || [],
          content,
          tableOfContents: extractTableOfContents(content),
        }
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return posts
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = join(blogDirectory, `${slug}.mdx`)
    const fileContents = readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      description: data.description || '',
      date: data.date,
      author: data.author,
      readingTime: data.readingTime,
      image: data.image,
      tags: data.tags || [],
      content,
      tableOfContents: extractTableOfContents(content),
    }
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}