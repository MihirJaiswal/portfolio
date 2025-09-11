"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, Twitter, X } from "lucide-react"
import { motion } from "motion/react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import {Linkedin, Github, Youtube } from "lucide-react";
import { siteConfig } from "../../lib/data";
import { StaggerContainer } from "../animation/scroll-animations"

interface MobileMenuProps {
  links: {
    href: string
    label: string
  }[]
  onToggle?: (isOpen: boolean) => void
}

export function MobileMenu({ links, onToggle }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])
  
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    onToggle?.(open)
    
    if (open) {
      setTimeout(() => {
        firstLinkRef.current?.focus()
      }, 100)
    } else {
      menuButtonRef.current?.focus()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      setIsOpen(false)
      menuButtonRef.current?.focus()
    }
  }

  const itemVariants = reducedMotion ? {} : {
    hidden: { 
      opacity: 0, 
      x: 50,
      transition: { duration: 0.2 }
    },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.1 + 0.2,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  }

  const hoverVariants = reducedMotion ? {} : {
    x: 10,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={handleOpenChange}>
        <SheetTrigger asChild>
          <motion.button
            ref={menuButtonRef}
            className="w-10 h-10 flex items-center justify-center relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 rounded-md"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-haspopup="true"
            whileTap={reducedMotion ? {} : { scale: 0.95 }}
            onKeyDown={handleKeyDown}
          >
            <motion.div
              animate={reducedMotion ? {} : (isOpen ? { rotate: 90 } : { rotate: 0 })}
              transition={reducedMotion ? {} : { duration: 0.2 }}
            >
              {isOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </motion.div>
          </motion.button>
        </SheetTrigger>
        
        <SheetContent 
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
          side="right" 
          className="w-full sm:w-[400px] bg-white dark:bg-neutral-950 border-l border-neutral-200 dark:border-neutral-800 focus:outline-none"
          onKeyDown={handleKeyDown}
        >
          <SheetHeader className="text-center mb-8">
            <SheetTitle id="mobile-menu-title" className="text-2xl font-bold">
              Navigation Menu
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col h-full">
            <nav className="flex-1" role="navigation" aria-label="Main navigation">
              <motion.div 
                className="space-y-6 flex flex-col items-center"
                initial={reducedMotion ? {} : "hidden"}
                animate={reducedMotion ? {} : "visible"}
              >
                {links.map((link, index) => (
                  <motion.div
                    key={link.href}
                    custom={index}
                    whileHover={hoverVariants}
                    className="w-full max-w-xs"
                  >
                    <SheetClose asChild>
                      <Link
                        ref={index === 0 ? firstLinkRef : undefined}
                        href={link.href}
                        className="block text-xl font-medium py-3 px-4 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:bg-neutral-100 dark:focus:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 transition-all duration-200 relative overflow-hidden group text-center w-full"
                        tabIndex={0}
                      >
                        <span className="relative z-10">{link.label}</span>
                        
                        {/* Animated background */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 opacity-0 group-hover:opacity-100 group-focus:opacity-100"
                          initial={reducedMotion ? {} : { x: "-100%" }}
                          whileHover={reducedMotion ? {} : { x: 0 }}
                          transition={reducedMotion ? {} : { duration: 0.3 }}
                        />
                        
                        {/* Border accent */}
                        <motion.div
                          className="absolute left-0 top-0 w-1 h-full bg-neutral-900 dark:bg-neutral-100"
                          initial={reducedMotion ? {} : { scaleY: 0 }}
                          whileHover={reducedMotion ? {} : { scaleY: 1 }}
                          transition={reducedMotion ? {} : { duration: 0.2 }}
                          style={reducedMotion ? {} : { originY: 0 }}
                        />
                      </Link>
                    </SheetClose>
                  </motion.div>
                ))}
              </motion.div>
            </nav>

            <StaggerContainer>
              <motion.div
                className="flex justify-center items-center space-x-8 py-8 border-t"
                role="complementary"
                aria-label="Social media links"
                initial={reducedMotion ? {} : { opacity: 0, x: 20 }}
                animate={reducedMotion ? {} : { opacity: 1, x: 0 }}
                transition={reducedMotion ? {} : { duration: 0.6 }}
              >
                <Link
                  href={siteConfig.social.twitter}
                  aria-label="Visit our Twitter profile (opens in new tab)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 rounded-full border border-neutral-400 dark:border-neutral-600 flex items-center justify-center hover:bg-neutral-900 hover:text-neutral-50 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 focus:bg-neutral-900 focus:text-neutral-50 dark:focus:bg-neutral-50 dark:focus:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 transition-all"
                >
                  <Twitter className="w-5 h-5 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-50 dark:group-hover:text-neutral-900 group-focus:text-neutral-50 dark:group-focus:text-neutral-900" aria-hidden="true" />
                </Link>
                <Link
                  href={siteConfig.social.github}
                  aria-label="Visit our GitHub profile (opens in new tab)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 rounded-full border border-neutral-400 dark:border-neutral-600 flex items-center justify-center hover:bg-neutral-900 hover:text-neutral-50 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 focus:bg-neutral-900 focus:text-neutral-50 dark:focus:bg-neutral-50 dark:focus:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 transition-all"
                >
                  <Github className="w-5 h-5 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-50 dark:group-hover:text-neutral-900 group-focus:text-neutral-50 dark:group-focus:text-neutral-900" aria-hidden="true" />
                </Link>
                <Link
                  href={siteConfig.social.linkedin}
                  aria-label="Visit our LinkedIn profile (opens in new tab)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 rounded-full border border-neutral-400 dark:border-neutral-600 flex items-center justify-center hover:bg-neutral-900 hover:text-neutral-50 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 focus:bg-neutral-900 focus:text-neutral-50 dark:focus:bg-neutral-50 dark:focus:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 transition-all"
                >
                  <Linkedin className="w-5 h-5 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-50 dark:group-hover:text-neutral-900 group-focus:text-neutral-50 dark:group-focus:text-neutral-900" aria-hidden="true" />
                </Link>
                <Link
                  href={siteConfig.social.youtube}
                  aria-label="Visit our YouTube channel (opens in new tab)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 rounded-full border border-neutral-400 dark:border-neutral-600 flex items-center justify-center hover:bg-neutral-900 hover:text-neutral-50 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 focus:bg-neutral-900 focus:text-neutral-50 dark:focus:bg-neutral-50 dark:focus:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 transition-all"
                >
                  <Youtube className="w-5 h-5 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-50 dark:group-hover:text-neutral-900 group-focus:text-neutral-50 dark:group-focus:text-neutral-900" aria-hidden="true" />
                </Link>
              </motion.div>
            </StaggerContainer>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}