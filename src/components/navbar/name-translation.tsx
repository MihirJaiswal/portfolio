"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"

function NameTranslation() {
  const translations = [
    { mihir: "MIHIR", jaiswal: "JAISWAL", language: "English" },
    { mihir: "मिहिर", jaiswal: "जायसवाल", language: "Hindi" },
    { jaiswal: "جيسوال", mihir: "ميهير", language: "Arabic" },
    { mihir: "米希尔", jaiswal: "贾斯瓦尔", language: "Chinese (Simplified)" },
    { mihir: "미히르", jaiswal: "자이수왈", language: "Korean" },
    { mihir: "মিহির", jaiswal: "জায়সওয়াল", language: "Bengali" },
  ]


  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % translations.length)
        setIsVisible(true)
      }, 500)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center">
      <div className="relative h-8 flex items-center justify-center min-w-[160px]">
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
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
                y: -10,
                transition: {
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                },
              }}
              className="absolute flex space-x-2"
            >
              <Link href="/" className="flex gap-1.5" >
                <h1 className="text-xl font-bold tracking-tight">
                  {translations[currentIndex].mihir}
                </h1>
                <h1 className="text-xl font-bold tracking-tight">
                  {translations[currentIndex].jaiswal}
                </h1>
              </Link>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default NameTranslation