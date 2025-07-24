"use client"
import Image from "next/image"
import { heroContent } from "@/lib/data"
import { ArrowDown, ArrowLeft } from "lucide-react"
import { Button } from "./ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { useGrayscaleStore } from "@/lib/store"

export const HeroSection = () => {
  const containerRef = useRef(null)
  const { isGrayscaleEnabled } = useGrayscaleStore()

  // Scroll-based animations - minimalist values only
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const downloadPDF = () => {
    const link = document.createElement("a")
    link.href = "/mihir-jaiswal-resume.pdf"
    link.download = "/mihir-jaiswal-resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Transform values based on scroll - much more subtle
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -30])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 1])
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -15])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.6])
  const sideElementsY = useTransform(scrollYProgress, [0, 1], [0, -10])
  const sideElementsOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.4])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: -50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const fadeInUpVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen md:min-h-screen bg-white dark:bg-neutral-950 will-change-transform relative overflow-hidden -mt-2"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="absolute hidden lg:dark:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#0c0a09)]"></div>

      {/* MOBILE LAYOUT - Clean & Minimal */}
      <div className="md:hidden min-h-screen flex flex-col">
        {/* Mobile Title - Cleaner positioning */}
        <motion.div className="pt-12 px-6" variants={fadeInUpVariants}>
          <motion.h1
            className="text-center font-[geist] font-black leading-none tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)" }}
            variants={titleVariants}
          >
            <motion.span
              className="bg-gradient-to-r from-neutral-600 via-neutral-900 to-neutral-600 dark:from-neutral-300 dark:via-white dark:to-neutral-300 bg-clip-text text-transparent block"
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{
                duration: 3,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              EXPLORE MY
            </motion.span>
            <motion.span
              className="bg-gradient-to-r from-neutral-600 via-neutral-900 to-neutral-600 dark:from-neutral-200 dark:via-white dark:to-neutral-200 bg-clip-text text-transparent block"
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{
                duration: 3,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 0.5,
              }}
            >
              PORTFOLIO
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Mobile Content - Better spacing and layout */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12 space-y-8">
          {/* Mobile image - Better proportions */}
          <motion.div
            className="relative w-62 h-58 overflow-hidden rounded-3xl"
            variants={imageVariants}
            whileTap={{ scale: 0.98 }}
          >
            <Image
              src="/assets/img5.png"
              alt="Designer profile"
              fill
              quality={100}
              className={`object-cover transition-all duration-300 ${
                isGrayscaleEnabled ? "filter grayscale contrast-110 dark:contrast-105" : ""
              }`}
              priority
            />
          </motion.div>

          {/* Mobile info section - Cleaner typography */}
          <motion.div className="text-center space-y-4" variants={fadeInUpVariants}>
            {/* Role indicator */}
            <motion.div
              className="inline-block"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 tracking-[0.2em] uppercase">
                Designer / Developer
              </span>
            </motion.div>

            {/* Tagline - Better typography */}
            <motion.blockquote
              className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 "
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {heroContent.tagline}
            </motion.blockquote>

            {/* Mobile button - Minimal design */}
            <motion.div variants={buttonVariants}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  onClick={downloadPDF}
                  className="btn"
                >
                  <div className="flex items-center gap-2 justify-center">
                    <span>Download CV</span>
                    <motion.div
                      animate={{ y: [0, 2, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <ArrowDown className="w-4 h-4" />
                    </motion.div>
                  </div>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* DESKTOP LAYOUT - Completely Unchanged */}
      <div className="hidden md:block px-6 relative md:min-h-screen">
        {/* Title - now with improved dark mode colors */}
        <motion.h1
          className="absolute font-[geist] top-8 left-0 right-0 font-black text-center leading-tight md:leading-none mx-auto tracking-wide md:tracking-tight z-0 w-full"
          style={{
            fontSize: "clamp(2.8rem, 12vw, 9rem)",
            maxWidth: "100%",
            y: titleY,
            opacity: titleOpacity,
            scale: titleScale,
          }}
          variants={titleVariants}
        >
          <motion.span
            className="bg-gradient-to-r family-geist from-neutral-500 via-neutral-950 to-neutral-500 dark:from-neutral-400 dark:via-white dark:to-neutral-400 bg-clip-text text-transparent px-2"
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: "100% 50%" }}
            transition={{
              duration: 3,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <span className="hidden xl:inline-flex">CHECK OUT</span>
            <span className="xl:hidden font-black">EXPLORE</span> MY
          </motion.span>
          <br />
          <motion.span
            className="bg-gradient-to-r font-black from-neutral-500 via-neutral-950 to-neutral-500 dark:from-neutral-300 dark:via-white dark:to-neutral-300 bg-clip-text text-transparent"
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: "100% 50%" }}
            transition={{
              duration: 3,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 0.5,
            }}
          >
            PORTFOLIO
          </motion.span>
        </motion.h1>

        {/* Main content container - improved height handling */}
        <div className="flex flex-col lg:flex-row items-center justify-center h-full md:min-h-screen relative">
          {/* Central content */}
          <motion.div
            className="flex flex-col items-center justify-center z-10 sm:pt-40 lg:pt-0"
            variants={fadeInUpVariants}
          >
            {/* Desktop image */}
            <motion.div
              className="relative w-[clamp(300px,40vw,450px)] h-[clamp(350px,45vw,500px)] overflow-hidden rounded-lg lg:mt-58 scale-90"
              variants={imageVariants}
              style={{
                y: imageY,
                opacity: imageOpacity,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/assets/img5.png"
                alt="Designer profile"
                fill
                quality={100}
                className={`object-contain transition-all duration-300 hover:filter hover:grayscale-0 ${
                  isGrayscaleEnabled ? "filter grayscale dark:contrast-105" : ""
                }`}
                priority
                sizes="(max-width: 1024px) 40vw, 450px"
              />
            </motion.div>
          </motion.div>

          {/* Desktop left side - button */}
          <motion.div
            className="md:absolute left-8 bottom-56 z-10"
            style={{
              y: sideElementsY,
              opacity: sideElementsOpacity,
            }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button onClick={downloadPDF} className="btn">
                <div className="flex items-center gap-1 justify-center">
                  <span>Download CV</span>
                  <motion.div
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </motion.div>
                </div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Desktop right side - tagline and skills */}
          <motion.div
            className="md:absolute right-8 bottom-44"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ opacity: 1, x: 0 }}
          >
            <motion.div
              className="flex flex-col items-center justify-center relative"
              whileHover={{ scale: 1.1, borderColor: "#666" }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="md:w-18 md:h-18 w-14 h-14 rounded-full border border-neutral-300 dark:border-neutral-700 items-center justify-center group hover:border-neutral-400 dark:hover:border-neutral-600 transition-all cursor-pointer flex"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <motion.div whileHover={{ x: 2, rotate: -15 }} transition={{ duration: 0.2 }}>
                  <ArrowLeft className="w-6 h-6 md:w-8 md:h-8 transition-transform -rotate-20" />
                </motion.div>
              </motion.div>
              <p className="text-xs text-neutral-700 dark:text-neutral-400 tracking-wide mt-4 font-semibold uppercase">
                Designer/Developer
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
