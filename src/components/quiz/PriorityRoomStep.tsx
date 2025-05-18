import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronLeft } from 'lucide-react';
import { StepProps } from './QuizTypes';

// Room icons - we'll use the same as RoomSelectionStep
const roomIcons: Record<string, string> = {
  'Living Room': 'https://res.cloudinary.com/designcenter/image/upload/Luxury%20Living%20Room%20Design%20%E2%80%93%20Custom%20Sofas%20and%20Decor%20NYC.avif',
  'Kitchen': 'https://res.cloudinary.com/designcenter/image/upload/Luxury%20Kitchen%20Interiors%20%E2%80%93%20Custom%20Cabinetry%20and%20Marble%20Finishes.avif',
  'Dining Room': 'https://res.cloudinary.com/designcenter/image/upload/Luxury%20Dining%20Room%20Furniture%20%E2%80%93%20Custom%20Tables%20and%20Seating.avif',
  'Bedroom': 'https://res.cloudinary.com/designcenter/image/upload/Custom%20Luxury%20Bedroom%20Design%20%E2%80%93%20High-End%20Interiors%20NYC.avif',
  'Office': 'https://res.cloudinary.com/designcenter/image/upload/Bespoke%20Office%20Furniture%20%E2%80%93%20Luxury%20Workspaces%20NYC.avif',
  'Bathroom': 'https://res.cloudinary.com/designcenter/image/upload/Luxury%20Bathroom%20Design%20%E2%80%93%20Bespoke%20Vanities%20and%20Interiors.avif',
  'Outdoor': 'https://res.cloudinary.com/designcenter/image/upload/Luxury%20Outdoor%20Furniture%20%E2%80%93%20Custom%20Patio%20and%20Terrace%20Designs.avif'
};

const PriorityRoomStep: React.FC<StepProps> = ({ 
  quizData, 
  updateQuizData, 
  nextStep, 
  prevStep 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const backBtnRef = useRef<HTMLButtonElement>(null);
  const [, setElementsReady] = React.useState(false);

  // Set priority room and move to next step
  const selectPriorityRoom = (room: string) => {
    updateQuizData({ priorityRoom: room });
    nextStep();
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
      [titleRef.current, descRef.current],
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 }
    ).fromTo(
      gridRef.current?.children || [],
      { opacity: 0, scale: 0.8, y: 40 },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        duration: 0.7, 
        stagger: 0.08,
        ease: "back.out(1.4)"
      },
      "-=0.4"
    ).fromTo(
      backBtnRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5 },
      "<" // Animate button at the same time as grid items
    );
    
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="flex flex-col items-center justify-center h-full w-full max-w-5xl mx-auto pt-6 sm:pt-8 px-2 sm:px-4"
    >
      <div className="text-center mb-12 w-full max-w-3xl">
        <h2 
          ref={titleRef}
          className="opacity-0 text-4xl lg:text-5xl font-serif mb-6 text-white"
        >
          Which room should we focus on first?
        </h2>
        
        <p 
          ref={descRef}
          className="opacity-0 text-xl text-white/80 font-light"
        >
          This will be our starting point for your design journey.
        </p>
      </div>
      
      <div 
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
      >
        {quizData.selectedRooms.map(room => (
          <div 
            key={room}
            onClick={() => selectPriorityRoom(room)}
            className="opacity-0 relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-2xl group"
          >
            <div className="aspect-[3/4]">
              <img 
                src={roomIcons[room]} 
                alt={room} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:opacity-70 transition-opacity duration-500"></div>
            </div>
            
            <div className="absolute inset-x-0 bottom-0 p-6 text-white text-center transform transition-transform duration-500 group-hover:translate-y-[-10px]">
              <div className="w-12 h-12 bg-[#C5A267]/80 backdrop-blur-sm rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                <span className="text-xl font-semibold">#1</span>
              </div>
              <h3 className="text-2xl font-serif mb-2">{room}</h3>
              <p className="text-white/80 font-light">Make this my priority</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12">
        <button
          ref={backBtnRef}
          onClick={prevStep}
          className="opacity-0 px-6 py-3 bg-white/20 backdrop-blur-sm text-white text-lg rounded-md hover:bg-white/30 transition-colors duration-300 flex items-center gap-2 min-h-[52px]"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
      </div>
    </div>
  );
};

export default PriorityRoomStep;