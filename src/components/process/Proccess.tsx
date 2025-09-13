"use client"
import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function ProcessSteps() {
  const words = ["Understand", "Design", "Implement", "Onboard"]
  const containerRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<Array<HTMLDivElement | null>>([])
  
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null)
  
  useEffect(() => {
    if (!containerRef.current) return
    
    const handleScroll = () => {
      const viewportHeight = window.innerHeight
      const viewportMiddle = viewportHeight / 2
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
      
      setActiveWordIndex(smallestDistance < viewportHeight / 3 ? closestToMiddle : null)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  return (
    <div 
      ref={containerRef}
      className="py-20 relative bg-black"
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
                  "text-5xl sm:text-7xl md:text-8xl xl:text-9xl font-extrabold tracking-tight transition-colors duration-500 text-center",
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