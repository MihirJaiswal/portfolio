import { ArrowLeft, ArrowRight } from "lucide-react"
import Gallery from "./Gallery"
import DescriptionText from "./DescriptionText"
import ResumeDownload from "../hero/ResumeDownload"

export default function About() {
  return (
    <section
      id="about"
      className="relative py-20 overflow-hidden px-3 md:px-6s"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute hidden md:block top-20 left-10 w-72 h-72 bg-gradient-to-r from-neutral-400/10 to-neutral-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-60 md:bottom-20 right-30 md:right-10 w-96 h-96 bg-gradient-to-r from-neutral-400/10 to-neutral-400/10 rounded-full blur-3xl" />
      </div>
      <div className="px-3 md:px-6 relative z-10">
        <div className="flex flex-col items-start justify-center md:mb-8">
          <div className="md:w-full mb-6 md:mb-0 flex items-start gap-4">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r z-10 from-neutral-500 via-neutral-900 to-neutral-500 dark:from-neutral-300 dark:via-neutral-50 dark:to-neutral-300 bg-clip-text text-transparent font-extrabold relative">
                ABOUT
              </span>
            </h2>
            <div className="hidden md:flex md:w-24 md:h-24 w-14 h-14 lg:mt-12 -ml-12 lg:-ml-20 rounded-full border border-neutral-300 dark:border-neutral-700 items-center justify-center group hover:border-neutral-400 dark:hover:border-neutral-600 transition-all cursor-pointer">
              <div className="group-hover:translate-x-0.5 group-hover:-rotate-15 transition-transform duration-200">
                <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-neutral-700 dark:text-neutral-400 hidden md:flex transition-transform rotate-80" />
              </div>
            </div>
            <div className="md:hidden flex md:w-24 md:h-24 w-14 h-14 rounded-full border border-neutral-300 dark:border-neutral-700 items-center justify-center group hover:border-neutral-400 dark:hover:border-neutral-600 transition-all cursor-pointer">
              <div className="group-hover:-translate-x-0.5 group-hover:-rotate-15 transition-transform duration-200">
                <ArrowLeft className="w-6 h-6 md:hidden lg:hidden transition-transform -rotate-80" />
              </div>
            </div>
          </div>
          <DescriptionText />
        </div>
            <div className="xs:hidden flex items-start justify-start">
            <ResumeDownload/>
          </div>
        <div className="py-8 z-10">
          <Gallery/>
        </div>  
      </div>
    </section>
  )
}