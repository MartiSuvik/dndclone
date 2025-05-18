import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronRight, Check, ChevronLeft } from 'lucide-react';
import { StepProps } from './QuizTypes';

const ImageSelectionStep: React.FC<StepProps> = ({ 
  quizData, 
  updateQuizData, 
  nextStep, 
  prevStep,
  availableImages = [] 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [, setElementsReady] = React.useState(false);

  // Toggle image selection
  const toggleImageSelection = (image: any) => {
    const isSelected = quizData.selectedImages.some(img => img.id === image.id);
    
    if (isSelected) {
      updateQuizData({
        selectedImages: quizData.selectedImages.filter(img => img.id !== image.id)
      });
    } else {
      updateQuizData({
        selectedImages: [...quizData.selectedImages, image]
      });
    }
  };

  // Animations
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setElementsReady(true);
      return;
    }
    
    const tl = gsap.timeline({ 
      defaults: { ease: "power3.out" },
      onComplete: () => setElementsReady(true)
    });
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8 }
    ).fromTo(
      gridRef.current?.children || [],
      { opacity: 0, scale: 0.9 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.6, 
        stagger: 0.05,
        ease: "back.out(1.2)"
      },
      "-=0.4"
    ).fromTo(
      buttonsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "<" // Animate buttons at the same time as images
    );
    
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full max-w-full lg:max-w-none mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-start h-full px-0 sm:px-2 md:px-4 lg:px-0"
    >
      {/* Left side - Text content */}
      <div className="bg-white/10 backdrop-blur-md p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl text-white w-full max-w-full lg:max-w-none">
        <h2 
          ref={titleRef}
          className="opacity-0 text-2xl sm:text-3xl lg:text-4xl font-serif mb-4 sm:mb-6"
        >
          Select the rooms that make you swoon
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-white/80 mb-4 sm:mb-6 font-light">
          Click on any images that resonate with your style vision. These selections will help us understand your aesthetic preferences.
        </p>
        <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-8">
          <h3 className="text-lg sm:text-2xl font-serif">Style Tips</h3>
          <ul className="space-y-2 sm:space-y-3 text-white/90 text-sm sm:text-base">
            <li className="flex items-start gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#C5A267] flex-shrink-0 mt-1"></div>
              <p>Trust your instincts—first impressions matter in design</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#C5A267] flex-shrink-0 mt-1"></div>
              <p>Focus on the overall feel rather than specific pieces</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#C5A267] flex-shrink-0 mt-1"></div>
              <p>Select as many images as you like for better results</p>
            </li>
          </ul>
        </div>
        <div ref={buttonsRef} className="opacity-0 mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between w-full">
          <button
            onClick={prevStep}
            className="w-full sm:w-auto px-6 py-3 bg-white/20 backdrop-blur-sm text-white text-lg rounded-md hover:bg-white/30 transition-colors duration-300 flex items-center gap-2 min-h-[48px] sm:min-h-[52px]"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <button
            onClick={nextStep}
            className={`w-full sm:w-auto px-8 py-3 bg-[#C5A267] text-white text-lg rounded-md hover:bg-[#B49157] transition-colors duration-300 flex items-center gap-2 min-h-[48px] sm:min-h-[52px] ${
              quizData.selectedImages.length === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
            }`}
            disabled={quizData.selectedImages.length === 0}
          >
            Continue
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* Right side - Image carousel for mobile, grid for desktop */}
      {/* Mobile carousel */}
      <div className="block lg:hidden w-full max-w-full overflow-x-auto pb-4 pt-4 pl-3"> {/* Added pl-3 for extra left space */}
        <div className="flex gap-4 snap-x snap-mandatory overflow-x-auto px-1">
          {availableImages.map(image => (
            <div
              key={image.id}
              onClick={() => toggleImageSelection(image)}
              className={`snap-center shrink-0 w-56 sm:w-64 aspect-[16/9] relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 transform hover:scale-[1.03] hover:shadow-2xl ${
                quizData.selectedImages.some(img => img.id === image.id)
                  ? 'ring-4 ring-[#C5A267] shadow-lg scale-[1.02]' 
                  : 'shadow-md'
              }`}
              style={{ minWidth: '220px', maxWidth: '90vw', marginTop: 8, marginBottom: 8 }} // 8px top/bottom margin for border visibility
            >
              <div className="aspect-[16/9]">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70"></div>
              </div>
              {quizData.selectedImages.some(img => img.id === image.id) && (
                <div className="absolute top-3 right-3 bg-[#C5A267] text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg z-10">
                  <Check className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Desktop grid */}
      <div 
        ref={gridRef}
        className="hidden lg:grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto pr-4 pl-2 custom-scrollbar pt-4 pb-4"
      >
        {availableImages.map(image => (
          <div 
            key={image.id}
            onClick={() => toggleImageSelection(image)}
            className={`opacity-0 relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 transform hover:scale-[1.03] hover:shadow-2xl ${
              quizData.selectedImages.some(img => img.id === image.id)
                ? 'ring-4 ring-[#C5A267] shadow-lg scale-[1.02]' 
                : 'shadow-md'
            }`}
            style={{ marginTop: 8, marginBottom: 8 }} // 8px top/bottom margin for border visibility
          >
            <div className="aspect-[16/9]">
              <img 
                src={image.url} 
                alt={image.title} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70"></div>
            </div>
            {quizData.selectedImages.some(img => img.id === image.id) && (
              <div className="absolute top-3 right-3 bg-[#C5A267] text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg z-10">
                <Check className="w-5 h-5" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSelectionStep;