"use client"

import { useState } from "react"
import PhotoCanvas, { type Photo } from "./photo-canvas"

const samplePhotos: Photo[] = [
  {
    id: "1",
    title: "Mountain Sunrise",
    date: "2024-01-15",
    imageUrl: "/img1.png",
    position: { x: 0, y: 0 }, // Will be distributed
  },
  {
    id: "2",
    title: "Student of the Year",
    date: "2025-05-26",
    imageUrl: "/soty.jpg",
    position: { x: 0, y: 0 },
  },
  {
    id: "3",
    title: "Last Day of the Year",
    date: "2025-05-08",
    imageUrl: "/last.jpg",
    position: { x: 0, y: 0 },
  },
  {
    id: "4",
    title: "City Skyline at Night",
    date: "2024-02-12",
    imageUrl: "/placeholder.svg?height=300&width=400",
    position: { x: 0, y: 0 },
  },
  {
    id: "5",
    title: "Desert Landscape",
    date: "2024-02-18",
    imageUrl: "/placeholder.svg?height=300&width=400",
    position: { x: 0, y: 0 },
  },
  {
    id: "6",
    title: "Snowy Mountain Peak",
    date: "2024-02-25",
    imageUrl: "/placeholder.svg?height=300&width=400",
    position: { x: 0, y: 0 },
  },
  {
    id: "7",
    title: "Desert Landscape",
    date: "2024-02-18",
    imageUrl: "/placeholder.svg?height=300&width=400",
    position: { x: 0, y: 0 },
  },
  {
    id: "8",
    title: "Snowy Mountain Peak",
    date: "2024-02-25",
    imageUrl: "/placeholder.svg?height=300&width=400",
    position: { x: 0, y: 0 },
  },
]

export default function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>(samplePhotos)

  const handlePositionChange = (updatedPhotos: Photo[]) => {
    setPhotos(updatedPhotos)
    console.log(
      "Photo positions updated:",
      updatedPhotos.map((p) => ({
        title: p.title,
        position: p.position,
      })),
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <PhotoCanvas
          photos={photos}
          onPositionChange={handlePositionChange}
          canvasHeight={700}
          canvasWidth={1200}
          className="-mt-4"
        />
      </div>
    </div>
  )
}
