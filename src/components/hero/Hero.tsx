import Image from "next/image"
import { ArrowLeft} from "lucide-react"
import ResumeDownload from "./ResumeDownload"
import img from '../../../public/assets/hero-image.webp'
import Link from "next/link"

export const HeroSection = () => {
  return (
    <section 
      className="bg-white dark:bg-neutral-950 will-change-transform relative overflow-hidden pb-4"
      aria-label="Portfolio hero section"
    >
     
      {/* Decorative background elements - marked as decorative */}
       <div 
        className="absolute hidden lg:hidden lg:dark:block top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#0c0a09)] z-0"
        aria-hidden="true"
      ></div>
      <div className="absolute inset-0 overflow-hidden md:hidden z-0" aria-hidden="true">
        <div
          className="absolute top-40 left-30 w-32 h-32 bg-gradient-to-r from-neutral-400/60 to-neutral-400/10 rounded-full blur-3xl"
        />
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="px-6 relative mt-18 xs:mt-24 lg:mt-18">
        {/* Title - now with improved dark mode colors */}
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

        {/* Main content container - improved height handling */}
        <main className="flex flex-col lg:flex-row items-center justify-center relative">
          {/* Central content */}
          <div
            className="flex flex-col items-center justify-center z-10 pt-28 xs:pt-40 lg:pt-0"
            role="img"
            aria-label="Professional portfolio showcase image"
          >
            {/* Desktop image */}
            <div
              className="z-10 relative w-[clamp(300px,40vw,450px)] h-[clamp(350px,45vw,500px)] overflow-hidden rounded-lg lg:mt-52 md:scale-100 lg:scale-92"
            >
              <Image
                src={img}
                alt="Professional portrait of the designer and developer showcasing creative work and technical expertise"
                height={450}
                width={475}
                quality={100}
                className="object-contain transition-all duration-300 relative"
                priority
                loading="eager"
                unoptimized
                fetchPriority="high"
                sizes="(max-width: 1024px) 40vw, 450px"
                style={{
                  WebkitMaskImage: "text",
                  maskImage: "text",
                  maskComposite: "exclude",
                }}
              />
              <div className="hidden lg:block absolute bottom-0 -translate-y-[140px] -translate-x-15 right-0 bg-white dark:bg-black/5 h-1 w-14 rotate-30 rounded-3xl blur-xs"></div>
               <div className="hidden lg:block absolute bottom-0 -translate-y-[110px] xl:-translate-y-[120px] translate-x-17 xl:translate-x-21 left-0 bg-white dark:bg-black/5 h-2 xl:h-1 w-21 rounded-3xl -rotate-25 blur-xs"></div>
            </div>
          </div>
          
          {/* Resume download button */}
          <div
            className="sm:absolute left-3 bottom-28 z-10 sm:flex flex-col gap-4 hidden"
            role="complementary"
            aria-label="Resume download section"
          >
            <ResumeDownload/>
            <div className="text-sm text-neutral-700 dark:text-neutral-300 mt-2 hidden lg:block">
              <p className="max-w-[15rem] xl:max-w-xs tracking-wide leading-snug">I am a designer and developer with a passion for crafting aesthetically refined websites.</p>
            </div>
          </div>
          
          {/* Role indicator with arrow */}
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
            <ResumeDownload/>
          </div>
              <p className="mt-3 max-w-[20rem] xl:max-w-xs mx-auto tracking-wide leading-snug text-center">I am a <span className="text-black dark:text-white">designer</span> and <span className="text-black dark:text-white" >developer</span> with a passion for crafting aesthetically refined websites.</p>
            </div>
            <div className="flex justify-between xs:hidden mt-6 text-sm"> 
              <p>Checkout <span className="text-black dark:text-white font-bold underline">Nyx UI</span> </p>
              <ResumeDownload/>
            </div>
      </div>
         <div aria-label="Professional role indicator" className="hidden xs:flex justify-between absolute top-10 left-0 right-0 max-w-6xl mx-auto translate-y-10 px-6 sm:px-20 xl:px-4">
            <div className="flex items-center">
              <p aria-label="Professional specialization: Developer" className="text-xs font-light text-neutral-900 dark:text-neutral-400 tracking-[0.2em] uppercase">Developer</p>
            </div>
            <div className="flex items-center">
              <p aria-label="Professional specialization: Product Builder" className="text-xs font-light text-neutral-900 dark:text-neutral-400 tracking-[0.2em] uppercase">Product Builder</p>
            </div>
            <div className="flex items-center">
              <p aria-label="Professional specialization: Designer" className="text-xs font-light text-neutral-900 dark:text-neutral-400 tracking-[0.2em] uppercase">Designer</p>
            </div>
          </div>
    </section>
  )
}
