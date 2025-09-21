import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ThreeDMarqueeDemo } from "../ui/ThreeDMarqueeDemo"
import Link from "next/link"
import nyx from '../../../public/assets/nyxui.webp'
import logo from '../../../public/projects/nyxui.webp'
import cursor from '../../../public/assets/cursor.webp'

export default function Intro() {
  return (
    <section className="relative w-full py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white dark:from-black dark:via-gray-950 dark:to-black max-w-7xl mx-auto border border-neutral-300 dark:border-neutral-700 lg:max-h-[610px]">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-neutral-200/30 dark:bg-neutral-800/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-neutral-200/40 dark:bg-neutral-800/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="lg:container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="absolute inset-0 pointer-events-none z-[-1]">
            <ThreeDMarqueeDemo/>
        </div>
        
        {/* Full height overlay for left side - extend to full container height */}
        <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-white via-white to-transparent dark:from-black dark:via-black dark:to-transparent  h-screen -mt-44 pointer-events-none z-[-1] hidden lg:block" />
        <div className="absolute top-0 bottom-0 right-0 w-full bg-white/70 h-screen -mt-44 pointer-events-none z-[-1] dark:hidden" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left column - Content */}
          <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 mt-20 xs:mt-0 sm:mt-20 lg:mt-12">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-6">
              <span className="bg-gradient-to-r from-neutral-500 via-black to-neutral-500 dark:from-neutral-400 dark:via-white dark:to-neutral-200 bg-clip-text text-transparent animate-gradient-x">
                NYX UI
              </span>
            </h1>

            {/* Description */}
            <p className="text-md md:text-lg text-neutral-600 dark:text-neutral-300 lg:max-w-xl mb-8 leading-relaxed">
              My own UI library for React. Provides{" "}
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">30+ customizable components</span>{" "}
              designed for modern web apps. <span className="hidden xs:block">Fast, accessible, and beautiful out of the box.</span>
            </p>

            {/* CTA button */}
            <div className="relative flex flex-wrap items-center justify-center lg:items-start lg:justify-start gap-3 px-3 lg:px-0">
              <Link href="https://nyxui.com/" target="_blank" >
              <Button size="lg">
                <span className="relative flex items-center gap-2">
                  Explore Components
                  <ArrowRight className="w-5 h-5 transition-transform duration-300" />
                </span>
              </Button>
              </Link>
              <Link href="https://nyxui.com/" target="_blank" >
              <Button size="lg" variant={"secondary"} className="border !w-54 xs:w-auto border-neutral-300 dark:border-neutral-700 bg-background flex gap-2" >
                
                <span className="relative flex items-center gap-2">
                  Star the repository
                </span>
                <span>
                  ⭐
                </span>
              </Button>
              </Link>
            </div>
          </div>

          {/* Right column - Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[4/3] w-full max-w-xl mx-auto">
              <div className="absolute inset-0 rounded-md bg-gradient-to-tr from-neutral-200 to-neutral-100 dark:from-neutral-800 dark:to-neutral-700 p-1 shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-8 bg-neutral-100 dark:bg-neutral-800 rounded-t-md flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className={`w-3 h-3 rounded-full bg-red-500`}></div>
                    <div className={`w-3 h-3 rounded-full bg-yellow-500`}></div>
                    <div className={`w-3 h-3 rounded-full bg-green-500`}></div>
                  </div>
                </div>
                <div className="absolute inset-0 top-8 overflow-hidden rounded-b-sm border">
                  <Image
                    src={nyx}
                    alt="nyx UI"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                    unoptimized
                    placeholder="blur"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>

              {/* Floating component previews */}
              <div className="absolute hidden -bottom-6 -left-6 w-24 h-24 bg-white dark:bg-neutral-900 rounded-sm shadow-xl p-3 md:flex flex-col justify-between items-end border border-neutral-200 dark:border-neutral-700">
                <div className="bg-black w-full h-full flex items-center justify-center">
                  <Image
                    src={cursor}
                    alt="nyx UI"
                    width={50}
                    height={50}
                    className="object-cover object-center rotate-45"
                    placeholder="blur"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="absolute -top-4 right-0  md:-right-4 w-16 h-16 md:w-24 md:h-24 bg-white dark:bg-neutral-900 rounded-sm shadow-xl p-1 md:p-2 flex items-center justify-center border border-neutral-200 dark:border-neutral-700">
                <div className="w-full h-full rounded-sm bg-black flex items-center justify-center">
                  <Image
                    src={logo}
                    alt="nyx UI"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                    placeholder="blur"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}