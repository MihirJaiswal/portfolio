import { ArrowRight, Sparkles, Eye, MousePointer2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Intro() {

  return (
    <div 
      className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-black dark:via-gray-950 dark:to-black overflow-hidden flex flex-col items-center justify-center max-w-7xl mx-auto border border-neutral-300 dark:border-neutral-700 shadow-2xl lg:max-h-[635px]"
    >
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(115, 115, 115, 0.3); }
          50% { box-shadow: 0 0 40px rgba(115, 115, 115, 0.6); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .shimmer-text {
          background: linear-gradient(90deg, #171717, #525252, #a3a3a3, #171717);
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
      
      {/* Interactive background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dynamic gradient orbs */}
      {/*   <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-neutral-400/20 to-neutral-600/20 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            top: `${20 + mousePosition.y * 0.1}%`,
            right: `${10 + mousePosition.x * 0.1}%`,
            transform: `scale(${1 + mousePosition.x * 0.002})`
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-neutral-500/20 to-neutral-700/20 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            bottom: `${20 + mousePosition.y * 0.05}%`,
            left: `${10 + mousePosition.x * 0.05}%`,
            transform: `scale(${1 + mousePosition.y * 0.002})`
          }}
        /> */}
        
        {/* Floating geometric shapes */}
{/*         <FloatingCard delay={0} className="absolute top-20 left-20">
          <div className="w-4 h-4 bg-gradient-to-r from-neutral-400 to-neutral-500 rounded-full opacity-60" />
        </FloatingCard>
        <FloatingCard delay={1} className="absolute top-40 right-32">
          <div className="w-6 h-6 bg-gradient-to-r from-neutral-500 to-neutral-600 rounded-lg opacity-60 rotate-45" />
        </FloatingCard>
        <FloatingCard delay={2} className="absolute bottom-32 left-32">
          <div className="w-5 h-5 bg-gradient-to-r from-neutral-600 to-neutral-700 rounded-full opacity-60" />
        </FloatingCard>
        <FloatingCard delay={0.5} className="absolute bottom-20 right-20">
          <div className="w-3 h-3 bg-gradient-to-r from-neutral-700 to-neutral-800 rounded-full opacity-60" />
        </FloatingCard> */}
      </div>

      <div className="relative z-10 w-full h-full px-6 py-16 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center justify-center gap-8 text-center">
          
          {/* Animated badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-neutral-100/80 to-neutral-200/80 dark:from-neutral-800/80 dark:to-neutral-700/80 text-neutral-800 dark:text-neutral-200 text-sm font-medium border border-neutral-300/50 dark:border-neutral-600/50 hover:scale-105 transition-all duration-300 cursor-pointer animate-pulse-glow">
            <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
            Modern UI Components
            <Eye className="w-4 h-4 ml-1" />
          </div>

          {/* Main heading with interactive effects */}
          <div className="space-y-4">
            <h2 className="text-2xl mb-12 font-blACK tracking-tight">
               EXPLORE MY UI LIBRARY
            </h2>
            
            {/* Animated NUVYX UI title */}
            <div 
              className="relative mb-12"
            >
              <h1 className={`text-5xl sm:text-7xl lg:text-8xl font-black bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 dark:from-white dark:via-neutral-300 dark:to-white bg-clip-text text-transparent transition-all duration-500 text-shimmer`}>
                NUVYX UI
              </h1>
            </div>
          </div>

          {/* Enhanced description */}
          <p className="text-md text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            A comprehensive collection of <span className="font-semibold text-neutral-900 dark:text-neutral-100">30+ customizable components</span> designed for modern web applications. Fast, accessible, and beautiful out of the box.
          </p>
          {/* Enhanced CTA button */}
          <div className="relative group">
            <Button
              size="lg"
              className="relative overflow-hidden bg-gradient-to-r from-neutral-900 to-neutral-700 hover:from-neutral-800 hover:to-neutral-600 dark:from-white dark:to-neutral-200 dark:hover:from-neutral-100 dark:hover:to-neutral-300 text-white dark:text-black font-semibold px-8 py-4 rounded-sm shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
              onClick={() => window.open('https://nuvyxui.vercel.app/', '_blank')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                <MousePointer2 className="w-5 h-5 group-hover:animate-bounce" />
                Explore Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
            
          </div>
        </div>
      </div>
    </div>
  )
}