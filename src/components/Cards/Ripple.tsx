"use client"
import { useRef, useEffect, useState, Suspense } from "react"
import dynamic from 'next/dynamic'

const WaterRippleEffectDynamic = dynamic(() => import('../ui/water-ripple-effect'), {
  ssr: false, 
  loading: () => <WaterRippleEffectSkeleton />
})

// Simple skeleton/loading component
function WaterRippleEffectSkeleton() {
  return (
    <div>
    </div>
  )
}

// Main component that handles lazy loading
export default function LazyWaterRippleEffect() {
  const [shouldLoad, setShouldLoad] = useState(false)
  const observerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Option 1: Load after page load
    const timer = setTimeout(() => {
      setShouldLoad(true)
    }, 100) // Small delay after page load

    return () => clearTimeout(timer)
  }, [])

  // Option 2: Load when component comes into viewport (Intersection Observer)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '100px', // Start loading 100px before it's visible
        threshold: 0.1
      }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={observerRef}>
      {shouldLoad ? (
        <Suspense fallback={<WaterRippleEffectSkeleton />}>
          {/* Use either the lazy loaded component or dynamic import */}
          <WaterRippleEffectDynamic />
        </Suspense>
      ) : (
        <WaterRippleEffectSkeleton />
      )}
    </div>
  )
}