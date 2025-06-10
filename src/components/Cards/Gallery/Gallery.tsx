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