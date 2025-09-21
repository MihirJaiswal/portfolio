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

// Main component 
export default function LazyWaterRippleEffect() {
  const [shouldLoad, setShouldLoad] = useState(false)
  const observerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoad(true)
    }, 100) 

    return () => clearTimeout(timer)
  }, [])

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
        rootMargin: '100px', 
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
          <WaterRippleEffectDynamic />
        </Suspense>
      ) : (
        <WaterRippleEffectSkeleton />
      )}
    </div>
  )
}