"use client"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import NameTranslation from "./name-translation"

export default function LanguageName() {
  const [animationState, setAnimationState] = useState("initial")

  useEffect(() => {
    // Set up animation cycle with better timing
    const animationCycle = async () => {
      // Initial state
      setAnimationState("initial")
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Border expands
      setAnimationState("borderExpand")
      await new Promise((resolve) => setTimeout(resolve, 1800))

      // M thickens
      setAnimationState("mThicken")
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Hold thickened state briefly
      await new Promise((resolve) => setTimeout(resolve, 800))

      // M thins
      setAnimationState("mThin")
      await new Promise((resolve) => setTimeout(resolve, 1800))

      // Border shrinks
      setAnimationState("borderShrink")
      await new Promise((resolve) => setTimeout(resolve, 1500))
    }

    // Start animation cycle and repeat
    animationCycle()
    const interval = setInterval(animationCycle, 8900) // Adjusted for new timing

    return () => clearInterval(interval)
  }, [])



  return (
    <div className="flex flex-col items-center justify-center w-full h-full lg:h-screen bg-background text-foreground relative border-r-none lg:border-r-2 border-b-2 lg:border-b-0 overflow-hidden pb-8">
    <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      />
      <div className="relative w-96 h-96 flex flex-col items-center justify-center overflow-hidden">
        <div className="h-96 w-full mt-12">
        <NameTranslation/>
        </div>
      </div>

      <div className="mt-8 text-center p-4">
        <p className="text-sm opacity-70 max-w-md">
          Full stack Developer, UI/UX Designer, and a passionate learner.
        </p>
      </div>
    </div>
  )
}