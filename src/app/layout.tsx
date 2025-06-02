import type React from "react"
import "./globals.css"
import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from "next-themes"
import { ScrollProvider } from "../components/animation/scroll-aniamtions"
import type { Metadata } from 'next'
// Enhanced metadata for better SEO
export const metadata: Metadata = {
  metadataBase: new URL('https://mihirjaiswal.dev/'),
  title: {
    default: 'Mihir Jaiswal | Full Stack Developer & UI/UX Designer Portfolio',
    template: '%s | Mihir Jaiswal Portfolio'
  },
  description: 'Mihir Jaiswal - Full Stack Developer specializing in React, Next.js, Node.js & UI/UX Design. Explore 15+ innovative projects including AI applications, eCommerce platforms, and modern web solutions. Available for freelance work.',
  keywords: [
    'Mihir Jaiswal',
    'Full Stack Developer',
    'Frontend Developer', 
    'Backend Developer',
    'UI/UX Designer',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'TypeScript Developer',
    'Web Developer Portfolio',
    'JavaScript Developer',
    'Tailwind CSS',
    'MongoDB Developer',
    'Express.js',
    'AI Applications',
    'Ecommerce Development',
    'Web Application Development',
    'Freelance Developer',
    'GDSC CDGI',
    'Indore Developer'
  ],
  authors: [{ name: 'Mihir Jaiswal', url: 'https://mihirjaiswal.dev' }],
  creator: 'Mihir Jaiswal',
  publisher: 'Mihir Jaiswal',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mihirjaiswal.dev',
    siteName: 'Mihir Jaiswal Portfolio',
    title: 'Mihir Jaiswal | Full Stack Developer & UI/UX Designer',
    description: 'Full Stack Developer specializing in modern web technologies. Turning challenges into elegant digital solutions through creative design and expert development.',
    images: [
      {
        url: '/img1.png',
        width: 1200,
        height: 630,
        alt: 'Mihir Jaiswal - Full Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mihir Jaiswal | Full Stack Developer & UI/UX Designer',
    description: 'Full Stack Developer specializing in React, Next.js, Node.js & UI/UX Design. Check out my innovative projects and solutions.',
    images: ['/img1.jpg'],
    creator: '@mihir_jaiswal_',
  },
  alternates: {
    canonical: 'https://mihirjaiswal.dev',
  },
  category: 'technology',
  classification: 'Portfolio Website',
  verification: {
    google: 'your-google-verification-code', 
  },
}

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mihir Jaiswal',
  jobTitle: 'Full Stack Developer',
  description: 'Full Stack Developer specializing in turning challenges into simple, elegant digital products through creative design and expert development.',
  url: 'https://mihirjaiswal.dev',
  email: 'jaiswalmihir.business@gmail.com',
  image: '/img1.png',
  sameAs: [
    'https://www.instagram.com/mihir_jaiswal_/',
    'https://www.linkedin.com/in/mihir-jaiswal-322898287/',
    'https://github.com/MihirJaiswal',
  ],
  knowsAbout: [
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'MongoDB',
    'Express.js',
    'Tailwind CSS',
    'UI/UX Design',
    'Full Stack Development',
    'Machine Learning',
    'AI Applications'
  ],
  workExample: [
    {
      '@type': 'CreativeWork',
      name: 'NUVYX UI',
      description: 'A modern UI component library for React applications',
      url: 'https://nuvyxui.vercel.app/'
    },
    {
      '@type': 'CreativeWork', 
      name: 'DIGI BAZAAR',
      description: 'Comprehensive eCommerce & warehouse management solution',
      url: 'https://github.com/MihirJaiswal/digibazaar-frontend'
    },
    {
      '@type': 'CreativeWork',
      name: 'STORYWEAVER AI',
      description: 'AI-powered story generator with scene and image creation',
      url: 'https://story-weaver-ai.vercel.app/'
    }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${GeistSans.className} gpu-accelerated`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <ScrollProvider>{children}</ScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}