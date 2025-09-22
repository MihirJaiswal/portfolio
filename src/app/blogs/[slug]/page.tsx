import React from 'react'
import { getBlogPostBySlug } from '@/lib/mdx'
import { serialize } from 'next-mdx-remote/serialize'
import rehypePrism from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'
import BlogPostClient from '../../../components/blog/blogdetail/BlogPostClient'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
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