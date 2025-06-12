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
    title: "Creativity Lead",
    date: "2025-05-07",
    imageUrl: "/photos/citro24.jpg",
    position: { x: 0, y: 0 },
  },
]

export default function Gallery() {
  const [photos] = useState<Photo[]>(samplePhotos)

  return (
    <div>
      <div className="z-20 max-w-7xl mx-auto">
        <PhotoCanvas
          photos={photos}
          className="-mt-4 z-10"
        />
      </div>
    </div>
  )
}