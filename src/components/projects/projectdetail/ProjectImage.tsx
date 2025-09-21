import Image from "next/image"
import { StaticImageData } from "next/image"

interface ProjectImageProps {
  project: {
    title: string
    mainImage?: string | StaticImageData
    image?: string | StaticImageData
  }
}

export function ProjectImage({ project }: ProjectImageProps) {
  return (
    <div
      className="aspect-square md:aspect-[4/3] w-full mb-16 rounded-xs overflow-hidden border border-zinc-200 dark:border-zinc-800"
    >
      <Image
        src={project.mainImage || project.image || "/placeholder.svg"}
        alt={project.title}
        width={500}
        height={500}
        priority
        className="w-full h-full object-cover bg-black"
      />
    </div>
  )
}