import type React from "react"
import "./globals.css"
import { Manrope } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import { ThemeProvider } from "next-themes"
import { ScrollProvider } from "../components/animation/scroll-aniamtions"
import type { Metadata } from 'next'

const siteUrl = 'https://mihirjaiswal-portfolio.vercel.app'

// Load fonts with mobile optimizations
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-manrope',
  preload: true,
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif']
})

const geist = GeistSans // GeistSans has all weights pre-configured

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Mihir Jaiswal | Full Stack Developer & UI/UX Designer Portfolio',
    template: '%s | Mihir Jaiswal Portfolio'
  },
  description: 'Mihir Jaiswal - Full Stack Developer specializing in React, Next.js, Node.js & UI/UX Design. Explore 14+ innovative projects including AI applications, eCommerce platforms, and modern web solutions. Available for freelance work.',
  keywords: [
    'Mihir Jaiswal', 'Full Stack Developer', 'Frontend Developer',
    'Backend Developer', 'UI/UX Designer', 'React Developer',
    'Next.js Developer', 'Node.js Developer', 'TypeScript Developer',
    'Web Developer Portfolio', 'JavaScript Developer', 'Tailwind CSS',
    'MongoDB Developer', 'Express.js', 'AI Applications',
    'Ecommerce Development', 'Web Application Development',
    'Freelance Developer', 'GDSC CDGI', 'Indore Developer'
  ],
  authors: [{ name: 'Mihir Jaiswal', url: siteUrl }],
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
    url: siteUrl,
    siteName: 'Mihir Jaiswal Portfolio',
    title: 'Mihir Jaiswal | Full Stack Developer & UI/UX Designer',
    description: 'Full Stack Developer specializing in modern web technologies. Turning challenges into elegant digital solutions through creative design and expert development.',
    images: [
      {
        url: '/assets/img1.png',
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
    images: ['/assets/img1.png'],
    creator: '@mihir_jaiswal_',
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'technology',
  classification: 'Portfolio Website',
  verification: {
    google: 'XNSEycxa9cfRCuvJ0zP9yC5u_J0R-oriqXxyEM4Yp-Q',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Mihir Jaiswal',
  jobTitle: 'Full Stack Developer',
  description: 'Full Stack Developer specializing in turning challenges into simple, elegant digital products through creative design and expert development.',
  url: siteUrl,
  email: 'jaiswalmihir.business@gmail.com',
  image: '/assets/img1.png',
  sameAs: [
    'https://www.instagram.com/mihir_jaiswal_/',
    'https://www.linkedin.com/in/mihir-jaiswal-322898287/',
    'https://github.com/MihirJaiswal',
    'https://www.youtube.com/@MihirJaiswal-vn4vm',
  ],
  knowsAbout: [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js',
    'MongoDB', 'Express.js', 'Tailwind CSS', 'UI/UX Design',
    'Full Stack Development', 'Machine Learning', 'AI Applications',
    'Game Development', 'Cybersecurity'
  ],
  workExample: [
    {
      '@type': 'CreativeWork',
      name: 'nyx UI',
      description: 'A modern UI component library for React applications',
      url: 'https://nyxui.vercel.app/'
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
    },
    {
      '@type': 'CreativeWork',
      name: 'MONSTER PEDIA',
      description: 'Comprehensive Pokemon database with tools and features',
      url: 'https://monsterpedia-orcin.vercel.app/'
    },
    {
      '@type': 'CreativeWork',
      name: 'CYBERSPHERE',
      description: 'Machine learning powered phishing detection system',
      url: 'https://cyber-sphere-minor-project.vercel.app/'
    }
  ],
  alumniOf: {
    '@type': 'Organization',
    name: 'CDGI',
    location: 'Indore, India'
  },
  memberOf: {
    '@type': 'Organization',
    name: 'Google Developer Student Clubs CDGI'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon" type="image/png" sizes="64x64" />
        {/* Font preloading for better mobile performance */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/manrope/v15/xn7_YHE41ni1AdIRggexSg.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${manrope.variable} ${geist.variable} font-sans gpu-accelerated`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ScrollProvider>{children}</ScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}