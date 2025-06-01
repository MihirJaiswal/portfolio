import Gallery from "./Gallery/Gallery";

export default function Intro() {
    return (
      <div className="relative bg-white dark:bg-black overflow-hidden flex flex-col items-center justify-center max-w-7xl mx-auto border border-zinc-300 dark:border-zinc-700">
        <div className="absolute inset-0 pointer-events-none filter grayscale contrast-125" style={{
        backgroundImage: "url('/bg.webp')",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }}></div>
       <div className="relative lg:max-h-[650px]" >
           <Gallery/>
       </div>
      </div>
    )
  }