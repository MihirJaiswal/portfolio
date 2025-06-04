'use client'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import React from 'react'
import { stats, siteConfig } from "@/lib/data"
import { motion } from 'framer-motion'
import { MarqueeSkills } from './marquee-skills'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const titleVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
}

const arrowVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0.5,
      ease: "backOut"
    }
  },
  hover: {
    scale: 1.1,
    rotate: 15,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
}

const descriptionVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      delay: 0.3,
      ease: "easeOut"
    }
  }
}

const statsContainerVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1
    }
  }
}

const statItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export default function About() {
  return (
    <motion.section 
      id="about" 
      className="bg-white dark:bg-neutral-950 relative mt-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="px-6">
        <motion.div 
          className="flex flex-col md:flex-row items-start justify-center mb-20"
          variants={itemVariants}
        >
          <div className="md:w-1/2 mb-6 md:mb-0 flex items-start gap-4"> 
            <motion.h2 
              className="text-6xl md:text-8xl font-bold mb-6"
              variants={titleVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <span className="bg-gradient-to-r from-neutral-500 via-black to-neutral-500 dark:from-neutral-300 dark:via-neutral-50 dark:to-neutral-300 bg-clip-text text-transparent">
                ABOUT
              </span>
            </motion.h2>
            
            <motion.div
              className="hidden md:flex md:w-24 md:h-24 w-14 h-14 mt-12 -ml-16 rounded-full border border-neutral-300 dark:border-neutral-700 items-center justify-center group hover:border-neutral-400 dark:hover:border-neutral-600 transition-all cursor-pointer"
              variants={arrowVariants}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                whileHover={{ x: 2, rotate: -15 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="w-6 h-6 md:w-8 md:h-8 hidden md:flex transition-transform -rotate-30" />
              </motion.div>
            </motion.div>
            
            <motion.div
              className="md:hidden flex md:w-24 md:h-24 w-14 h-14 rounded-full border border-neutral-300 dark:border-neutral-700 items-center justify-center group hover:border-neutral-400 dark:hover:border-neutral-600 transition-all cursor-pointer"
              variants={arrowVariants}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                whileHover={{ x: -2, rotate: -15 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowLeft className="w-6 h-6 md:hidden lg:hidden transition-transform -rotate-30" />
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div 
            className="md:w-1/2 md:mt-4"
            variants={descriptionVariants}
          >
            <motion.p 
              className="text-sm leading-relaxed tracking-wide uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {siteConfig.authorDescription}
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div variants={statsContainerVariants}>
          <motion.div
            className="flex flex-col md:flex-row border border-neutral-200 dark:border-neutral-800 overflow-hidden"
            whileHover={{ 
              y: -8, 
              boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
              scale: 1.02
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className={`flex-1 p-6 md:p-14 ${
                  index !== stats.length - 1 &&
                  "md:border-r border-b md:border-b-0 border-neutral-200 dark:border-neutral-800"
                }`}
                variants={statItemVariants}
                whileHover={{ 
                  backgroundColor: "rgba(0,0,0,0.02)",
                  scale: 1.05,
                  y: -5
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.h3
                  className="text-3xl md:text-4xl font-bold mb-1 bg-gradient-to-r from-neutral-500 via-black to-neutral-500 dark:from-neutral-300 dark:via-neutral-50 dark:to-neutral-300 bg-clip-text text-transparent"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.8 + 0.1 * index,
                    ease: "backOut"
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.value}
                </motion.h3>
                <motion.p
                  className="text-xs uppercase tracking-wider"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 1 + 0.1 * index 
                  }}
                >
                  {stat.label}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <MarqueeSkills/>
        </motion.div>
      </div>
    </motion.section>
  )
}