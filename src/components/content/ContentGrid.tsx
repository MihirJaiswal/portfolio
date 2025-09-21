import { motion, AnimatePresence } from 'motion/react'

interface ContentGridProps {
  children: React.ReactNode
  className?: string
}

export function ContentGrid({ children, className = "" }: ContentGridProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="grid-view"
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}