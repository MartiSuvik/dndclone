import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight, Lock, Shield, Mail } from 'lucide-react';
import { StepProps } from './QuizTypes';

const EmailCaptureStep: React.FC<StepProps> = ({ 
  quizData, 
  updateQuizData, 
  nextStep, 
  prevStep 
}) => {
  const [formError, setFormError] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const securityRef = useRef<HTMLDivElement>(null);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quizData.email.trim() === '') {
      setFormError('Please enter your email address');
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(quizData.email)) {
      setFormError('Please enter a valid email address');
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
      greetingRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8 }
    ).fromTo(
      titleRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.5"
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
    ).fromTo(
      securityRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
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
        <div 
          ref={greetingRef}
          className="bg-[#C5A267] rounded-full w-fit mx-auto px-8 py-3 mb-6 shadow-lg"
        >
          <span className="text-2xl">Hello, {quizData.name}! 👋</span>
        </div>
        
        <h2 
          ref={titleRef}
          className="text-3xl lg:text-4xl font-serif mb-8 text-center"
        >
          You're almost there!
        </h2>
        
        <p className="text-xl text-white/80 mb-10 font-light text-center">
          We're ready to analyze your style preferences and create your personalized design profile.
        </p>
        
        <div className="space-y-6 mt-8 bg-black/20 p-6 rounded-xl">
          <h3 className="text-2xl font-serif mb-4">What happens next?</h3>
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#C5A267] flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                <span className="text-white font-bold">1</span>
              </div>
              <p className="text-lg">
                We'll analyze your selections to determine your unique style profile
              </p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#C5A267] flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                <span className="text-white font-bold">2</span>
              </div>
              <p className="text-lg">
                You'll receive personalized design recommendations for your {quizData.priorityRoom}
              </p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#C5A267] flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                <span className="text-white font-bold">3</span>
              </div>
              <p className="text-lg">
                We'll suggest complementary styles and elements for a cohesive look
              </p>
            </li>
          </ol>
        </div>
      </div>
      
      {/* Right side - Form */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md">
          <form 
            ref={formRef}
            onSubmit={handleSubmit} 
            className="bg-white/5 backdrop-blur-md p-8 lg:p-10 rounded-xl border border-white/10 mb-6"
          >
            <div className="mb-8">
              <label htmlFor="email" className="block text-xl font-serif text-white mb-3">
                Enter your email to see your results
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" />
                <input
                  ref={inputRef}
                  type="email"
                  id="email"
                  name="email"
                  value={quizData.email}
                  onChange={(e) => updateQuizData({ email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="w-full pl-12 pr-6 py-4 bg-white/10 border border-white/20 rounded-lg focus:ring-[#C5A267] focus:border-[#C5A267] text-white text-xl placeholder-white/40"
                  autoComplete="off"
                />
              </div>
              {formError && (
                <p className="text-[#ff9f9f] mt-2 animate-fadeIn">{formError}</p>
              )}
            </div>
            
            <div ref={buttonsRef} className="flex justify-between gap-3">
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
                Get My Results
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </form>
          
          <div 
            ref={securityRef}
            className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 text-center text-white/70"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <Lock className="w-4 h-4 text-[#C5A267]" />
              <Shield className="w-4 h-4 text-[#C5A267]" />
            </div>
            <p className="text-sm">
              We respect your privacy. Your information is secure and will never be shared with third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailCaptureStep;