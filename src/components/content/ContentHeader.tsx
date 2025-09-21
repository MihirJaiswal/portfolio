import { motion } from 'motion/react'
import { ViewToggle } from './ViewToggle'
import type { ViewMode } from '../../../types/common'

interface ContentHeaderProps {
  title: string
  totalCount: number
  filteredCount: number
  viewMode?: ViewMode
  onViewModeChange?: (mode: ViewMode) => void
  showViewToggle?: boolean
  subtitle?: string
}

export function ContentHeader({
  title,
  totalCount,
  filteredCount,
  viewMode,
  onViewModeChange,
  showViewToggle = true,
  subtitle
}: ContentHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4">
        <div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r uppercase from-neutral-500 via-black to-neutral-500 dark:from-neutral-400 dark:via-white dark:to-neutral-200 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            {filteredCount} of {totalCount} {subtitle || 'items'}
          </p>
        </div>

        {showViewToggle && viewMode && onViewModeChange && (
          <ViewToggle viewMode={viewMode} onViewModeChange={onViewModeChange} />
        )}
      </div>
    </motion.div>
  )
}