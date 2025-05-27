import type React from "react"
import "./globals.css"
import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from "next-themes"

export const metadata = {
  title: "Portfolio | Designer & Developer",
  description: "Personal portfolio website showcasing creative work and services",
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans} gpu-accelerated`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
