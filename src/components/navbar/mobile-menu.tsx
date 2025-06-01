"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

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
            <motion.div 
              className="mt-auto pb-8 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              {/* Decorative line */}
              <motion.div
                className="w-full h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mb-6"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
              
              {/* Animated dots */}
              <div className="flex justify-center space-x-4">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-neutral-400 dark:bg-neutral-600 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}