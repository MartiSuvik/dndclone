import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Search, ArrowRight } from 'lucide-react';

interface QuizIntroProps {
  startQuiz: () => void;
}

const QuizIntro: React.FC<QuizIntroProps> = ({ startQuiz }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(
      [headingRef.current, descRef.current],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
    ).fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8 },
      "-=0.5"
    ).fromTo(
      benefitsRef.current?.children || [],
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.1 },
      "-=0.3"
    ).fromTo(
      buttonRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.2"
    );
    
    return () => {
      tl.kill();
    };
  }, []);

  const handleStartQuiz = (e: React.MouseEvent) => {
    e.preventDefault();
    setTimeout(() => {
      startQuiz();
    }, 10);
  };

  return (
    <div 
      ref={containerRef}
      className="bg-[#1A1A1A] p-8 rounded-xl shadow-xl border border-gray-800 w-full max-w-5xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center transform transition-transform duration-1000">
        {/* Left side: Text and image */}
        <div className="space-y-8">
          <h2 
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl font-serif text-white leading-tight"
          >
            Discover Your Ideal Interior Style
          </h2>
          <p 
            ref={descRef}
            className="text-xl sm:text-1xl text-white/90"
          >
            In just a few minutes, uncover the design language that reflects your life. Our intelligent quiz delivers tailored ideas to elevate your space, effortlessly.
          </p>
          
          <div className="relative mt-6 aspect-[16/9] max-w-md mx-auto lg:mx-0">
            <img
              ref={imageRef}
              src="https://res.cloudinary.com/designcenter/image/upload/v1747166091/quiz_image.avif"
              alt="Interior Style Quiz"
              className="rounded-lg shadow-xl object-cover w-full h-full"
              loading="lazy"
            />
            <div className="absolute inset-0 rounded-lg shadow-inner bg-gradient-to-t via-transparent to-transparent"></div>
          </div>
          
          <div className="hidden lg:block">
            <button
              ref={buttonRef}
              onClick={handleStartQuiz}
              className="bg-[#C5A267] hover:bg-[#B49157] text-white px-8 py-4 text-xl font-medium transition-all flex items-center gap-3 min-h-[52px] transform hover:translate-y-[-2px] hover:shadow-lg"
            >
              <Search className="w-5 h-5" />
              Find your style <em className="ml-2 text-sm font-normal">1000+ have completed</em>
            </button>
          </div>
        </div>
        
        {/* Right side: Benefits */}
        <div 
          ref={benefitsRef}
          className="bg-white/10 backdrop-blur-sm p-10 rounded-xl shadow-xl border border-white/20"
        >
          <h3 className="text-3xl font-serif mb-8 text-white">
            Why take the quiz consultation?
          </h3>
          
          <ul className="space-y-8">
            <li className="flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 bg-[#C5A267] rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <div>
                <h4 className="text-xl font-serif text-white mb-2">Discover your style</h4>
                <p className="text-white/80 text-lg">Understand your design preferences in just a few minutes with our intelligent algorithm</p>
              </div>
            </li>
            
            <li className="flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 bg-[#C5A267] rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <div>
                <h4 className="text-xl font-serif text-white mb-2">Expert recommendations</h4>
                <p className="text-white/80 text-lg">Receive custom design suggestions tailored to your unique taste and lifestyle</p>
              </div>
            </li>
            
            <li className="flex gap-5">
              <div className="flex-shrink-0 w-10 h-10 bg-[#C5A267] rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <div>
                <h4 className="text-xl font-serif text-white mb-2">Visualize possibilities</h4>
                <p className="text-white/80 text-lg">See how different styles would transform your specific spaces and rooms</p>
              </div>
            </li>
          </ul>
          
          <div className="mt-10 lg:hidden">
            <button
              onClick={handleStartQuiz}
              className="w-full bg-[#C5A267] hover:bg-[#B49157] text-white px-8 py-4 text-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 min-h-[52px] transform hover:translate-y-[-2px] hover:shadow-lg"
            >
              Begin Your Style Journey
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizIntro;