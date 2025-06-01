"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function ProcessSteps() {
  // Define the process steps words
  const words = ["Understand", "Design", "Implement", "Onboard"]
  
  // Create refs for each word
  const containerRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<Array<HTMLDivElement | null>>([])
  
  // Track which word is active
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null)
  
  // Check scroll position and update active word
  useEffect(() => {
    if (!containerRef.current) return
    
    const handleScroll = () => {
      // Get viewport height for calculations
      const viewportHeight = window.innerHeight
      const viewportMiddle = viewportHeight / 2
      
      // Find which word is closest to the middle of the viewport
      let closestToMiddle = -1
      let smallestDistance = Infinity
      
      wordRefs.current.forEach((word, index) => {
        if (!word) return
        
        const rect = word.getBoundingClientRect()
        const wordMiddle = rect.top + rect.height / 2
        const distanceToMiddle = Math.abs(wordMiddle - viewportMiddle)
        
        if (distanceToMiddle < smallestDistance) {
          smallestDistance = distanceToMiddle
          closestToMiddle = index
        }
      })
      
      // If the closest word is within a reasonable threshold of the middle
      setActiveWordIndex(smallestDistance < viewportHeight / 3 ? closestToMiddle : null)
    }
    
    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call once to set initial state
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  return (
    <div 
      ref={containerRef}
      className="pb-24 pt-32 relative bg-black"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-20">
          {words.map((word, index) => (
            <div
              key={index}
              ref={(el) => {
                wordRefs.current[index] = el;
              }}
              className="flex justify-center items-center"
            >
              <h2 
                className={cn(
                  "text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight transition-colors duration-500 text-center",
                  activeWordIndex === index ? "text-white" : "text-neutral-700"
                )}
              >
                {word}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}