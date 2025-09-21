import { Grid3X3, List } from 'lucide-react'
import { cn } from "@/lib/utils"
import type { ViewMode } from '../../../types/common'

interface ViewToggleProps {
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
}

export function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onViewModeChange("grid")}
        className={cn(
          "p-2 rounded-md transition-colors touch-manipulation",
          viewMode === "grid"
            ? "bg-black text-white dark:bg-white dark:text-black"
            : "bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800",
        )}
        aria-label="Grid view"
      >
        <Grid3X3 className="w-4 h-4" />
      </button>
      <button
        onClick={() => onViewModeChange("list")}
        className={cn(
          "p-2 rounded-md transition-colors touch-manipulation",
          viewMode === "list"
            ? "bg-black text-white dark:bg-white dark:text-black"
            : "bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800",
        )}
        aria-label="List view"
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  )
}