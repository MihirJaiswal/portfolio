import { ArrowLeft } from "lucide-react"
import ResumeDownload from "./ResumeDownload"
import Link from "next/link"
import { HeroImage } from "./HeroImage"

export const HeroSection = () => {
  return (
    <section
      className="bg-white dark:bg-neutral-950 will-change-transform relative overflow-hidden pb-4"
      aria-label="Portfolio hero section"
    >
      {/* Decorative background elements */}
      <div
        className="absolute hidden lg:hidden lg:dark:block top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#0c0a09)] z-0"
        aria-hidden="true"
      ></div>
      <div className="absolute inset-0 overflow-hidden md:hidden z-0" aria-hidden="true">
        <div
          className="absolute top-40 left-30 w-32 h-32 bg-gradient-to-r from-neutral-400/60 to-neutral-400/10 rounded-full blur-3xl"
        />
      </div>
      <div className="px-6 relative mt-18 xs:mt-24 lg:mt-18">
        <header>
          <h1
            className="absolute font-[geist] top-4 left-0 right-0 font-black text-center leading-tight md:leading-none mx-auto tracking-wide md:tracking-tight w-full mt-5"
            style={{
              fontSize: "clamp(2.8rem, 12vw, 9rem)",
              maxWidth: "100%",
            }}
            aria-label="Check out my portfolio - Designer and Developer showcase"
          >
            <span
              className="bg-gradient-to-r family-geist from-neutral-500 via-neutral-950 to-neutral-500 dark:from-neutral-400 dark:via-white dark:to-neutral-400 bg-clip-text text-transparent px-2"
              aria-hidden="true"
            >
              <span className="hidden xl:inline-flex">CHECK OUT</span>
              <span className="xl:hidden font-black">EXPLORE</span> MY
            </span>
            <br />
            <span
              className="bg-gradient-to-r textclass font-black from-neutral-500 via-neutral-950 to-neutral-500 dark:from-neutral-300 dark:via-white dark:to-neutral-300 bg-clip-text text-transparent relative"
              aria-hidden="true"
            >
              PORTFOLIO
            </span>
          </h1>
        </header>
        <main className="flex flex-col lg:flex-row items-center justify-center relative">
          <div
            className="flex flex-col items-center justify-center z-10 pt-28 xs:pt-40 lg:pt-0"
            role="img"
            aria-label="Professional portfolio showcase image"
          >
            <HeroImage/>
          </div>
          {/* Resume download button */}
          <div
            className="sm:absolute left-3 bottom-28 z-10 sm:flex flex-col gap-4 hidden"
            role="complementary"
            aria-label="Resume download section"
          >
            <ResumeDownload />
            <div className="text-sm text-neutral-700 dark:text-neutral-300 mt-2 hidden lg:block">
              <p className="max-w-[15rem] xl:max-w-xs tracking-wide leading-snug">I am a designer and developer with a passion for crafting aesthetically refined websites.</p>
            </div>
          </div>

          {/* Link for nyx ui */}
          <div
            className="sm:absolute right-3 bottom-28 hidden sm:flex items-end flex-col z-10 mx-auto"
            role="complementary"
            aria-label="Button for my ui library"
          >
            <Link
              href="https://nyxui.com/"
              aria-label="Navigate to Nyx UI"
              rel="noopener noreferrer"
              target="_blank"
              className="md:w-18 md:h-18 w-14 h-14 rounded-full border border-neutral-300 dark:border-neutral-700 items-center justify-center group hover:border-neutral-400 dark:hover:border-neutral-600 transition-all cursor-pointer flex focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-950"
              type="button"
            >
              <ArrowLeft
                className="w-6 h-6 md:w-8 md:h-8 transition-transform rotate-125"
                aria-hidden="true"
              />
            </Link>
            <p
              className="text-xs md:text-sm text-right lg:text-lg text-neutral-800 dark:text-neutral-200 tracking-wide mt-4 font-bold uppercase"
              role="text"
              aria-label="Professional specialization: Designer and Developer"
            >
              CHECKOUT NYX UI
            </p>
            <p className="max-w-[15rem] xl:max-w-xs text-right hidden lg:block  tracking-wide leading-snug text-sm text-neutral-700 dark:text-neutral-300">
              Explore my component library
            </p>
          </div>
        </main>
        <div className="-mt-6 text-sm text-neutral-700 dark:text-neutral-300 md:hidden w-full flex flex-col items-center justify-between">
          <div className="hidden xs:block sm:hidden">
            <ResumeDownload />
          </div>
          <p className="mt-3 max-w-[20rem] xl:max-w-xs mx-auto tracking-wide leading-snug text-center">I am a <span className="text-black dark:text-white">designer</span> and <span className="text-black dark:text-white" >developer</span> with a passion for crafting aesthetically refined websites.</p>
        </div>
        <div className="flex justify-between xs:hidden mt-6 text-sm">
          <p>Building{" "}<span className="text-black dark:text-white font-bold underline">Nyx UI</span> </p>
          <p>
            5+ Client served
          </p>
        </div>
      </div>
    </section>
  )
}
