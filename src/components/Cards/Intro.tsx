import Gallery from "./Gallery/Gallery";

export default function Intro() {
    return (
      <div className="relative overflow-hidden flex flex-col items-center justify-center max-w-7xl mx-auto">
        <div className="absolute inset-0 pointer-events-none filter grayscale contrast-200" /* style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
      }} */></div>
       <div className="relative lg:max-h-[650px] ">
        <span className="md:text-7xl text-3xl font-extrabold text-zinc-50">CHECKOUT NUVYX UI</span>
       </div>
      </div>
    )
  }