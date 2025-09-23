import React from 'react'
import { getAllBlogPosts } from '@/lib/mdx'
import BlogClient from '@/components/blog/BlogClient'
import { Navbar } from '@/components/navbar/Navbar'
import type { Metadata } from 'next'

const siteUrl = 'https://mihirjaiswal.me'
const blogsPageUrl = `${siteUrl}/blogs`
const profileImage = `${siteUrl}/mihir.webp`

export const metadata: Metadata = {
  title: 'Technical Blog - Web Development & AI Insights | Mihir Jaiswal',
  description: 'Explore technical articles, tutorials, and insights on web development, AI/ML, React, Next.js, and modern JavaScript. Learn from real-world projects and industry best practices.',
  keywords: [
    'Mihir Jaiswal blog',
    'technical blog',
    'web development tutorials',
    'React tutorials',
    'Next.js articles',
    'JavaScript tips',
    'TypeScript guide',
    'AI ML insights',
    'full stack development',
    'programming tutorials',
    'software engineering blog',
    'frontend development',
    'backend development',
    'UI UX design articles',
    'developer insights',
    'coding best practices',
    'tech tutorials',
    'programming blog'
  ],
  openGraph: {
    type: 'website',
    url: blogsPageUrl,
    title: 'Technical Blog - Web Development & AI Insights | Mihir Jaiswal',
    description: 'Technical articles, tutorials, and insights on modern web development, AI/ML, and software engineering from Mihir Jaiswal.',
    images: [
      {
        url: profileImage,
        width: 1200,
        height: 630,
        alt: 'Mihir Jaiswal - Technical Blog & Programming Tutorials'
      }
    ],
    siteName: 'Mihir Jaiswal - Software Engineer'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technical Blog - Mihir Jaiswal',
    description: 'Web development tutorials, AI insights, and programming best practices. Learn modern tech stack implementations.',
    images: [profileImage],
    creator: '@mihir_jaiswal_'
  },
  alternates: {
    canonical: blogsPageUrl,
    types: {
      'application/rss+xml': `${siteUrl}/feed.xml`
    }
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
  category: 'Technology',
  other: {
    'article:section': 'Technology',
    'og:type': 'blog',
  }
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  return (
    <>
    <Navbar/>
    <BlogClient posts={posts} />
    </>
  )
}