"use client"

import { useState } from "react"
import PhotoCanvas, { type Photo } from "./photo-canvas"

const samplePhotos: Photo[] = [
  {
    id: "1",
    title: "GDSC Foster",
    date: "2023-08-22",
    imageUrl: "/photos/gdsc.jpg",
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    title: "Student of the Year",
    date: "2025-05-26",
    imageUrl: "/photos/soty.jpg",
    position: { x: 0, y: 0 },
  },
  {
    id: "3",
    title: "Last Day of college",
    date: "2025-05-08",
    imageUrl: "/photos/last.jpg",
    position: { x: 0, y: 0 },
  },
  {
    id: "4",
    title: "AD 21-25",
    date: "2025-05-07",
    imageUrl: "/photos/classPhoto.jpg",
    position: { x: 0, y: 0 },
  },
  {
    id: "5",
    title: "Creativity Lead 2024",
    date: "2024-02-16",
    imageUrl: "/photos/citro24.jpg",
    position: { x: 0, y: 0 },
  },
  {
    id: "6",
    title: "Creativity Lead 2023",
    date: "2023-03-21",
    imageUrl: "/photos/citro23.jpeg",
    position: { x: 0, y: 0 },
  },
  {
    id: "7",
    title: "I am also a good chef",
    date: "2024-07-27",
    imageUrl: "/photos/pasta.png",
    position: { x: 0, y: 0 },
  },
  {
    id: "8",
    title: "Launched Nuvyx UI",
    date: "2025-04-14",
    imageUrl: "/projects/nuvyx.webp",
    position: { x: 0, y: 0 },
  },
]

export default function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>(samplePhotos)

  const handlePositionChange = (updatedPhotos: Photo[]) => {
    setPhotos(updatedPhotos)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Memory Lane
          </h2>
          <p className="mt-3 text-lg text-gray-500">
            A collection of special moments and achievements
          </p>
        </div>
        <PhotoCanvas
          photos={photos}
          onPositionChange={handlePositionChange}
          canvasHeight={800}
          canvasWidth={1200}
          className="rounded-2xl shadow-2xl bg-white/50 backdrop-blur-sm border border-gray-100"
        />
      </div>
    </div>
  )
}
