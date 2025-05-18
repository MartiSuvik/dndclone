import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { StepProps } from './QuizTypes';

const NameCaptureStep: React.FC<StepProps> = ({ 
  quizData, 
  updateQuizData, 
  nextStep, 
  prevStep 
}) => {
  const [formError, setFormError] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quizData.name.trim() === '') {
      setFormError('Please enter your name');
      return;
    }
    setFormError('');
    nextStep();
  };

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    }
  }, []);

  // Animations
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8 }
    ).fromTo(
      formRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.4"
    ).fromTo(
      buttonsRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      "-=0.3"
    );
    
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full"
    >
      {/* Left side - Text content */}
      <div className="bg-white/10 backdrop-blur-md p-8 lg:p-10 rounded-xl text-white">
        <h2 
          ref={titleRef}
          className="text-3xl lg:text-4xl font-serif mb-6"
        >
          Let's get to know each other
        </h2>
        
        <p className="text-xl text-white/80 mb-6 font-light">
          We're excited to create a personalized design experience just for you. First, we'd love to know your name.
        </p>
        
        <div className="space-y-6 mt-8">
          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <h3 className="text-2xl font-serif mb-4">Your Design Journey So Far</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#C5A267] flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <p>
                  <span className="font-medium">Style Selection:</span> 
                  <span className="text-white/80"> You've chosen {quizData.selectedImages.length} inspiring images</span>
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#C5A267] flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <p>
                  <span className="font-medium">Rooms to Transform:</span>
                  <span className="text-white/80"> {quizData.selectedRooms.join(', ')}</span>
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#C5A267] flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <p>
                  <span className="font-medium">Priority Space:</span>
                  <span className="text-white/80"> {quizData.priorityRoom}</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Right side - Form */}
      <div className="flex items-center justify-center">
        <form 
          ref={formRef}
          onSubmit={handleSubmit} 
          className="bg-white/5 backdrop-blur-md p-8 lg:p-10 rounded-xl border border-white/10 w-full max-w-md"
        >
          <div className="mb-8">
            <label htmlFor="name" className="block text-xl font-serif text-white mb-3">
              What's your name?
            </label>
            <input
              ref={inputRef}
              type="text"
              id="name"
              name="name"
              value={quizData.name}
              onChange={(e) => updateQuizData({ name: e.target.value })}
              placeholder="Enter your first name"
              className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-lg focus:ring-[#C5A267] focus:border-[#C5A267] text-white text-xl placeholder-white/40"
              autoComplete="off"
            />
            {formError && (
              <p className="text-[#ff9f9f] mt-2 animate-fadeIn">{formError}</p>
            )}
          </div>
          
          <div ref={buttonsRef} className="flex justify-between mt-10 gap-3">
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 bg-white/20 text-white text-lg rounded-md hover:bg-white/30 transition-colors duration-300 flex items-center gap-2 min-h-[52px]"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
            
            <button
              type="submit"
              className="px-8 py-3 bg-[#C5A267] text-white text-lg rounded-md hover:bg-[#B49157] transition-all duration-300 flex items-center gap-2 min-h-[52px] hover:shadow-lg"
            >
              Continue
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NameCaptureStep;