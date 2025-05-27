"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function NameTranslation() {
  // Translations of "MIHIR" in different languages
  const translations = [
    { text: "MIHIR", language: "English" },
    { text: "मिहिर", language: "Hindi" },
    { text: "ミヒル", language: "Japanese" },
    { text: "ميهير", language: "Arabic" },
    { text: "米希尔", language: "Chinese" },
    { text: "미히르", language: "Korean" },
    { text: "Михир", language: "Russian" },
    { text: "มิฮิร", language: "Thai" },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Timer to change the word every 3 seconds
    const interval = setInterval(() => {
      setIsVisible(false)

      // Wait for exit animation to complete before changing the word
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % translations.length)
        setIsVisible(true)
      }, 500) // Half of the transition time
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[50vh] p-8">
      <div className="relative h-32 sm:h-40 md:h-48 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
              exit={{
                opacity: 0,
                y: -20,
                transition: {
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
              className="absolute"
            >
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tighter">
                {translations[currentIndex].text}
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
