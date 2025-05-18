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
            className="text-4xl sm:text-5xl md:text-6xl font-serif text-white leading-relaxed"
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

        <div className="mb-8 lg:hidden">
          <button
            onClick={handleStartQuiz}
            className="w-full bg-[#C5A267] hover:bg-[#B49157] text-white px-8 py-4 text-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 min-h-[52px] transform hover:translate-y-[-2px] hover:shadow-lg"
          >
            Begin Your Style Journey
            <ArrowRight className="w-5 h-5" />
          </button>
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
        <div ref={benefitsRef} className="space-y-8 mt-6 lg:mt-0">

          {/* Reviews */}
          <div className="space-y-6">
            <h3 className="text-white text-xl font-serif mb-4">What others say...</h3>
            <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-lg p-5 border border-white/10 shadow-lg transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl">
              <div className="flex items-center mb-3">
                <div className="flex text-[#C5A267]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-white italic text-lg font-light leading-relaxed">"This quiz gave me clarity on my style in minutes!"</p>
              <div className="flex items-center mt-4">
                <div className="w-8 h-8 bg-[#C5A267] rounded-full flex items-center justify-center text-white font-bold">A</div>
                <p className="text-white/70 text-sm ml-3">Alex B. <span className="text-white/50">· New York</span></p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-lg p-5 border border-white/10 shadow-lg transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl">
              <div className="flex items-center mb-3">
                <div className="flex text-[#C5A267]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-white italic text-lg font-light leading-relaxed">"Loved the personalized recommendations. They transformed my space completely."</p>
              <div className="flex items-center mt-4">
                <div className="w-8 h-8 bg-[#C5A267] rounded-full flex items-center justify-center text-white font-bold">M</div>
                <p className="text-white/70 text-sm ml-3">Maria S. <span className="text-white/50">· Chicago</span></p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-white/10 to-white/5 rounded-lg p-5 border border-white/10 shadow-lg transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl">
              <div className="flex items-center mb-3">
                <div className="flex text-[#C5A267]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-white italic text-lg font-light leading-relaxed">"A fun way to discover my design taste! The results matched my preferences perfectly."</p>
              <div className="flex items-center mt-4">
                <div className="w-8 h-8 bg-[#C5A267] rounded-full flex items-center justify-center text-white font-bold">J</div>
                <p className="text-white/70 text-sm ml-3">John K. <span className="text-white/50">· Miami</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizIntro;