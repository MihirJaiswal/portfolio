import React from 'react'
import { getAllBlogPosts } from '@/lib/mdx'
import BlogClient from '@/components/blog/BlogClient'
import { Navbar } from '@/components/navbar/Navbar'

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  return (
    <>
    <Navbar/>
    <BlogClient posts={posts} />
    </>
  )
} 