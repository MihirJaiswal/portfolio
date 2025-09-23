import type React from "react"
import "./globals.css"
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "next-themes"
import type { Metadata } from 'next'
import Footer from "@/components/footer/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { projects } from "@/lib/project";

const siteUrl = 'https://mihirjaiswal.me'
const profileImage = `${siteUrl}/mihir.webp`
const nowYear = new Date().getFullYear()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Mihir Jaiswal – Full Stack Developer & UI/UX Designer | Indore, India',
    template: '%s | Mihir Jaiswal'
  },
  description:
    'Mihir Jaiswal — Full Stack Developer, UI/UX Designer & Artist from Indore, India. Creator of Nyx UI (200+ users). Expert in React, Next.js, Node.js, AI/ML. Portfolio, technical blog, projects & contact.',
  keywords: [
    'Mihir Jaiswal',
    'Full Stack Developer',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'UI/UX Designer',
    'Nyx UI',
    'Digi Bazaar',
    'StoryWeaver AI',
    'Monster Pedia',
    'Hero HQ',
    'Ghibli Verse',
    'Cybersphere',
    'Indore',
    'CDGI',
    'GDSC',
    'technical blog',
    'portfolio',
    'JavaScript',
    'TypeScript',
    'AI',
    'Machine Learning'
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
      'max-snippet': -1
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Mihir Jaiswal - Official Website',
    title: 'Mihir Jaiswal – Full Stack Developer & UI/UX Designer | Indore, India',
    description:
      'Creator of Nyx UI (used by 200+ developers). Full Stack Developer specializing in React, Next.js, Node.js, AI/ML. Explore portfolio, projects, blog & contact.',
    images: [
      {
        url: profileImage,
        width: 1200,
        height: 630,
        alt: 'Mihir Jaiswal - Full Stack Developer & UI/UX Designer'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mihir Jaiswal – Full Stack Developer & UI/UX Designer',
    description:
      'Creator of Nyx UI (200+ developers). Full Stack Developer from Indore, India. Visit my projects, blog & contact for hire or collaborations.',
    images: [profileImage],
    creator: '@mihir_jaiswal_',
    site: '@mihir_jaiswal_'
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-US': siteUrl,
      'en': siteUrl,
    }
  },
  category: 'technology',
  classification: 'Personal Website',
  verification: {
    google: 'qbhl-AHgSBR--Uq3f1CZJgovCp7J-_wE59AYyRNvX5Q'
  },
  other: {
    // Geographic data
    'geo.region': 'IN-MP',
    'geo.placename': 'Indore, Madhya Pradesh',
    'geo.position': '22.7196;75.8577',
    'ICBM': '22.7196, 75.8577',
    
    // Dublin Core metadata
    'DC.title': 'Mihir Jaiswal - Full Stack Developer Portfolio',
    'DC.creator': 'Mihir Jaiswal',
    'DC.subject': 'Full Stack Developer, Web Developer, Software Engineer, UI/UX Designer',
    'DC.description': 'Official portfolio of Mihir Jaiswal, Full Stack Developer from Indore, India',
    'DC.language': 'en',
    'DC.coverage': 'Indore, India',
    
    // Mobile optimization
    'format-detection': 'telephone=no',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Mihir Jaiswal',
    
    // Additional SEO signals
    'rating': 'general',
    'distribution': 'global',
    'revisit-after': '7 days',
  }
}

export const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Mihir Jaiswal',
      givenName: 'Mihir',
      familyName: 'Jaiswal',
      birthDate: '2001-11-10',
      image: profileImage,
      url: siteUrl,
      email: 'jaiswalmihir.business@gmail.com',
      jobTitle: ['Full Stack Developer', 'UI/UX Designer', 'Software Engineer'],
      description:
        'Full Stack Developer, UI/UX Designer and Artist from Indore, India. Creator of Nyx UI (used by 200+ developers). Member of Google Developer Student Clubs (GDSC CDGI).',
      award: ['Student of the Year, CDGI'],
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'CDGI',
        alternateName: 'Career Development Group of Institutions',
        url: 'https://cdgi.example.org'
      },
      memberOf: {
        '@type': 'Organization',
        name: 'Google Developer Student Clubs CDGI',
        url: 'https://gdsc.community.dev'
      },
      sameAs: [
        'https://www.linkedin.com/in/mihir-jaiswal-322898287/',
        'https://github.com/MihirJaiswal',
        'https://www.instagram.com/mihir_jaiswal_/',
        'https://www.instagram.com/monty_draws_/',
        'https://www.youtube.com/@MihirJaiswal-vn4vm',
        'https://twitter.com/mihir_jaiswal_',
        'https://peerlist.io/jaiswalmihir',
        'https://www.producthunt.com/@mihir_jaiswal1'
      ],
      knowsAbout: [
        'JavaScript',
        'TypeScript',
        'React',
        'Next.js',
        'Node.js',
        'MongoDB',
        'Express',
        'Tailwind CSS',
        'Framer Motion',
        'AI/ML',
        'Game Development',
        'Cybersecurity',
        'UI/UX Design'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Mihir Jaiswal Official Website',
      description:
        'Portfolio and personal website of Mihir Jaiswal — Full Stack Developer, UI/UX Designer & Artist from Indore, India.',
      publisher: { '@id': `${siteUrl}/#person` },
      inLanguage: 'en-US',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    },
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/#homepage`,
      url: siteUrl,
      name: 'Home - Mihir Jaiswal',
      isPartOf: { '@id': `${siteUrl}/#website` },
      mainEntity: { '@id': `${siteUrl}/#person` }
    },
    {
      '@type': 'Blog',
      '@id': `${siteUrl}/blogs/#blog`,
      name: 'Technical Blog - Mihir Jaiswal',
      description: 'Technical articles, tutorials and notes about web development, AI and UI design.',
      url: `${siteUrl}/blogs`,
      inLanguage: 'en-US',
      mainEntityOfPage: { '@id': `${siteUrl}/blogs` },
      publisher: { '@id': `${siteUrl}/#person` }
    },

    ...projects.map((p) => ({
      '@type': 'CreativeWork',
      '@id': `${siteUrl}/projects/${p.id}#work`,
      name: p.title,
      headline: p.subtitle,
      description: p.fullDescription || p.description,
      url: p.link,
      datePublished: p.year ? `${p.year}-01-01` : `${nowYear}-01-01`,
      author: { '@id': `${siteUrl}/#person` },
      keywords: (p.technologies || []).join(', '),
      thumbnailUrl: typeof p.image === 'string' ? p.image : siteUrl + '/mihir.webp' // Handle both string URLs and imported images
    }))
  ]
}

export const jsonLdString = JSON.stringify(jsonLd, null, 2)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" sizes="64x64" href="/icon" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString }}
        />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable}  font-sans gpu-accelerated`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            {children}
            <Footer/>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}