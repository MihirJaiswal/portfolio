import React from 'react'
import { Navbar } from '@/components/navbar/Navbar'
import ProjectsPage from '@/components/projects/projectpage/ProjectPage'
import type { Metadata } from 'next'

const siteUrl = 'https://mihirjaiswal.me'
const projectsPageUrl = `${siteUrl}/projects`
const profileImage = `${siteUrl}/mihir.webp`

export const metadata: Metadata = {
  title: 'Projects - Full Stack Development Portfolio | Mihir Jaiswal',
  description: 'Explore my full stack development projects including Nyx UI (200+ users), Digi Bazaar e-commerce, StoryWeaver AI, Monster Pedia, Hero HQ, and more. Built with React, Next.js, Node.js, AI/ML.',
  keywords: [
    'Mihir Jaiswal projects',
    'full stack projects',
    'React projects',
    'Next.js projects',
    'Nyx UI',
    'Digi Bazaar',
    'StoryWeaver AI',
    'Monster Pedia',
    'Hero HQ',
    'Ghibli Verse',
    'Cybersphere',
    'web development portfolio',
    'JavaScript projects',
    'TypeScript projects',
    'AI projects',
    'e-commerce projects',
    'open source projects'
  ],
  openGraph: {
    type: 'website',
    url: projectsPageUrl,
    title: 'Projects - Full Stack Development Portfolio | Mihir Jaiswal',
    description: 'Discover innovative full stack projects by Mihir Jaiswal. From Nyx UI component library to AI-powered applications and e-commerce solutions.',
    images: [
      {
        url: profileImage,
        width: 1200,
        height: 630,
        alt: 'Mihir Jaiswal - Full Stack Developer Projects Portfolio'
      }
    ],
    siteName: 'Mihir Jaiswal - Official Website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects Portfolio - Mihir Jaiswal',
    description: 'Full stack projects showcase: Nyx UI, AI applications, e-commerce solutions & more. Built with modern web technologies.',
    images: [profileImage],
    creator: '@mihir_jaiswal_'
  },
  alternates: {
    canonical: projectsPageUrl
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
  }
}

export default function page() {
  return (
    <>
    <Navbar/>
    <ProjectsPage/>
    </>
  )
}