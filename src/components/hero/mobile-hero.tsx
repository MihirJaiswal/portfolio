import type React from "react"
import Image from "next/image"
import ResumeDownload from "./ResumeDownload"
import img from '../../../public/assets/hero-image.webp'
export default function MobileHeroSection() {
  return (
    <div>
      <header className="pb-6 pt-8">
                <h1
                  className="text-center font-[geist] font-black leading-none tracking-tight mx-auto"
                  style={{ fontSize: "clamp(3.3rem, 10vw, 12rem)" }}
                  aria-label="Explore my portfolio - Designer and Developer showcase"
                >
                  <span
                    className="bg-gradient-to-r from-neutral-600 via-neutral-900 to-neutral-600 dark:from-neutral-300 dark:via-white dark:to-neutral-300 bg-clip-text text-transparent block"
                    aria-hidden="true"
                  >
                    EXPLORE MY
                  </span>
                  <span
                    className="bg-gradient-to-r from-neutral-600 via-neutral-900 to-neutral-600 dark:from-neutral-200 dark:via-white dark:to-neutral-200 bg-clip-text text-transparent block"
                    aria-hidden="true"
                  >
                    PORTFOLIO
                  </span>
                </h1>
              </header>
      
              {/* Mobile Content - Better spacing and layout */}
              <main className="flex flex-col items-center justify-center px-6 pb-12 space-y-6">
                {/* Mobile image - Better proportions */}
                <div
                  className="relative w-66 h-64 sm:w-78 sm:h-78 overflow-hidden rounded-3xl"
                  role="img"
                  aria-label="Professional portrait of the designer and developer"
                >
                  <Image
                    src={img}
                    alt="Professional portrait showing the designer and developer in a creative workspace"
                    fill
                    quality={100}
                    loading="eager"
                    className='object-cover transition-all duration-300'
                    priority
                    sizes="(max-width: 640px) 264px, 312px"
                  />
                </div>
      
                {/* Mobile info section - Cleaner typography */}
                <div className="text-center space-y-4">
                  {/* Role indicator */}
                  <div className="inline-block">
                    <span 
                      className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 tracking-[0.2em] uppercase"
                      role="text"
                      aria-label="Professional roles: Designer and Developer"
                    >
                      Designer / Developer
                    </span>
                  </div>
      
                  {/* Tagline - Better typography */}
                  <blockquote
                    className="text-md leading-relaxed text-neutral-700 dark:text-neutral-300"
                    role="text"
                    aria-label="Professional tagline"
                  >
                    Crafting standout websites with passion.
                  </blockquote>
      
                  {/* Mobile button - Minimal design */}
                  <div className="flex items-center justify-center gap-3">
                    <ResumeDownload/>
                  </div>
                </div>
              </main>
    </div>
  )
}
