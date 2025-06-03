// components/Loader.tsx
import React from 'react';

interface LoaderProps {
  progress?: number;
}

const Loader: React.FC<LoaderProps> = ({ progress = 0 }) => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center space-y-8 max-w-md mx-auto px-6">
        {/* Portfolio Title */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
            Mihir Jaiswal
          </h1>
          <p className="text-xl text-neutral-300 font-light tracking-wide">
            Portfolio
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full max-w-xs mx-auto space-y-3">
          {/* Progress Bar */}
          <div className="relative h-1 bg-neutral-700 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-neutral-300 to-neutral-100 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse"></div>
            </div>
          </div>
          
          {/* Progress Text */}
          <div className="flex justify-between items-center text-sm text-neutral-400">
            <span>Loading...</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Subtle animation dots */}
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
