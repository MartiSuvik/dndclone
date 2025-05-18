import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';
import { QuizData, QuizImage } from './QuizTypes';
import QuizIntro from './QuizIntro';
import ImageSelectionStep from './ImageSelectionStep';
import RoomSelectionStep from './RoomSelectionStep';
import PriorityRoomStep from './PriorityRoomStep';
import NameCaptureStep from './NameCaptureStep';
import EmailCaptureStep from './EmailCaptureStep';
import ProcessingStep from './ProcessingStep';
import ResultsStep from './ResultsStep';
import { allRoomImages } from '../../data/quizRoomImages'; // Import our new room images

interface QuizContainerProps {
  quizImages: QuizImage[];
  triggerFooterContact: () => void;
}

const QuizContainer: React.FC<QuizContainerProps> = ({ quizImages, triggerFooterContact }) => {
  // State for quiz
  const [quizStep, setQuizStep] = useState(0); // 0 = not started, 1-7 = steps
  const [availableImages, setAvailableImages] = useState<QuizImage[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const quizModalRef = useRef<HTMLDivElement>(null); // Renamed from quizWrapperRef for clarity
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { ref: quizRef, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  
  // Initialize quiz data
  const [quizData, setQuizData] = useState<QuizData>({
    selectedImages: [],
    selectedRooms: [],
    priorityRoom: '',
    name: '',
    email: '',
    results: {
      mainStyle: '',
      subStyles: [],
      recommendedImages: []
    }
  });

  // Function to get random images per room for Step 1
  const getRandomImagesPerRoom = (): QuizImage[] => {
    // Directly use images from the imported room JSONs
    if (!allRoomImages || allRoomImages.length === 0) {
      console.warn(
        'QuizContainer: allRoomImages from quizRoomImages.ts is not available or is empty. ' +
        'Step 1 of the quiz will have no images. Ensure JSON files are correctly loaded.'
      );
      return [];
    }
    return allRoomImages;
  };

  // Initialize quiz images when starting the quiz
  useEffect(() => {
    if (quizStep === 1 && availableImages.length === 0) {
      setAvailableImages(getRandomImagesPerRoom());
    }
  }, [quizStep, availableImages.length]); // Removed quizImages from dependency array as getRandomImagesPerRoom no longer uses it

  // Add fullscreen effect when quiz starts
  useEffect(() => {
    if (quizStep > 0) {
      setIsFullscreen(true);
      document.body.style.overflow = 'hidden';
      // Ensure the modal is scrolled to its top
      if (quizModalRef.current) {
        requestAnimationFrame(() => {
          if (quizModalRef.current) { // Re-check current in case component unmounted
            quizModalRef.current.scrollTop = 0;
          }
        });
      }
    } else {
      setIsFullscreen(false);
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [quizStep]);

  // Fade in animation for quiz container
  useEffect(() => {
    if (inView && containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      );
    }
  }, [inView]);
  
  // Fallback results calculator (unused now that webhook handles results)
  // This is kept for reference but the webhook response processing in EmailCaptureStep is now the source of truth
  const _calculateResultsLegacy = () => {
    console.warn("Legacy results calculation called - this should not be used anymore");
    setTimeout(() => {
      const results = processQuizData(quizData);
      setQuizData(prev => ({
        ...prev,
        results
      }));
      setQuizStep(7); // Show results page
    }, 2500);
  };

  // Process the quiz data to determine style preferences
  const processQuizData = (data: QuizData) => {
    // Count styles from selected images
    const styleCounts: Record<string, number> = {};
    
    data.selectedImages.forEach(img => {
      // Extract style information from image
      let style = '';
      
      if (img.style) {
        style = img.style; // Use explicit style if available
      } else if (img.room === 'Kitchen' && img.title.includes('Modern')) {
        style = 'Modern';
      } else if (img.room === 'Kitchen' && img.title.includes('Traditional')) {
        style = 'Traditional';
      } else if (img.room === 'Kitchen' && img.title.includes('Art_Deco')) {
        style = 'Art Deco';
      } else if (img.room === 'Furniture' && img.title.includes('Living')) {
        style = 'Contemporary';
      } else if (img.room === 'Furniture' && img.title.includes('Dining')) {
        style = 'Elegant';
      } else if (img.room === 'Furniture' && img.title.includes('Bedroom')) {
        style = 'Luxurious';
      } else if (img.room === 'Bath') {
        style = 'Spa-Inspired';
      } else if (img.room === 'Office') {
        style = 'Professional';
      } else if (img.room === 'Outdoor') {
        style = 'Natural';
      } else {
        // Default style based on room
        style = img.room === 'Kitchen' ? 'Modern' : 
                img.room === 'Furniture' ? 'Contemporary' : 
                'Eclectic';
      }
      
      // Increment the style count
      styleCounts[style] = (styleCounts[style] || 0) + 1;
    });
    
    // Determine main style and substyles
    const sortedStyles = Object.entries(styleCounts)
      .sort((a, b) => b[1] - a[1]);
    
    const mainStyle = sortedStyles.length > 0 ? sortedStyles[0][0] : 'Contemporary';
    
    // Get 2-3 substyles (excluding main style)
    const subStyles = sortedStyles
      .slice(1, Math.min(4, sortedStyles.length))
      .map(entry => entry[0]);
    
    // Find recommendations based on style preferences
    const recommendedImages = quizImages
      .filter(img => {
        // Match by style or similar room type to priority
        if (img.style === mainStyle) return true;
        if (img.room === data.priorityRoom) return true;
        if (subStyles.some(style => img.style === style)) return true;
        return false;
      })
      .slice(0, 6); // Limit to 6 images
    
    return {
      mainStyle,
      subStyles,
      recommendedImages
    };
  };

  // Update quiz data
  const updateQuizData = (newData: Partial<QuizData>) => {
    setQuizData(prevData => ({
      ...prevData,
      ...newData
    }));
  };

  // Close quiz function to expose if needed
  const closeQuiz = () => {
    resetQuiz();
  };

  // Navigation helpers
  const nextStep = () => setQuizStep(prev => prev + 1);
  const prevStep = () => setQuizStep(prev => prev - 1);
  
  // Reset quiz
  const resetQuiz = () => {
    setQuizStep(0);
    setQuizData({
      selectedImages: [],
      selectedRooms: [],
      priorityRoom: '',
      name: '',
      email: '',
      results: {
        mainStyle: '',
        subStyles: [],
        recommendedImages: []
      }
    });
    setAvailableImages([]);
  };

  // Render different quiz steps
  const renderQuizStep = () => {
    switch (quizStep) {
      case 0:
        return <QuizIntro startQuiz={() => setQuizStep(1)} />; // This case will be handled by quizIntroComponent directly
      case 1:
        return (
          <ImageSelectionStep 
            quizData={quizData}
            updateQuizData={updateQuizData}
            nextStep={nextStep}
            prevStep={resetQuiz}
            availableImages={availableImages}
          />
        );
      case 2:
        return (
          <RoomSelectionStep
            quizData={quizData}
            updateQuizData={updateQuizData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <PriorityRoomStep
            quizData={quizData}
            updateQuizData={updateQuizData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <NameCaptureStep
            quizData={quizData}
            updateQuizData={updateQuizData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 5:
        return (
          <EmailCaptureStep
            quizData={quizData}
            updateQuizData={updateQuizData}
            nextStep={nextStep} // Let EmailCaptureStep handle the next step directly
            prevStep={prevStep}
          />
        );
      case 6:
        return <ProcessingStep />;
      case 7:
        return (
          <ResultsStep
            quizData={quizData}
            updateQuizData={updateQuizData}
            nextStep={resetQuiz}
            prevStep={() => {}}
            triggerFooterContact={() => {
              triggerFooterContact();
              closeQuiz(); // Ensure the quiz closes when consultation is booked
            }}
          />
        );
      default:
        return null;
    }
  };

  const quizIntroComponent = <QuizIntro startQuiz={() => setQuizStep(1)} />;

  const quizStepsModalComponent = (
    <div
      ref={quizModalRef}
      className="fixed inset-0 z-[100] bg-black/90 overflow-auto flex items-start justify-center py-8 px-4 sm:py-12 md:py-16"
      // Transitions for opacity/scale can be applied to the inner div if desired
    >
      <div
        className="bg-transparent max-w-5xl w-full mx-auto my-auto pt-4 sm:pt-6" 
        // Individual quiz step components should manage their own backgrounds and appearance.
        // Example: ImageSelectionStep uses `bg-white/10 backdrop-blur-md`.
        // Add transition classes here if needed e.g. "transition-opacity duration-500 ease-in-out opacity-100"
      >
        {renderQuizStep()} {/* This will render steps 1 through 7 based on current quizStep */}
      </div>
    </div>
  );

  return (
    <div 
      ref={containerRef} 
      className="quiz-section py-16 sm:py-24"
      id="style-quiz"
    >
      <div ref={quizRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Render QuizIntro directly in the page flow when quiz is not active */}
        {quizStep === 0 && !isFullscreen && quizIntroComponent}
        
        {/* Render the quiz steps modal using a portal when quiz is active and fullscreen */}
        {isFullscreen && quizStep > 0 && typeof document !== 'undefined' &&
          ReactDOM.createPortal(quizStepsModalComponent, document.body)}
      </div>
    </div>
  );
};

export default QuizContainer;