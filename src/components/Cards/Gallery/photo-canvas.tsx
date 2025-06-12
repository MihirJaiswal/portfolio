"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useGrayscaleStore } from "@/lib/store"

export interface Photo {
  id: string
  title: string
  date: string
  imageUrl: string
  position: { x: number; y: number }
  rotation?: number
}

interface PhotoCanvasProps {
  photos: Photo[]
  className?: string
  canvasHeight?: number
  canvasWidth?: number
}

interface PhotoCardProps {
  photo: Photo
  cardWidth: number
  cardHeight: number
}

function PhotoCard({ photo, cardWidth, cardHeight }: PhotoCardProps) {
  const { isGrayscaleEnabled } = useGrayscaleStore()
  
  // Calculate photo area height (leaving space for caption)
  const photoHeight = cardHeight - 80 // 80px for padding and caption area
  
  // Use stored rotation or default to 0 if not provided
  const rotation = photo.rotation ?? 0

  return (
    <div
      className="absolute"
      style={{
        left: photo.position.x,
        top: photo.position.y,
        width: cardWidth,
        height: cardHeight,
        transform: `rotate(${rotation}deg)`,
        transition: "transform 0.3s ease",
      }}
    >
      {/* Polaroid Frame */}
      <div className="w-full h-full bg-white p-4 shadow-md transition-shadow duration-300 relative border-1 border-neutral-300">
        
        {/* Photo Area */}
        <div className="w-full bg-gray-100 mb-4 overflow-hidden relative" style={{ height: photoHeight }}>
          <Image
            src={photo.imageUrl || "/placeholder.svg"}
            alt={photo.title || "Photo"}
            className={`w-full h-full object-cover object-top bg-black filter contrast-110 ${
              isGrayscaleEnabled ? "grayscale" : ""
            } hover:grayscale-0 transition-all duration-500 border border-black`}
            crossOrigin="anonymous"
            fill
            loading="lazy"
            quality={100}
            draggable={false}
          />
          {/* Subtle vintage overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-yellow-50/20 pointer-events-none"></div>
        </div>

        {/* Caption Area */}
        <div className="h-12 flex flex-col justify-center">
          <h3 className="font-handwriting text-gray-800 text-sm mb-1 line-clamp-1 leading-tight">{photo.title}</h3>
          <p className="font-handwriting text-gray-600 text-xs">
            {new Date(photo.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "2-digit",
            })}
          </p>
        </div>

        {/* Vintage tape effect */}
        <div className={`absolute -top-1 left-24 w-8 h-4 ${isGrayscaleEnabled ? "bg-neutral-300" : "bg-yellow-100"} rotate-12 shadow-sm opacity-80`}></div>
      </div>
    </div>
  )
}

// Updated positioning algorithm for single row layout (4 images)
function generateEvenlyDistributedPositions(
  count: number,
  canvasWidth: number,
  canvasHeight: number,
  cardWidth: number,
  cardHeight: number,
): { x: number; y: number }[] {
  if (count === 0) return []

  const positions: { x: number; y: number }[] = []
  
  // For 4 photos or less, create a single row layout
  const cols = Math.min(count, 4) // Maximum 4 columns
  
  // Calculate spacing
  const horizontalPadding = 20 // Reduced edge padding
  const verticalPadding = 20 // Small top padding
  
  // Calculate spacing between cards
  const availableWidth = canvasWidth - (2 * horizontalPadding)
  
  // Calculate spacing between cards
  const horizontalSpacing = cols > 1 ? (availableWidth - (cols * cardWidth)) / (cols - 1) : 0
  
  // Ensure minimum spacing
  const minHorizontalSpacing = 20
  
  // Adjust if spacing is too small
  const actualHorizontalSpacing = Math.max(horizontalSpacing, minHorizontalSpacing)
  
  // Generate positions in a single row
  for (let col = 0; col < cols; col++) {
    const x = horizontalPadding + col * (cardWidth + actualHorizontalSpacing)
    const y = verticalPadding
    
    // Ensure positions stay within canvas bounds
    const clampedX = Math.max(0, Math.min(canvasWidth - cardWidth, x))
    const clampedY = Math.max(0, Math.min(canvasHeight - cardHeight, y))
    
    positions.push({ x: clampedX, y: clampedY })
  }

  return positions
}

function PhotoCanvas({
  photos,
  className = "",
  canvasHeight = 320, // Reduced height for single row
  canvasWidth = 1200,
}: PhotoCanvasProps) {
  const [items, setItems] = useState<Photo[]>([])
  const [scrollX, setScrollX] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardWidth = 240 // Fixed card width
  const cardHeight = 280 // Fixed card height

  // Check if we're on mobile and track window width
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth
      const mobile = width < 768
      setIsMobile(mobile)
      setWindowWidth(width)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Initialize items when photos change - limit to first 4 photos
  useEffect(() => {
    if (photos.length > 0) {
      // Take only the first 4 photos
      const limitedPhotos = photos.slice(0, 4)
      const positions = generateEvenlyDistributedPositions(limitedPhotos.length, canvasWidth, canvasHeight, cardWidth, cardHeight)
      const newItems = limitedPhotos.map((photo, index) => ({
        ...photo,
        position: photo.position.x === 0 && photo.position.y === 0 ? positions[index] : photo.position,
        rotation: photo.rotation ?? (Math.random() * 6 - 3) // Generate rotation if not provided
      }))
      setItems(newItems)
    }
  }, [photos.length, photos, canvasWidth, canvasHeight])

  // Handle horizontal scrolling
  const handleScroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return
    
    const scrollAmount = 300 // pixels to scroll
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

  // Update scroll position when user scrolls manually
  const handleScrollUpdate = () => {
    if (containerRef.current) {
      setScrollX(containerRef.current.scrollLeft)
    }
  }

  if (items.length === 0) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-50 rounded-lg border-2 border-gray-200 ${className}`}
        style={{ 
          height: canvasHeight, 
          width: windowWidth > 0 ? Math.min(canvasWidth, windowWidth - 32) : canvasWidth 
        }}
      >
        <p className="text-gray-500 text-lg">No photos to display</p>
      </div>
    )
  }

  const containerWidth = isMobile && windowWidth > 0 ? Math.min(windowWidth - 32, canvasWidth) : canvasWidth
  const showScrollButtons = isMobile && canvasWidth > containerWidth

  return (
    <div className={`w-full ${className} relative`}>
      {/* Add custom font for handwriting effect */}
      <style jsx global>{`
        .font-handwriting {
          font-family: 'Kalam', 'Comic Sans MS', cursive;
        }
      `}</style>

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

          {items.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
            />
          ))}
        </div>
      </div>

      {/* Hide scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

export default PhotoCanvas