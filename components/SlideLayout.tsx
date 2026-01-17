
import React from 'react';
import { SlideData } from '../types';

interface SlideLayoutProps {
  slide: SlideData;
  isActive: boolean;
  direction: 'forward' | 'backward';
}

const SlideLayout: React.FC<SlideLayoutProps> = ({ slide, isActive, direction }) => {
  if (!isActive) return null;

  const bgStyles = slide.backgroundImage 
    ? { 
        backgroundImage: `linear-gradient(to bottom, rgba(2, 2, 5, 0.9) 0%, rgba(2, 2, 5, 0.7) 50%, rgba(2, 2, 5, 0.95) 100%), url(${slide.backgroundImage})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }
    : {};

  return (
    <div 
      className={`absolute inset-0 w-full h-full flex flex-col justify-center items-center p-6 md:p-12 transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] transform ${
        isActive 
          ? 'opacity-100 translate-y-0 scale-100 rotate-0' 
          : direction === 'forward' 
            ? 'opacity-0 -translate-y-12 scale-110 rotate-1' 
            : 'opacity-0 translate-y-12 scale-110 rotate-1'
      }`}
      style={bgStyles}
    >
      {/* Container is now max-w-[95%] to fill more horizontal space */}
      <div className="max-w-[95%] xl:max-w-[90%] w-full flex flex-col items-start gap-8 md:gap-12 mt-16 md:mt-24">
        <div className="space-y-4 max-w-6xl">
          {slide.subtitle && (
            <div className="flex items-center gap-4 animate-in">
              <div className="w-8 h-1 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
              <p className="text-indigo-400 font-black tracking-[0.4em] uppercase text-[10px] md:text-xs">
                {slide.subtitle}
              </p>
            </div>
          )}
          {/* Increased title size significantly for better presence */}
          <h1 className="text-5xl md:text-[80px] lg:text-[110px] font-black font-display leading-[0.85] tracking-tight text-white drop-shadow-2xl">
            {slide.title.split(' ').map((word, i) => (
              <span key={i} className="block md:inline mr-4 last:mr-0 glitch-text">
                {word}{' '}
              </span>
            ))}
          </h1>
        </div>
        
        <div className="w-full relative">
          {/* The vertical accent line remains but with adjusted position */}
          <div className="absolute -left-6 md:-left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-indigo-500 to-transparent opacity-20 hidden md:block" />
          <div className="w-full">
            {slide.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideLayout;
