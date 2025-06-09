"use client"
import { useGrayscaleStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function GrayscaleToggle() {
  const store = useGrayscaleStore()
  const isGrayscale = store.isGrayscaleEnabled  // Fixed: use correct property name
  const toggleGrayscale = store.toggleGrayscale

  return (
    <Button
      variant={isGrayscale ? "default" : "outline"}
      size="icon"
      className="
        w-8 h-8 border border-neutral-200 dark:border-neutral-700 rounded-full transition-all duration-300 ease-in-out bg-white dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800" 
      onClick={toggleGrayscale}
    >
      <span className="sr-only">
        {isGrayscale ? "Enable colors" : "Disable colors"}
      </span>
      <div className="relative">
        <Image
          src="/assets/colors.png"
          alt="Toggle Colors"
          width={20}
          height={20}
          className={`
            object-cover transition-all duration-300 ease-in-out
            ${isGrayscale 
              ? "grayscale brightness-75 contrast-125" 
              : "hover:scale-110 drop-shadow-sm"
            }
          `}
        />
      </div>
    </Button>
  )
}