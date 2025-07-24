"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Twitter} from "lucide-react"
import { motion } from "framer-motion"
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
  
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    onToggle?.(open)
  }

  const itemVariants = {
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

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={handleOpenChange}>
        <SheetTrigger asChild>
          <motion.button
            className="w-10 h-10 flex items-center justify-center relative"
            aria-label="Open menu"
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6" />
            </motion.div>
          </motion.button>
        </SheetTrigger>
        
        <SheetContent 
          side="right" 
          className="w-full sm:w-[400px] bg-white dark:bg-neutral-950 border-l border-neutral-200 dark:border-neutral-800"
        >
          <SheetHeader className="text-center mb-8">
            <SheetTitle className="text-2xl font-bold">Menu</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col h-full">
            <nav className="flex-1">
              <motion.div 
                className="space-y-6 flex flex-col items-center"
                initial="hidden"
                animate="visible"
              >
                {links.map((link, index) => (
                  <motion.div
                    key={link.href}
                    custom={index}
                    variants={itemVariants}
                    whileHover={{ 
                      x: 10,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                    className="w-full max-w-xs"
                  >
                    <SheetClose asChild>
                      <Link
                        href={link.href}
                        className="block text-xl font-medium py-3 px-4 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 relative overflow-hidden group text-center w-full"
                      >
                        <span className="relative z-10">{link.label}</span>
                        
                        {/* Animated background */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 opacity-0 group-hover:opacity-100"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        {/* Border accent */}
                        <motion.div
                          className="absolute left-0 top-0 w-1 h-full bg-neutral-900 dark:bg-neutral-100"
                          initial={{ scaleY: 0 }}
                          whileHover={{ scaleY: 1 }}
                          transition={{ duration: 0.2 }}
                          style={{ originY: 0 }}
                        />
                      </Link>
                    </SheetClose>
                  </motion.div>
                ))}
              </motion.div>
            </nav>

            {/* Footer section with decorative elements */}
           <StaggerContainer>
             <motion.div
              className="flex justify-center items-center space-x-8 py-8 border-t"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href={siteConfig.social.twitter}
                aria-label="Instagram"
                className="group w-12 h-12 rounded-full border border-neutral-400 dark:border-neutral-600 flex items-center justify-center hover:bg-neutral-900 hover:text-neutral-50 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 transition-all"
              >
                <Twitter className="w-5 h-5 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-50 dark:group-hover:text-neutral-900" />
              </Link>
              <Link
                href={siteConfig.social.github}
                aria-label="GitHub"
                className="group w-12 h-12 rounded-full border border-neutral-400 dark:border-neutral-600 flex items-center justify-center hover:bg-neutral-900 hover:text-neutral-50 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 transition-all"
              >
                <Github className="w-5 h-5 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-50 dark:group-hover:text-neutral-900" />
              </Link>
              <Link
                href={siteConfig.social.linkedin}
                aria-label="LinkedIn"
                className="group w-12 h-12 rounded-full border border-neutral-400 dark:border-neutral-600 flex items-center justify-center hover:bg-neutral-900 hover:text-neutral-50 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 transition-all"
              >
                <Linkedin className="w-5 h-5 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-50 dark:group-hover:text-neutral-900" />
              </Link>
               <Link
                href={siteConfig.social.youtube}
                aria-label="LinkedIn"
                className="group w-12 h-12 rounded-full border border-neutral-400 dark:border-neutral-600 flex items-center justify-center hover:bg-neutral-900 hover:text-neutral-50 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 transition-all"
              >
                <Youtube className="w-5 h-5 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-50 dark:group-hover:text-neutral-900" />
              </Link>
            </motion.div>
           </StaggerContainer>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}