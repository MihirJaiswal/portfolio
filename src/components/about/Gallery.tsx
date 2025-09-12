import PhotoCanvas from "./photo-canvas"
import img from "../../../public/photos/gdsc.webp"
import img2 from "../../../public/photos/student-of-the-year.webp"
import img3 from "../../../public/photos/last-day-of-college.webp"
import img4 from "../../../public/photos/citro-24.webp"
import { Photo } from "./PhotoCard"

const samplePhotos: Photo[] = [
  {
    id: "1",
    title: "GDSC Foster",
    date: "2023-08-22",
    imageUrl: img,
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    title: "Student of the Year",
    date: "2025-05-26",
    imageUrl: img2,
    position: { x: 0, y: 0 },
  },
  {
    id: "3",
    title: "Last Day of college",
    date: "2025-05-08",
    imageUrl: img3,
    position: { x: 0, y: 0 },
  },
  {
    id: "4",
    title: "Creativity Lead",
    date: "2025-05-07",
    imageUrl: img4,
    position: { x: 0, y: 0 },
  },
]

export default function Gallery() {
  const photos = samplePhotos
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