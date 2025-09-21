export function ProjectSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Skeleton UI */}
        <div className="w-40 h-6 bg-zinc-200 dark:bg-zinc-800 rounded mb-12 animate-pulse"></div>

        <div className="w-3/4 h-16 bg-zinc-200 dark:bg-zinc-800 rounded mb-4 animate-pulse"></div>
        <div className="w-1/2 h-8 bg-zinc-200 dark:bg-zinc-800 rounded mb-16 animate-pulse"></div>

        <div className="w-full aspect-video bg-zinc-200 dark:bg-zinc-800 rounded mb-16 animate-pulse"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          <div className="md:col-span-2">
            <div className="w-48 h-8 bg-zinc-200 dark:bg-zinc-800 rounded mb-6 animate-pulse"></div>
            <div className="space-y-4">
              <div className="w-full h-4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
              <div className="w-full h-4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
              <div className="w-3/4 h-4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
            </div>
          </div>

          <div>
            <div className="w-40 h-6 bg-zinc-200 dark:bg-zinc-800 rounded mb-4 animate-pulse"></div>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-full h-4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}