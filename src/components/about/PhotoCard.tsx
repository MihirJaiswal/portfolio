// PhotoCard.tsx - Server Component (no "use client" needed)

import type React from "react"
import Image, { type StaticImageData } from "next/image"

export interface Photo {
  id: string
  title: string
  date: string
  imageUrl: string | StaticImageData
  position: { x: number; y: number }
  rotation?: number
}

interface PhotoCardProps {
  photo: Photo
  cardWidth: number
  cardHeight: number
  isGrayscaleEnabled: boolean
}

function PhotoCard({ photo, cardWidth, cardHeight, isGrayscaleEnabled }: PhotoCardProps) {
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
      <div className="w-full h-full bg-white p-4 shadow-lg transition-shadow duration-300 relative border-1 border-neutral-300">
        
        {/* Photo Area */}
        <div className="w-full bg-gray-100 mb-4 overflow-hidden relative" style={{ height: photoHeight }}>
          <Image
            src={photo.imageUrl}
            alt={photo.title || "Photo"}
            className={`w-full h-full object-cover object-top bg-black filter contrast-110 ${
              isGrayscaleEnabled ? "grayscale" : ""
            } hover:grayscale-0 transition-all duration-500 border border-black`}
            fill
            sizes="(max-width: 768px) 240px, 240px"
            loading="lazy"
            quality={85}
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

export default PhotoCard