import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ProcessingStep: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingCircleRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Add icons to iconRefs
  const addToIconRefs = (el: HTMLDivElement | null, index: number) => {
    iconRefs.current[index] = el;
  };
  
  // Processing messages to cycle through
  const processingMessages = [
    "Analyzing your design preferences...",
    "Identifying your style patterns...",
    "Finding complementary elements...",
    "Creating your personalized profile...",
    "Generating recommendations...",
    "Almost there..."
  ];
  
  // Animations
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    // Main elements animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(
      loadingCircleRef.current,
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 0.8 }
    ).fromTo(
      messageRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 }
    );
    
    // Create animation for processing messages
    let currentIndex = 0;
    const messageEl = messageRef.current?.querySelector('p');
    
    if (messageEl) {
      const messageInterval = setInterval(() => {
        gsap.to(messageEl, { 
          opacity: 0, 
          y: -10, 
          duration: 0.3,
          onComplete: () => {
            currentIndex = (currentIndex + 1) % processingMessages.length;
            messageEl.textContent = processingMessages[currentIndex];
            
            gsap.to(messageEl, { 
              opacity: 1, 
              y: 0, 
              duration: 0.3 
            });
          }
        });
      }, 1500);
      
      return () => {
        clearInterval(messageInterval);
        tl.kill();
      };
    }
    
    // Animate icons in a staggered manner
    const iconsTimeline = gsap.timeline({ 
      repeat: -1,
      repeatDelay: 0.5
    });
    
    iconsTimeline.to(iconRefs.current, {
      scale: 1.2,
      opacity: 1,
      duration: 0.5,
      stagger: 0.15,
      ease: "power2.out",
    }).to(iconRefs.current, {
      scale: 1,
      opacity: 0.3,
      duration: 0.5,
      stagger: 0.15,
      ease: "power2.in",
    });
    
    return () => {
      iconsTimeline.kill();
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="flex flex-col items-center justify-center min-h-[500px] px-4"
    >
      {/* Main loading animation */}
      <div 
        ref={loadingCircleRef}
        className="relative w-40 h-40 mb-12"
      >
        {/* Outer rotating circle */}
        <div className="absolute inset-0 rounded-full border-4 border-[#C5A267]/30 animate-spin-slow"></div>
        
        {/* Inner pulsing circle */}
        <div className="absolute inset-4 rounded-full bg-[#C5A267]/20 animate-pulse-gentle"></div>
        
        {/* Central icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-[#C5A267] shadow-lg flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        
        {/* Orbiting icons */}
        <div 
          ref={(el) => addToIconRefs(el, 0)}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 w-8 h-8 rounded-full bg-[#C5A267]/80 shadow-md opacity-30"
        ></div>
        <div 
          ref={(el) => addToIconRefs(el, 1)}
          className="absolute top-1/2 right-0 transform translate-x-4 -translate-y-1/2 w-8 h-8 rounded-full bg-[#C5A267]/80 shadow-md opacity-30"
        ></div>
        <div 
          ref={(el) => addToIconRefs(el, 2)}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 w-8 h-8 rounded-full bg-[#C5A267]/80 shadow-md opacity-30"
        ></div>
        <div 
          ref={(el) => addToIconRefs(el, 3)}
          className="absolute top-1/2 left-0 transform -translate-x-4 -translate-y-1/2 w-8 h-8 rounded-full bg-[#C5A267]/80 shadow-md opacity-30"
        ></div>
      </div>
      
      {/* Processing message */}
      <div ref={messageRef} className="text-center">
        <h2 className="text-3xl lg:text-4xl font-serif mb-4 text-white">
          Calculating your results...
        </h2>
        <p className="text-xl text-white/80 font-light animate-fadeIn">
          {processingMessages[0]}
        </p>
      </div>
      
      <style>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse-gentle {
          0%, 100% { transform: scale(0.95); opacity: 0.7; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-pulse-gentle {
          animation: pulse-gentle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ProcessingStep;