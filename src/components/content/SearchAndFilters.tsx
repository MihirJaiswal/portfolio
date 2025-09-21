import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, Filter } from 'lucide-react'
import { cn } from "@/lib/utils"

interface FilterButton {
  label: string
  value: string
}

interface SortOptionType {
  label: string
  value: string
}

interface SearchAndFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  searchPlaceholder?: string
  sortBy: string
  onSortChange: (sort: string) => void
  sortOptions: SortOptionType[]
  selectedFilter?: string | null
  onFilterChange?: (filter: string | null) => void
  filterButtons?: FilterButton[]
  showFilters: boolean
  onToggleFilters: () => void
  filterLabel?: string
}

export function SearchAndFilters({
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search...",
  sortBy,
  onSortChange,
  sortOptions,
  selectedFilter,
  onFilterChange,
  filterButtons = [],
  showFilters,
  onToggleFilters,
  filterLabel = "ALL"
}: SearchAndFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
      className="mb-12"
    >
      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors text-sm sm:text-base"
          />
        </div>

        <div className="flex gap-2 sm:gap-3">
          {filterButtons.length > 0 && (
            <button
              onClick={onToggleFilters}
              className="flex items-center gap-2 px-3 sm:px-4 py-3 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors touch-manipulation text-sm"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          )}

          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="appearance-none px-3 sm:px-4 py-3 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors text-sm "
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && filterButtons.length > 0 && onFilterChange && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 sm:mb-8 overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 sm:gap-3 p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-md border border-neutral-200 dark:border-neutral-800">
              <motion.button
                onClick={() => onFilterChange(null)}
                className={cn(
                  "px-3 sm:px-4 py-2 rounded-sm text-xs sm:text-sm font-medium transition-all touch-manipulation",
                  selectedFilter === null
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700",
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {filterLabel}
              </motion.button>
              {filterButtons.map((button, index) => (
                <motion.button
                  key={button.value}
                  onClick={() => onFilterChange(selectedFilter === button.value ? null : button.value)}
                  className={cn(
                    "px-3 sm:px-4 py-2 rounded-sm text-xs sm:text-sm font-medium transition-all touch-manipulation",
                    selectedFilter === button.value
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700",
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: (index + 1) * 0.05 }}
                >
                  {button.label.toUpperCase()}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
