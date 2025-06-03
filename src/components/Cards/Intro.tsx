import Gallery from "./Gallery/Gallery";

export default function Intro() {
    return (
      <div className="relative overflow-hidden flex flex-col items-center justify-center max-w-7xl mx-auto border border-zinc-300 dark:border-zinc-700">
        <div className="absolute inset-0 pointer-events-none filter grayscale contrast-200" /* style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }} */></div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#000000_40%,#ffffff_100%)]"></div>
       <div className="relative lg:max-h-[650px]">

           <Gallery/>
       </div>
      </div>
    )
  }