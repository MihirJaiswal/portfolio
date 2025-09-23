import React from 'react'
import { Metadata } from 'next'
import { getBlogPostBySlug } from '@/lib/mdx'
import { serialize } from 'next-mdx-remote/serialize'
import rehypePrism from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'
import BlogPostClient from '../../../components/blog/blogdetail/BlogPostClient'

const siteUrl = 'https://mihirjaiswal.me'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found | Mihir Jaiswal',
      description: 'The blog post you are looking for could not be found.',
      robots: {
        index: false,
        follow: false,
      }
    }
  }

  const postUrl = `${siteUrl}/blog/${slug}`
  const postImage = post.image ? `${siteUrl}${post.image}` : `${siteUrl}/mihir.webp`
  const publishedDate = new Date(post.date).toISOString()

  return {
    title: `${post.title} | Mihir Jaiswal`,
    description: post.description,
    keywords: [
      ...post.tags,
      'Mihir Jaiswal',
      'technical blog',
      'programming tutorial',
      'web development',
      'software engineering',
      ...(post.tags.includes('Next.js') ? ['Next.js tutorial', 'React framework'] : []),
      ...(post.tags.includes('React') ? ['React tutorial', 'JavaScript framework'] : []),
      ...(post.tags.includes('JavaScript') ? ['JavaScript guide', 'JS tutorial'] : []),
    ],
    authors: [{ name: post.author || 'Mihir Jaiswal' }],
    creator: post.author || 'Mihir Jaiswal',
    publisher: 'Mihir Jaiswal',
    openGraph: {
      type: 'article',
      url: postUrl,
      title: post.title,
      description: post.description,
      images: [
        {
          url: postImage,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ],
      siteName: 'Mihir Jaiswal - Official Website',
      publishedTime: publishedDate,
      authors: [post.author || 'Mihir Jaiswal'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [postImage],
      creator: '@mihir_jaiswal_'
    },
    alternates: {
      canonical: postUrl,
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
      'article:author': post.author || 'Mihir Jaiswal',
      'article:published_time': publishedDate,
      'article:tag': post.tags.join(', '),
      'og:type': 'article',
      'reading_time': post.readingTime || '5 min read',
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <a
            href="/blog"
            className="inline-flex items-center px-6 py-3 rounded-full border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-900 hover:border-neutral-900 hover:text-white dark:hover:bg-neutral-50 dark:hover:text-black dark:hover:border-neutral-50 transition-all duration-300"
          >
            Back to Blog
          </a>
        </div>
      </div>
    )
  }

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        [
          rehypePrism,
          {
            ignoreMissing: true,
            showLineNumbers: true,
            defaultLanguage: 'typescript',
          },
        ],
      ],
    },
  })

  return <BlogPostClient post={post} mdxSource={mdxSource} />
}