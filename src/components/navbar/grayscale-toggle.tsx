"use client"
import { useGrayscaleStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function GrayscaleToggle() {
  const { toggleGrayscale } = useGrayscaleStore()

  return (
    <Button
      variant="outline"
      size="icon"
      className="w-6 h-6 rounded-full mt-2"
      onClick={toggleGrayscale}
    >
      <span className="sr-only">Toggle grayscale</span>
      <Image
        src="/assets/colors.png"
        alt="Toggle Colors"
        width={24}
        height={24}
        className="object-cover h-6 w-6 transition-transform duration-300 ease-in-out transform hover:scale-110"
      />
    </Button>
  )
}