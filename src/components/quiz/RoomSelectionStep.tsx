import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { StepProps } from './QuizTypes';

// Room icons - we'll use room names as placeholder
const roomIcons: Record<string, string> = {
  'Living Room': 'https://res.cloudinary.com/designcenter/image/upload/Luxury%20Living%20Room%20Design%20%E2%80%93%20Custom%20Sofas%20and%20Decor%20NYC.avif',
  'Kitchen': 'https://res.cloudinary.com/designcenter/image/upload/Luxury%20Kitchen%20Interiors%20%E2%80%93%20Custom%20Cabinetry%20and%20Marble%20Finishes.avif',
  'Dining Room': 'https://res.cloudinary.com/designcenter/image/upload/Luxury%20Dining%20Room%20Furniture%20%E2%80%93%20Custom%20Tables%20and%20Seating.avif',
  'Bedroom': 'https://res.cloudinary.com/designcenter/image/upload/Custom%20Luxury%20Bedroom%20Design%20%E2%80%93%20High-End%20Interiors%20NYC.avif',
  'Office': 'https://res.cloudinary.com/designcenter/image/upload/Bespoke%20Office%20Furniture%20%E2%80%93%20Luxury%20Workspaces%20NYC.avif',
  'Bathroom': 'https://res.cloudinary.com/designcenter/image/upload/Luxury%20Bathroom%20Design%20%E2%80%93%20Bespoke%20Vanities%20and%20Interiors.avif',
  'Outdoor': 'https://res.cloudinary.com/designcenter/image/upload/Luxury%20Outdoor%20Furniture%20%E2%80%93%20Custom%20Patio%20and%20Terrace%20Designs.avif'
};

const RoomSelectionStep: React.FC<StepProps> = ({ 
  quizData, 
  updateQuizData, 
  nextStep, 
  prevStep 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [, setElementsReady] = React.useState(false);

  // Toggle room selection
  const toggleRoomSelection = (room: string) => {
    const isSelected = quizData.selectedRooms.includes(room);
    
    if (isSelected) {
      updateQuizData({
        selectedRooms: quizData.selectedRooms.filter(r => r !== room)
      });
    } else {
      updateQuizData({
        selectedRooms: [...quizData.selectedRooms, room]
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
      [titleRef.current, descRef.current],
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 }
    ).fromTo(
      gridRef.current?.children || [],
      { opacity: 0, scale: 0.95, y: 20 },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        duration: 0.6, 
        stagger: 0.07,
        ease: "back.out(1.2)"
      },
      "-=0.4"
    ).fromTo(
      buttonsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "<" // Start animating buttons at the same time as grid items
    );
    
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-16 items-start h-full px-2 sm:px-4 lg:px-0 pt-2 sm:pt-4"
    >
      {/* Left side - Text content */}
      <div className="bg-white/10 backdrop-blur-md p-5 sm:p-6 lg:p-8 xl:p-10 rounded-xl text-white">
        <h2 
          ref={titleRef}
          className="opacity-0 text-2xl sm:text-3xl lg:text-4xl font-serif mb-4 lg:mb-6"
        >
          Which rooms are on your "It needs a little something" list?
        </h2>
        
        <p 
          ref={descRef}
          className="opacity-0 text-lg sm:text-xl text-white/80 mb-4 lg:mb-6 font-light"
        >
          Select all the spaces in your home that you'd like to transform. Each room has unique design considerations that we'll incorporate into your personalized recommendations.
        </p>
        
        <div className="space-y-3 mt-6 lg:mt-8">
          <h3 className="text-xl sm:text-2xl font-serif">Selection Tips</h3>
          <ul className="space-y-2 sm:space-y-3 text-white/90 text-sm sm:text-base">
            <li className="flex items-start gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#C5A267] flex-shrink-0 mt-1"></div>
              <p>Choose all rooms you're interested in improving</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#C5A267] flex-shrink-0 mt-1"></div>
              <p>Consider both immediate and future design projects</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#C5A267] flex-shrink-0 mt-1"></div>
              <p>Think about spaces that feel incomplete or outdated</p>
            </li>
          </ul>
        </div>
        
        <div ref={buttonsRef} className="opacity-0 mt-6 lg:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-between">
          <button
            onClick={prevStep}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-white/20 backdrop-blur-sm text-white text-base sm:text-lg rounded-md hover:bg-white/30 transition-colors duration-300 flex items-center justify-center sm:justify-start gap-2 min-h-[44px] sm:min-h-[52px] w-full sm:w-auto"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          
          <button
            onClick={nextStep}
            className={`px-4 sm:px-8 py-2 sm:py-3 bg-[#C5A267] text-white text-base sm:text-lg rounded-md hover:bg-[#B49157] transition-colors duration-300 flex items-center justify-center sm:justify-start gap-2 min-h-[44px] sm:min-h-[52px] w-full sm:w-auto ${
              quizData.selectedRooms.length === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
            }`}
            disabled={quizData.selectedRooms.length === 0}
          >
            Continue
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Right side - Room selection */}
      <div 
        ref={gridRef}
        className="grid grid-cols-2 gap-4 md:gap-6 px-2 sm:px-0"
      >
        {Object.keys(roomIcons).map(room => (
          <div 
            key={room}
            onClick={() => toggleRoomSelection(room)}
            className={`opacity-0 relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 transform hover:scale-[1.03] hover:shadow-xl m-1 ${
              quizData.selectedRooms.includes(room)
                ? 'ring-4 ring-[#C5A267] shadow-lg scale-[1.02]' 
                : 'shadow-md'
            }`}
          >
            <div className="aspect-[4/3] sm:aspect-video">
              <img 
                src={roomIcons[room]} 
                alt={room} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            </div>
            
            {quizData.selectedRooms.includes(room) && (
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-[#C5A267] text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-lg z-10 animate-fadeIn">
                <Check className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
              <h3 className="text-lg sm:text-xl md:text-2xl font-serif">{room}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomSelectionStep;