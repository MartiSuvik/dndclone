import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Check } from 'lucide-react';
import { StepProps } from './QuizTypes';

interface ResultsStepProps extends StepProps {
  triggerFooterContact: () => void;
}

const ResultsStep: React.FC<ResultsStepProps> = ({ 
  quizData, 
  nextStep,
  triggerFooterContact 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const mainStyleRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  // State to track if elements are ready for interaction
  const [, setElementsReady] = useState(false);
  
  // Restart the quiz
  const restartQuiz = () => {
    nextStep(); // This will reset the quiz in the parent component
  };

  // Animations with staggered entrance
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // For reduced motion, just show everything immediately
      setElementsReady(true);
      if (titleRef.current) titleRef.current.style.opacity = '1';
      if (mainStyleRef.current) mainStyleRef.current.style.opacity = '1';
      if (profileRef.current) profileRef.current.style.opacity = '1';
      if (galleryRef.current) galleryRef.current.style.opacity = '1';
      if (ctaRef.current) ctaRef.current.style.opacity = '1';
      return;
    }
    
    const tl = gsap.timeline({ 
      defaults: { ease: "power3.out" },
      onComplete: () => setElementsReady(true)
    });
    
    // Entrance animations
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8 }
    ).fromTo(
      mainStyleRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.7)" },
      "-=0.4"
    ).fromTo(
      profileRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5 },
      "-=0.3"
    ).fromTo(
      profileRef.current?.children || [],
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 },
      "<"
    ).fromTo(
      galleryRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4 },
      "-=0.2"
    ).fromTo(
      galleryRef.current?.children || [],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" },
      "<"
    ).fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.1"
    );
    
    // Add subtle animation to main style label
    gsap.to(mainStyleRef.current, {
      boxShadow: "0 0 30px rgba(197, 162, 103, 0.6)",
      repeat: -1,
      yoyo: true,
      duration: 2
    });
    
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="max-h-[80vh] overflow-y-auto custom-scrollbar pr-4 py-8"
    >
      <div className="max-w-5xl mx-auto">
        <h2 
          ref={titleRef}
          className="opacity-0 text-4xl lg:text-5xl font-serif mb-10 text-white text-center"
        >
          Based on our super fancy algorithm™, your main style is...
        </h2>
        
        {/* Main Style */}
        <div 
          ref={mainStyleRef}
          className="opacity-0 mx-auto bg-[#C5A267] px-10 py-6 rounded-xl shadow-lg mb-12"
        >
          <h3 className="text-4xl lg:text-5xl font-serif text-white text-center tracking-wide">
            {quizData.results.mainStyle}
          </h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-12">
          {/* Profile Section */}
          <div>
            <div 
              ref={profileRef}
              className="opacity-0 bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/10"
            >
              <h3 className="text-2xl font-serif mb-6 text-white">
                {quizData.name}, your design profile revealed:
              </h3>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-[#C5A267] rounded-full p-1 flex-shrink-0 shadow-md">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-lg text-white/90">
                    You're drawn to <span className="text-white font-medium">{quizData.results.mainStyle}</span> spaces that feel both elegant and inviting
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-[#C5A267] rounded-full p-1 flex-shrink-0 shadow-md">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-lg text-white/90">
                    Your priority room, the <span className="text-white font-medium">{quizData.priorityRoom}</span>, should incorporate elements of {quizData.results.subStyles[0]?.toLowerCase() || 'warmth'} and {quizData.results.subStyles[1]?.toLowerCase() || 'texture'}
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-[#C5A267] rounded-full p-1 flex-shrink-0 shadow-md">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-lg text-white/90">
                    Your complementary style elements include:
                    <span className="block mt-2 pl-2 border-l-2 border-[#C5A267]/50">
                      {quizData.results.subStyles && quizData.results.subStyles.length > 0 ? (
                        quizData.results.subStyles.map(style => (
                          <span key={style} className="inline-block bg-white/10 px-3 py-1 rounded-full mr-2 mb-2">
                            {style}
                          </span>
                        ))
                      ) : (
                        <span className="inline-block bg-white/10 px-3 py-1 rounded-full mr-2 mb-2">
                          Contemporary
                        </span>
                      )}
                    </span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Gallery Section replaced with CTA and review */}
          <div className="flex flex-col items-center justify-center h-full w-full">
            <h3 className="text-2xl font-serif mb-6 text-white text-center">
              The next step: Book your complimentary call
            </h3>
            <p className="text-lg text-white/90 mb-8 text-center max-w-xl">
              Our designers will help you bring your {quizData.results.mainStyle} vision to life, tailored to your space and needs. On your call, you'll get expert advice, answers to your questions, and a clear path to your dream home.
            </p>
            <div className="bg-white/10 border border-white/10 rounded-xl p-6 max-w-md mx-auto mb-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl text-white">“</span>
                <span className="text-white font-serif text-lg italic">Next step to get on a call was the smartest choice I made</span>
              </div>
              <div className="text-right text-white/70 text-sm">— Donald B.</div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div 
          ref={ctaRef}
          className="opacity-0 text-center border-t border-white/10 pt-10 pb-6"
        >
          <p className="text-2xl font-serif text-white mb-8">
            Ready to bring your {quizData.results.mainStyle} vision to life?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                triggerFooterContact();
                restartQuiz(); // This will close the quiz by resetting it
              }}
              className="px-8 py-4 bg-[#C5A267] text-white text-xl rounded-md hover:bg-[#B49157] transition-all duration-300 flex items-center gap-3 min-h-[52px] hover:shadow-xl transform hover:-translate-y-1"
            >
              Book Your Complimentary Consultation
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button
              onClick={restartQuiz}
              className="px-6 py-3 bg-white/10 border border-white/30 text-white text-lg rounded-md hover:bg-white/20 transition-colors duration-300"
            >
              Restart Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsStep;