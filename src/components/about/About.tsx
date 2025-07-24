"use client"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { MarqueeSkills } from "./marquee-skills"
import Gallery from "../Cards/Gallery/Gallery"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const titleVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
}

const arrowVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0.5,
      ease: "backOut",
    },
  },
  hover: {
    scale: 1.1,
    rotate: 15,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
}

const descriptionVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      delay: 0.3,
      ease: "easeOut",
    },
  },
}

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

export default function About() {
  const handleDescriptionHover = (isHovering: boolean) => {
    // Dispatch custom event for cursor
    const event = new CustomEvent('descriptionHover', {
      detail: { isHovering }
    });
    document.dispatchEvent(event);
  };

  return (
    <motion.section
      id="about"
      className="relative pt-0 sm:pt-12 md:pt-24 pb-0 md:pb-20 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute hidden md:block top-20 left-10 w-72 h-72 bg-gradient-to-r from-neutral-400/10 to-neutral-400/10 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-60 md:bottom-20 right-30 md:right-10 w-96 h-96 bg-gradient-to-r from-neutral-400/10 to-neutral-400/10 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
      </div>

      <div className="px-6 relative z-10">
        {/* Header Section - Original Style */}
        <motion.div className="flex flex-col items-start justify-center md:mb-8" variants={itemVariants}>
          <div className="md:w-1/2 mb-6 md:mb-0 flex items-start gap-4">
            <motion.h2
              className="text-6xl md:text-8xl font-bold mb-6"
              variants={titleVariants}
              whileHover={{
                transition: { duration: 0.3 },
              }}
            >
              <span className="bg-gradient-to-r z-10 from-neutral-500 via-neutral-900 to-neutral-500 dark:from-neutral-300 dark:via-neutral-50 dark:to-neutral-300 bg-clip-text text-transparent font-extrabold relative">
                ABOUT
              </span>
            </motion.h2>

            <motion.div
              className="hidden md:flex md:w-24 md:h-24 w-14 h-14 mt-12 -ml-20 rounded-full border border-neutral-300 dark:border-neutral-700 items-center justify-center group hover:border-neutral-400 dark:hover:border-neutral-600 transition-all cursor-pointer"
              variants={arrowVariants}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <motion.div whileHover={{ x: 2, rotate: -15 }} transition={{ duration: 0.2 }}>
                <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-neutral-700 dark:text-neutral-400 hidden md:flex transition-transform rotate-80" />
              </motion.div>
            </motion.div>

            <motion.div
              className="md:hidden flex md:w-24 md:h-24 w-14 h-14 rounded-full border border-neutral-300 dark:border-neutral-700 items-center justify-center group hover:border-neutral-400 dark:hover:border-neutral-600 transition-all cursor-pointer"
              variants={arrowVariants}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <motion.div whileHover={{ x: -2, rotate: -15 }} transition={{ duration: 0.2 }}>
                <ArrowLeft className="w-6 h-6 md:hidden lg:hidden transition-transform -rotate-80" />
              </motion.div>
            </motion.div>
          </div>

          <motion.div className="md:mt-4 z-10 pb-3 cursor-none select-none" variants={descriptionVariants} 
              onMouseEnter={() => handleDescriptionHover(true)}
              onMouseLeave={() => handleDescriptionHover(false)} >
            <motion.div
              className="text-base md:text-lg text-neutral-700 dark:text-neutral-400 leading-relaxed tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <p className="text-left text-md mb-3">
                <span className="block mb-4">Hey there! I&nbsp;am{" "}
                <span className="text-black dark:text-white tracking-widest font-semibold leading-1.5 text-center">
                  Mihir Jaiswal
                </span>{" "}</span>
                I&apos;m a digital craftsman who turns wild ideas into perfect realities. When I&apos;m not busy debugging at
                3 AM, you&apos;ll find me obsessing over the perfect border-radius and wondering if that button needs to be
                2px to the left.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="py-8 z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Gallery/>
        </motion.div>  

        {/* Skills Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <MarqueeSkills />
        </motion.div>
      </div>
    </motion.section>
  )
}