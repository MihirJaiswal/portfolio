"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface MobileMenuProps {
  links: {
    href: string
    label: string
  }[]
}

export function MobileMenu({ links }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isOpen && !target.closest("[data-mobile-menu]")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Animation variants
  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        when: "afterChildren"
      }
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    closed: {
      x: 50,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  }


  const topLineVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 6 }
  }

  const middleLineVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 }
  }

  const bottomLineVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -6 }
  }

  return (
    <div data-mobile-menu className="lg:hidden">
      {/* Hamburger Button */}
      <motion.button
        className="w-10 h-10 flex items-center justify-center z-50 relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <motion.div
            initial={{ rotate: 0, scale: 0 }}
            animate={{ rotate: 180, scale: 1 }}
            exit={{ rotate: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <X className="w-6 h-6" />
          </motion.div>
        ) : (
          <div className="flex flex-col space-y-1.5">
            <motion.span
              className="w-5 h-0.5 bg-black dark:bg-white origin-center"
              variants={topLineVariants}
              animate={isOpen ? "open" : "closed"}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-5 h-0.5 bg-black dark:bg-white"
              variants={middleLineVariants}
              animate={isOpen ? "open" : "closed"}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-5 h-0.5 bg-black dark:bg-white origin-center"
              variants={bottomLineVariants}
              animate={isOpen ? "open" : "closed"}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white dark:bg-neutral-950 z-40"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Background blur effect */}
            <motion.div
              className="absolute inset-0 backdrop-blur-sm bg-white/80 dark:bg-neutral-950/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            
            <div className="flex flex-col items-center justify-center h-full relative z-10">
              <motion.nav 
                className="flex flex-col items-center space-y-8"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 }
                  }
                }}
              >
                {links.map((link, index) => (
                  <motion.div
                    key={link.href}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={link.href}
                      className="text-xl font-medium hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors relative overflow-hidden"
                      onClick={() => setIsOpen(false)}
                    >
                      <motion.span
                        className="block"
                        initial={{ y: 50 }}
                        animate={{ y: 0 }}
                        transition={{ 
                          delay: index * 0.1 + 0.3,
                          type: "spring",
                          stiffness: 300,
                          damping: 30
                        }}
                      >
                        {link.label}
                      </motion.span>
                      
                      {/* Hover underline effect */}
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-neutral-600 dark:bg-neutral-400"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{ originX: 0 }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              {/* Decorative animated elements */}
              <motion.div
                className="absolute top-20 left-10 w-2 h-2 bg-neutral-300 dark:bg-neutral-700 rounded-full"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div
                className="absolute bottom-32 right-16 w-3 h-3 bg-neutral-300 dark:bg-neutral-700 rounded-full"
                animate={{
                  x: [0, 15, 0],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}