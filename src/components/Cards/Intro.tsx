import Introduction from "./Introduction";
import LanguageName from "./LanguageName";

export default function Intro() {
    return (
      <div className="relative bg-white dark:bg-black overflow-hidden flex flex-col justify-between max-w-6xl mx-auto border border-zinc-300 dark:border-zinc-700">
       <div className="flex flex-col lg:flex-row items-center justify-center lg:max-h-[630px]" >
       <LanguageName/>
       <Introduction/>
       </div>
      </div>
    )
  }
  