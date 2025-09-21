"use client"
import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import PhotoCard, { type Photo } from "./PhotoCard"
import { generateEvenlyDistributedPositions } from "@/lib/utils"

interface PhotoCanvasProps {
  photos: Photo[]
  className?: string
  canvasHeight?: number
  canvasWidth?: number
}

function PhotoCanvas({
  photos,
  className = "",
  canvasHeight = 320,
  canvasWidth = 1200,
}: PhotoCanvasProps) {
  const [scrollX, setScrollX] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardWidth = 240
  const cardHeight = 280

  // Check if we're on mobile and track window width
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth
      const mobile = width < 1200
      setIsMobile(mobile)
      setWindowWidth(width)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Generate positions and prepare photos with rotation - do this immediately, no useEffect needed
  const processedPhotos = photos.slice(0, 4).map((photo, index) => {
    const positions = generateEvenlyDistributedPositions(Math.min(photos.length, 4), canvasWidth, canvasHeight, cardWidth, cardHeight)
    
    return {
      ...photo,
      // Use provided position if it's not (0,0), otherwise use calculated position
      position: photo.position.x === 0 && photo.position.y === 0 ? positions[index] : photo.position,
      // Use provided rotation, or generate a slight random rotation if not provided
      rotation: photo.rotation ?? (Math.random() * 6 - 3)
    }
  })

  // Handle horizontal scrolling
  const handleScroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return
    
    const scrollAmount = 300
    const container = containerRef.current
    const maxScroll = canvasWidth - container.clientWidth
    
    if (direction === 'left') {
      const newScrollX = Math.max(0, scrollX - scrollAmount)
      setScrollX(newScrollX)
      container.scrollTo({ left: newScrollX, behavior: 'smooth' })
    } else {
      const newScrollX = Math.min(maxScroll, scrollX + scrollAmount)
      setScrollX(newScrollX)
      container.scrollTo({ left: newScrollX, behavior: 'smooth' })
    }
  }

  const handleScrollUpdate = () => {
    if (containerRef.current) {
      setScrollX(containerRef.current.scrollLeft)
    }
  }

  const containerWidth = isMobile && windowWidth > 0 ? Math.min(windowWidth - 32, canvasWidth) : canvasWidth
  const showScrollButtons = isMobile && canvasWidth > containerWidth

  return (
    <div className={`w-full ${className} relative`}>
      {/* Mobile scroll buttons */}
      {showScrollButtons && (
        <>
          {/* Left scroll button */}
          <button
            onClick={() => handleScroll('left')}
            disabled={scrollX <= 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed rounded-full p-3 transition-all duration-200 border border-gray-200"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          {/* Right scroll button */}
          <button
            onClick={() => handleScroll('right')}
            disabled={scrollX >= canvasWidth - containerWidth}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-50 bg-white/90 hover:bg-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed rounded-full p-3 transition-all duration-200 border border-gray-200"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </>
      )}

      {/* Scrollable container */}
      <div
        ref={containerRef}
        className="overflow-x-auto scrollbar-hide"
        style={{ width: containerWidth }}
        onScroll={handleScrollUpdate}
      >
        <div
          className="relative overflow-hidden flex items-center justify-center"
          style={{ height: canvasHeight, width: canvasWidth }}
        >
          {/* Vintage paper texture */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 206, 84, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)
              `,
            }}
          />

          {/* Subtle texture overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(45deg, rgba(0,0,0,0.05) 1px, transparent 1px),
                linear-gradient(-45deg, rgba(0,0,0,0.05) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />

          {processedPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PhotoCanvas