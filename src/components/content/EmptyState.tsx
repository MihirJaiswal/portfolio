import { motion, AnimatePresence } from 'motion/react'
import { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
}

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="no-results"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center py-12 sm:py-16"
      >
        <Icon className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-neutral-400" />
        <h3 className="text-lg sm:text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 px-4">
          {description}
        </p>
      </motion.div>
    </AnimatePresence>
  )
}