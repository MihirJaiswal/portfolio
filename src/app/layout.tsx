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
    default: 'Mihir Jaiswal | Official Website - Full Stack Developer',
    template: '%s | Mihir Jaiswal'
  },
  description: 'Mihir Jaiswal - Official website of Full Stack Developer from Indore, India. Expert in React, Next.js, Node.js, AI applications. GDSC CDGI member with 14+ projects including eCommerce platforms and machine learning solutions.',
  keywords: [
    // Primary target keywords (most important first)
    'Mihir Jaiswal',
    'Mihir Jaiswal official',
    'Mihir Jaiswal developer',
    'Mihir Jaiswal Indore',
    'Mihir Jaiswal India',
    'Mihir Jaiswal CDGI',
    'Mihir Jaiswal GDSC',
    'Mihir Jaiswal official website',
    
    // Supporting keywords
    'Full Stack Developer Mihir Jaiswal',
    'React Developer Mihir Jaiswal',
    'Next.js Developer Mihir Jaiswal',
    'UI/UX Designer Mihir Jaiswal',
    'AI Developer Mihir Jaiswal',
    'Web Developer Mihir Jaiswal',
    'JavaScript Developer Mihir Jaiswal',
    'TypeScript Developer Mihir Jaiswal',
    'Node.js Developer Mihir Jaiswal',
    
    // Location-based
    'Mihir Jaiswal Madhya Pradesh',
    'Developer Indore Mihir Jaiswal',
    'CDGI student Mihir Jaiswal',
    'Google Developer Student Club Mihir Jaiswal',
    
    // Professional identifiers
    'jaiswalmihir.business@gmail.com',
    '@mihir_jaiswal_',
    'github.com/MihirJaiswal',
    'linkedin.com/in/mihir-jaiswal-322898287'
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
    siteName: 'Mihir Jaiswal - Official Website',
    title: 'Mihir Jaiswal | Full Stack Developer from Indore, India',
    description: 'Official website of Mihir Jaiswal - Full Stack Developer specializing in React, Next.js, AI applications. GDSC CDGI member with expertise in modern web technologies.',
    images: [
      {
        url: '/assets/img1.png',
        width: 1200,
        height: 630,
        alt: 'Mihir Jaiswal - Full Stack Developer from Indore, India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mihir Jaiswal | Official Website - Full Stack Developer',
    description: 'Mihir Jaiswal - Full Stack Developer from Indore, India. Expert in React, Next.js, Node.js, AI applications. GDSC CDGI member.',
    images: ['/assets/img1.png'],
    creator: '@mihir_jaiswal_',
    site: '@mihir_jaiswal_',
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'technology',
  classification: 'Personal Website',
  verification: {
    google: 'XNSEycxa9cfRCuvJ0zP9yC5u_J0R-oriqXxyEM4Yp-Q',
  },
  // Add this for better local SEO
  other: {
    'geo.region': 'IN-MP',
    'geo.placename': 'Indore',
    'geo.position': '22.7196;75.8577', // Indore coordinates
    'ICBM': '22.7196, 75.8577',
    'DC.title': 'Mihir Jaiswal - Official Website',
    'DC.creator': 'Mihir Jaiswal',
    'DC.subject': 'Full Stack Developer, Web Developer, Software Engineer',
    'DC.description': 'Official website of Mihir Jaiswal, Full Stack Developer from Indore, India',
  }
}

// Enhanced JSON-LD with more specific targeting
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Person', 'WebSite'],
  '@id': `${siteUrl}/#mihir-jaiswal`,
  name: 'Mihir Jaiswal',
  givenName: 'Mihir',
  familyName: 'Jaiswal',
  alternateName: ['Mihir Jaiswal Developer', 'Mihir Jaiswal CDGI', 'Mihir Jaiswal GDSC'],
  
  // Professional info
  jobTitle: ['Full Stack Developer', 'UI/UX Designer', 'Software Engineer'],
  description: 'Mihir Jaiswal is a Full Stack Developer from Indore, India, specializing in React, Next.js, Node.js, and AI applications. Member of Google Developer Student Clubs at CDGI.',
  
  // Contact and social
  url: siteUrl,
  email: 'jaiswalmihir.business@gmail.com',
  
  // Location
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Indore',
    addressRegion: 'Madhya Pradesh',
    addressCountry: 'India',
    addressCountryCode: 'IN'
  },
  
  // Education
  alumniOf: [
    {
      '@type': 'Organization',
      name: 'CDGI',
      alternateName: 'Career Development Group of Institutions',
      location: 'Indore, Madhya Pradesh, India'
    }
  ],
  
  // Professional associations
  memberOf: [
    {
      '@type': 'Organization',
      name: 'Google Developer Student Clubs CDGI',
      alternateName: 'GDSC CDGI'
    }
  ],
  
  // Skills and expertise
  knowsAbout: [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js',
    'MongoDB', 'Express.js', 'Tailwind CSS', 'UI/UX Design',
    'Full Stack Development', 'Machine Learning', 'AI Applications',
    'Game Development', 'Cybersecurity', 'Web Development',
    'Frontend Development', 'Backend Development'
  ],
  
  // Professional experience
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Full Stack Developer',
    description: 'Develops modern web applications using React, Next.js, Node.js, and AI technologies',
    occupationLocation: {
      '@type': 'City',
      name: 'Indore',
      containedInPlace: {
        '@type': 'State',
        name: 'Madhya Pradesh',
        containedInPlace: {
          '@type': 'Country',
          name: 'India'
        }
      }
    },
    skills: 'React, Next.js, Node.js, TypeScript, MongoDB, AI/ML, UI/UX Design'
  },
  
  // Social media profiles
  sameAs: [
    'https://www.instagram.com/mihir_jaiswal_/',
    'https://www.linkedin.com/in/mihir-jaiswal-322898287/',
    'https://github.com/MihirJaiswal',
    'https://www.youtube.com/@MihirJaiswal-vn4vm',
    'https://twitter.com/mihir_jaiswal_',
  ],
  
  // Portfolio/work examples
  workExample: [
    {
      '@type': 'CreativeWork',
      '@id': `${siteUrl}/#nyx-ui`,
      name: 'nyx UI by Mihir Jaiswal',
      description: 'Modern UI component library for React applications developed by Mihir Jaiswal',
      url: 'https://nyxui.vercel.com/',
      creator: {
        '@type': 'Person',
        name: 'Mihir Jaiswal'
      }
    },
    {
      '@type': 'CreativeWork',
      '@id': `${siteUrl}/#digi-bazaar`,
      name: 'DIGI BAZAAR by Mihir Jaiswal',
      description: 'Comprehensive eCommerce & warehouse management solution by Mihir Jaiswal',
      url: 'https://github.com/MihirJaiswal/digibazaar-frontend',
      creator: {
        '@type': 'Person',
        name: 'Mihir Jaiswal'
      }
    },
    {
      '@type': 'CreativeWork',
      '@id': `${siteUrl}/#storyweaver-ai`,
      name: 'STORYWEAVER AI by Mihir Jaiswal',
      description: 'AI-powered story generator with scene and image creation by Mihir Jaiswal',
      url: 'https://story-weaver-ai.vercel.app/',
      creator: {
        '@type': 'Person',
        name: 'Mihir Jaiswal'
      }
    },
    {
      '@type': 'CreativeWork',
      '@id': `${siteUrl}/#monster-pedia`,
      name: 'MONSTER PEDIA by Mihir Jaiswal',
      description: 'Comprehensive Pokemon database with tools developed by Mihir Jaiswal',
      url: 'https://monsterpedia-orcin.vercel.app/',
      creator: {
        '@type': 'Person',
        name: 'Mihir Jaiswal'
      }
    },
    {
      '@type': 'CreativeWork',
      '@id': `${siteUrl}/#cybersphere`,
      name: 'CYBERSPHERE by Mihir Jaiswal',
      description: 'Machine learning powered phishing detection system by Mihir Jaiswal',
      url: 'https://cyber-sphere-minor-project.vercel.app/',
      creator: {
        '@type': 'Person',
        name: 'Mihir Jaiswal'
      }
    }
  ],
  
  // Website information
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': siteUrl,
    name: 'Mihir Jaiswal - Official Website',
    description: 'Official website and portfolio of Mihir Jaiswal, Full Stack Developer from Indore, India',
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: 'Mihir Jaiswal Official Website',
      alternateName: 'Mihir Jaiswal Portfolio',
      url: siteUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      }
    }
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