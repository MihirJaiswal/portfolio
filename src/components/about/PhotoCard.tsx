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
}

function PhotoCard({ photo, cardWidth, cardHeight }: PhotoCardProps) {
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
      <div className="group hover:rotate-1 hover:scale-101 hover:-translate-y-2 duration-300 w-full h-full bg-white p-4 shadow-lg transition-all cursor-pointer relative border-1 border-neutral-300 hover:border-neutral-400">
        
        {/* Photo Area */}
        <div className="w-full bg-gray-100 mb-4 overflow-hidden relative" style={{ height: photoHeight }}>
          <Image
            src={photo.imageUrl}
            alt={photo.title || "Photo"}
            className="w-full h-full object-cover object-top bg-black filter contrast-110 group-hover:scale-105 transition-all duration-500 border border-black"
            fill
            unoptimized
            sizes="(max-width: 768px) 240px, 240px"
            loading="lazy"
            quality={85}
            draggable={false}
          />
        </div>

        {/* Caption Area */}
        <div className="h-12 flex flex-col justify-center group-hover:text-gray-900 transition-colors duration-300">
          <h3 className="font-handwriting text-gray-800 group-hover:text-gray-900 text-sm mb-1 line-clamp-1 leading-tight transition-colors duration-300">{photo.title}</h3>
          <p className="font-handwriting text-gray-600 group-hover:text-gray-700 text-xs transition-colors duration-300">
            {new Date(photo.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "2-digit",
            })}
          </p>
        </div>

        {/* Vintage tape effect with hover animation */}
        <div className={`absolute -top-1 left-24 w-8 h-4 bg-yellow-100 group-hover:bg-yellow-200 rotate-12 group-hover:rotate-6 shadow-sm group-hover:shadow-md opacity-80 group-hover:opacity-100 transition-all duration-300`}></div>
      </div>
    </div>
  )
}

export default PhotoCard