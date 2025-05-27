"use client"

import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react"

type ScrollContextType = {
  scrollY: number
  scrollYProgress: number
  isScrolling: boolean
  scrollDirection: "up" | "down" | null
  scrollVelocity: number
}

const ScrollContext = createContext<ScrollContextType>({
  scrollY: 0,
  scrollYProgress: 0,
  isScrolling: false,
  scrollDirection: null,
  scrollVelocity: 0,
})

export const useScrollContext = () => useContext(ScrollContext)

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [scrollPos, setScrollPos] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null)
  const [scrollVelocity, setScrollVelocity] = useState(0)

  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)
  const lastScrollY = useRef(0)
  const lastScrollTime = useRef(Date.now())
  const velocityArray = useRef<number[]>([])
  const rafId = useRef<number | null>(null)

  // Super optimized scroll handler with velocity tracking
  useEffect(() => {
    // Skip if window is not available (SSR)
    if (typeof window === "undefined") return

    let ticking = false

    const updateScrollValues = (currentScrollY: number) => {
      // Calculate scroll position and progress
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll <= 0 ? 0 : currentScrollY / maxScroll

      // Calculate direction
      const direction = currentScrollY > lastScrollY.current ? "down" : "up"

      // Calculate velocity
      const now = Date.now()
      const dt = now - lastScrollTime.current
      const distance = Math.abs(currentScrollY - lastScrollY.current)
      const instantVelocity = dt > 0 ? distance / dt : 0

      // Store velocity in array for smoothing
      velocityArray.current.push(instantVelocity)
      if (velocityArray.current.length > 5) {
        velocityArray.current.shift()
      }

      // Calculate smoothed velocity
      const avgVelocity = velocityArray.current.reduce((sum, v) => sum + v, 0) / velocityArray.current.length

      // Update state
      setScrollPos(currentScrollY)
      setScrollProgress(progress)
      setIsScrolling(true)
      setScrollDirection(direction)
      setScrollVelocity(avgVelocity * 100) // Scale for easier use

      // Update refs
      lastScrollY.current = currentScrollY
      lastScrollTime.current = now

      // Reset scrolling state after delay
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }

      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false)
        velocityArray.current = []
      }, 150)
    }

    const handleScroll = () => {
      if (!ticking) {
        rafId.current = requestAnimationFrame(() => {
          updateScrollValues(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }

    // Initialize values
    updateScrollValues(window.scrollY)

    // Add event listener with passive flag for performance
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <ScrollContext.Provider
      value={{
        scrollY: scrollPos,
        scrollYProgress: scrollProgress,
        isScrolling,
        scrollDirection,
        scrollVelocity,
      }}
    >
      {children}
    </ScrollContext.Provider>
  )
}
