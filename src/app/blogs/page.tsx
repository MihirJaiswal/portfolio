import React from 'react'
import { getAllBlogPosts } from '@/lib/mdx'
import BlogClient from './BlogClient'

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  return <BlogClient posts={posts} />
} 