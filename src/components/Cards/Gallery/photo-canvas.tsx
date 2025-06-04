"use client"

import type React from "react"

import { useState, useCallback, useEffect, useRef } from "react"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { GripVertical, ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"

export interface Photo {
  id: string
  title: string
  date: string
  imageUrl: string
  position: { x: number; y: number }
  rotation?: number // Added rotation field
}

interface PhotoCanvasProps {
  photos: Photo[]
  onPositionChange?: (updatedPhotos: Photo[]) => void
  className?: string
  canvasHeight?: number
  canvasWidth?: number
}

interface PhotoCardProps {
  photo: Photo
  onMove: (id: string, position: { x: number; y: number }) => void
  onPhotoClick: (photo: Photo) => void
  canvasWidth: number
  canvasHeight: number
  cardWidth: number
  cardHeight: number
}

interface PhotoPopupProps {
  photo: Photo | null
  isOpen: boolean
  onClose: () => void
}

const ItemType = "PHOTO_CARD"

// Photo Popup Component
function PhotoPopup({ photo, isOpen, onClose }: PhotoPopupProps) {
  if (!isOpen || !photo) return null

  const cardWidth = 320 // Larger for popup
  const cardHeight = 380 // Larger for popup
  const photoHeight = cardHeight - 100 // Space for caption

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] p-4"
      onClick={onClose}
    >
      <div 
        className="relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: cardWidth,
          height: cardHeight,
          transform: `rotate(${photo.rotation ?? 0}deg)`,
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-10 bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg transition-colors duration-200"
          aria-label="Close popup"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Polaroid Frame - identical to PhotoCard but larger and no grayscale */}
        <div className="w-full bg-white pt-4 px-4 shadow-[0px_8px_32px_rgba(17,17,26,0.2),_0px_16px_48px_rgba(17,17,26,0.2),_0px_32px_96px_rgba(17,17,26,0.2)] relative border-1 border-neutral-300">
          {/* Photo Area */}
          <div className="w-full bg-gray-100 mb-8 overflow-hidden relative" style={{ height: photoHeight }}>
            <Image
              src={photo.imageUrl || "/placeholder.svg"}
              alt={photo.title || "Photo"}
              className="w-full h-full object-cover object-top bg-black border border-black" // Removed grayscale filter
              crossOrigin="anonymous"
              fill
              loading="lazy"
              quality={100}
              draggable={false}
            />
          </div>

          {/* Caption Area */}
          <div className="h-16 pb-3 flex flex-col justify-center">
            <h3 className="font-handwriting text-gray-800 text-lg mb-2 line-clamp-2 leading-tight">{photo.title}</h3>
            <p className="font-handwriting text-gray-600 text-base">
              {new Date(photo.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function PhotoCard({ photo, onMove, onPhotoClick, canvasWidth, canvasHeight, cardWidth, cardHeight }: PhotoCardProps) {
  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemType,
    item: { id: photo.id, position: photo.position },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Calculate photo area height (leaving space for caption)
  const photoHeight = cardHeight - 80 // 80px for padding and caption area

  // Use stored rotation or default to 0 if not provided
  const rotation = photo.rotation ?? 0

  const handleMouseDown = (e: React.MouseEvent) => {
    // Prevent drag on mobile to allow click
    if (isMobile) return

    const startX = e.clientX - photo.position.x
    const startY = e.clientY - photo.position.y

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX - startX
      const newY = e.clientY - startY

      // Ensure the card stays within canvas bounds
      const clampedX = Math.max(0, Math.min(canvasWidth - cardWidth, newX))
      const clampedY = Math.max(0, Math.min(canvasHeight - cardHeight, newY))

      onMove(photo.id, { x: clampedX, y: clampedY })
    }

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const handleClick = (e: React.MouseEvent) => {
    // Only handle click on mobile
    if (isMobile) {
      e.preventDefault()
      e.stopPropagation()
      onPhotoClick(photo)
    }
  }

  return (
    <div
      ref={preview as any}
      className={`group absolute ${isMobile ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'}`}
      style={{
        left: photo.position.x,
        top: photo.position.y,
        zIndex: isDragging ? 1000 : 10,
        width: cardWidth,
        height: cardHeight,
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? "scale(1.05) rotate(0deg)" : `rotate(${rotation}deg)`, // Use consistent rotation
        transition: isDragging ? "none" : "transform 0.3s ease",
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      {/* Polaroid Frame */}
      <div className="w-full h-full bg-white p-4 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] hover:shadow-2xl transition-shadow duration-300 relative border-1 border-neutral-300">
        {/* Drag Handle - only show on desktop */}
        {!isMobile && (
          <div
            ref={drag as any}
            className="absolute top-2 right-2 z-10 p-1 bg-black/20 hover:bg-black/40 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-grab active:cursor-grabbing"
          >
            <GripVertical className="w-3 h-3 text-white" />
          </div>
        )}

        {/* Photo Area */}
        <div className="w-full bg-gray-100 mb-4 overflow-hidden relative" style={{ height: photoHeight }}>
          <Image
            src={photo.imageUrl || "/placeholder.svg"}
            alt={photo.title || "Photo"}
            className="w-full h-full object-cover object-top bg-black filter grayscale hover:grayscale-0 transition-all duration-500 border border-black"
            crossOrigin="anonymous"
            fill
            loading="lazy"
            quality={100}
            draggable={false}
          />
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
      </div>
    </div>
  )
}

function CanvasDropZone({
  children,
  canvasWidth,
  canvasHeight,
  cardWidth,
  cardHeight,
  onMove,
}: {
  children: React.ReactNode
  canvasWidth: number
  canvasHeight: number
  cardWidth: number
  cardHeight: number
  onMove: (id: string, position: { x: number; y: number }) => void
}) {
  const canvasRef = useRef<HTMLDivElement>(null)

  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item: { id: string; position: { x: number; y: number } }, monitor) => {
      const offset = monitor.getClientOffset()
      const canvasRect = canvasRef.current?.getBoundingClientRect()

      if (offset && canvasRect) {
        const x = offset.x - canvasRect.left - cardWidth / 2
        const y = offset.y - canvasRect.top - cardHeight / 2

        // Ensure the card stays within canvas bounds
        const clampedX = Math.max(0, Math.min(canvasWidth - cardWidth, x))
        const clampedY = Math.max(0, Math.min(canvasHeight - cardHeight, y))

        onMove(item.id, { x: clampedX, y: clampedY })
      }
    },
  })

  return (
    <div
      ref={(node) => {
        drop(node)
        canvasRef.current = node
      }}
      className="relative overflow-hidden flex items-center justify-center"
      style={{ height: canvasHeight, width: canvasWidth }}
    >
      {children}
    </div>
  )
}

// Updated positioning algorithm for 2x4 grid layout
function generateEvenlyDistributedPositions(
  count: number,
  canvasWidth: number,
  canvasHeight: number,
  cardWidth: number,
  cardHeight: number,
): { x: number; y: number }[] {
  if (count === 0) return []

  const positions: { x: number; y: number }[] = []
  
  // For 8 photos, create a 2x4 grid (2 rows, 4 columns)
  const cols = 4
  const rows = 2
  
  // Calculate spacing
  const horizontalPadding = 40 // Edge padding
  const verticalPadding = 60 // Edge padding
  
  // Calculate spacing between cards
  const availableWidth = canvasWidth - (2 * horizontalPadding)
  const availableHeight = canvasHeight - (2 * verticalPadding)
  
  // Calculate spacing between cards
  const horizontalSpacing = (availableWidth - (cols * cardWidth)) / (cols - 1)
  const verticalSpacing = (availableHeight - (rows * cardHeight)) / (rows - 1)
  
  // Ensure minimum spacing
  const minHorizontalSpacing = 20
  const minVerticalSpacing = 20
  
  // Adjust if spacing is too small
  const actualHorizontalSpacing = Math.max(horizontalSpacing, minHorizontalSpacing)
  const actualVerticalSpacing = Math.max(verticalSpacing, minVerticalSpacing)
  
  let photoIndex = 0
  
  // Generate positions in a clean grid
  for (let row = 0; row < rows && photoIndex < count; row++) {
    for (let col = 0; col < cols && photoIndex < count; col++) {
      const x = horizontalPadding + col * (cardWidth + actualHorizontalSpacing)
      const y = verticalPadding + row * (cardHeight + actualVerticalSpacing)
      
      // Ensure positions stay within canvas bounds
      const clampedX = Math.max(0, Math.min(canvasWidth - cardWidth, x))
      const clampedY = Math.max(0, Math.min(canvasHeight - cardHeight, y))
      
      positions.push({ x: clampedX, y: clampedY })
      photoIndex++
    }
  }

  return positions
}

function PhotoCanvasContent({
  photos,
  onPositionChange,
  className = "",
  canvasHeight = 600,
  canvasWidth = 1200,
}: PhotoCanvasProps) {
  const [items, setItems] = useState<Photo[]>([])
  const [scrollX, setScrollX] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
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

  // Initialize items when photos change
  useEffect(() => {
    if (photos.length > 0) {
      const positions = generateEvenlyDistributedPositions(photos.length, canvasWidth, canvasHeight, cardWidth, cardHeight)
      const newItems = photos.map((photo, index) => ({
        ...photo,
        position: photo.position.x === 0 && photo.position.y === 0 ? positions[index] : photo.position,
        rotation: photo.rotation ?? (Math.random() * 6 - 3) // Generate rotation if not provided
      }))
      setItems(newItems)
    }
  }, [photos.length, photos, canvasWidth, canvasHeight])

  const handleMove = useCallback(
    (id: string, newPosition: { x: number; y: number }) => {
      // Double-check bounds constraints when moving
      const clampedX = Math.max(0, Math.min(canvasWidth - cardWidth, newPosition.x))
      const clampedY = Math.max(0, Math.min(canvasHeight - cardHeight, newPosition.y))
      
      const updatedItems = items.map((item) => 
        item.id === id ? { ...item, position: { x: clampedX, y: clampedY } } : item
      )
      setItems(updatedItems)
      onPositionChange?.(updatedItems)
    },
    [items, onPositionChange, canvasWidth, canvasHeight, cardWidth, cardHeight],
  )

  const handlePhotoClick = useCallback((photo: Photo) => {
    setSelectedPhoto(photo)
    setIsPopupOpen(true)
  }, [])

  const handleClosePopup = useCallback(() => {
    setIsPopupOpen(false)
    setTimeout(() => setSelectedPhoto(null), 200) // Wait for animation to complete
  }, [])

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
        
        @keyframes animate-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-in {
          animation: animate-in 0.2s ease-out;
        }
        
        .zoom-in-95 {
          transform: scale(0.95);
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
        <CanvasDropZone
          canvasWidth={canvasWidth}
          canvasHeight={canvasHeight}
          cardWidth={cardWidth}
          cardHeight={cardHeight}
          onMove={handleMove}
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
              onMove={handleMove}
              onPhotoClick={handlePhotoClick}
              canvasWidth={canvasWidth}
              canvasHeight={canvasHeight}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
            />
          ))}
        </CanvasDropZone>
      </div>

      {/* Photo Popup */}
      <PhotoPopup
        photo={selectedPhoto}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
      />

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

// Demo component with updated sample data including rotations
function PhotoCanvasDemo() {
  const samplePhotos: Photo[] = [
    {
      id: '1',
      title: 'Summer Vacation',
      date: '2024-07-15',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      position: { x: 0, y: 0 },
      rotation: -2.5 // Pre-set rotation to avoid random movement
    },
    {
      id: '2',
      title: 'Mountain Hike',
      date: '2024-06-20',
      imageUrl: 'https://images.unsplash.com/photo-1464822759844-d150baec0494?w=400&h=300&fit=crop',
      position: { x: 0, y: 0 },
      rotation: 1.8
    },
    {
      id: '3',
      title: 'City Lights',
      date: '2024-08-03',
      imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&h=300&fit=crop',
      position: { x: 0, y: 0 },
      rotation: -1.2
    },
    {
      id: '4',
      title: 'Beach Day',
      date: '2024-05-12',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
      position: { x: 0, y: 0 },
      rotation: 2.1
    },
    {
      id: '5',
      title: 'Forest Trail',
      date: '2024-09-08',
      imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      position: { x: 0, y: 0 },
      rotation: -0.8
    },
    {
      id: '6',
      title: 'Sunset View',
      date: '2024-04-25',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      position: { x: 0, y: 0 },
      rotation: 1.5
    },
    {
      id: '7',
      title: 'Coffee Shop',
      date: '2024-03-18',
      imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
      position: { x: 0, y: 0 },
      rotation: -2.0
    },
    {
      id: '8',
      title: 'Winter Snow',
      date: '2024-01-30',
      imageUrl: 'https://images.unsplash.com/photo-1548777123-1d2b90f5e46c?w=400&h=300&fit=crop',
      position: { x: 0, y: 0 },
      rotation: 0.7
    }
  ]

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Photo Canvas with Mobile Popup</h1>
      <p className="text-gray-600 mb-6">
        On desktop: Drag photos around. On mobile: Click photos to open in popup, use scroll buttons to navigate.
      </p>
      <PhotoCanvas 
        photos={samplePhotos}
        canvasWidth={1200}
        canvasHeight={600}
        onPositionChange={(updatedPhotos) => {
          console.log('Photos updated:', updatedPhotos)
        }}
      />
    </div>
  )
}

export default function PhotoCanvas(props: PhotoCanvasProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <PhotoCanvasContent {...props} />
    </DndProvider>
  )
}

// Export demo for testing
export { PhotoCanvasDemo }