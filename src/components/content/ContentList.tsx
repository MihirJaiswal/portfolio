import React from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface ContentListProps {
  children: React.ReactNode
  className?: string
}

export function ContentList({ children, className = "" }: ContentListProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="list-view"
        className={`bg-white dark:bg-neutral-950 rounded-md border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}