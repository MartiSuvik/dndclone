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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const securityRef = useRef<HTMLDivElement>(null);
  
  // Note: The generateFallbackResults function has been removed as it was never used.
  // Fallback handling is now done directly in the error catch block
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
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
    setIsSubmitting(true);
    
    try {
      // Send data to webhook and await the response from make.com
      const response = await fetch('https://hook.us2.make.com/ermb367digx13plsnpwsdmgx5dlm1dyy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quiz_data: quizData,
          submitted_at: new Date().toISOString(),
          source_page: window.location.href,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit quiz data');
      }
      
      // Parse the response from make.com
      const responseData = await response.json();
      console.log("Make.com response:", responseData); // Debugging

      try {
        console.log("Processing webhook response:", responseData);
        
        // Clear the existing results first to avoid any residual values
        const emptyResults = {
          mainStyle: '',
          title: '',
          description: '',
          subStyles: [],
          recommendedImages: []
        };
        
        // Handle possible array format issues - ensure we're working with an array
        let recommendedImagesArray = [];
        
        if (responseData.recommendedImages) {
          if (Array.isArray(responseData.recommendedImages)) {
            recommendedImagesArray = responseData.recommendedImages;
          } else {
            // If it's not an array, put the single object in an array
            recommendedImagesArray = [responseData.recommendedImages];
          }
          console.log("Processed recommendedImages:", recommendedImagesArray);
        }
        
        // Extract and sanitize the main style from the title
        let mainStyle = "Modern Sophisticate"; // Default
        if (responseData.title && typeof responseData.title === 'string') {
          const titleMatch = responseData.title.match(/is\s+(.*?)(\s+✨|$)/);
          if (titleMatch && titleMatch[1]) {
            mainStyle = titleMatch[1].trim();
          } else {
            // If no pattern match, just use the title without trying to parse it
            mainStyle = responseData.title;
          }
        }
        
        // Extract the data we need from the response, prioritizing webhook data
        const updatedResults = {
          ...emptyResults,
          mainStyle: mainStyle,
          title: responseData.title || `${mainStyle} Style`,
          description: responseData.description || `Your selections reveal a preference for ${mainStyle} design elements.`,
          subStyles: recommendedImagesArray.length > 0 
            ? [...new Set(recommendedImagesArray.map((img: any) => img.title || "").filter(Boolean))] as string[] // Remove duplicates and ensure it's a string array
            : ["Contemporary", "Modern", "Elegant"],
          recommendedImages: recommendedImagesArray.length > 0 
            ? recommendedImagesArray.map((img: any) => ({
                id: img.id ? String(img.id) : `ai-generated-${Math.random().toString(36).substring(7)}`,
                title: img.title || "Style Element",
                description: img.description || `This element complements your ${mainStyle} style beautifully.`,
                url: img.url || "",
                room: quizData.priorityRoom || "Living Room",
                style: img.title || "Complementary Style"
              }))
            : []
        };
        
        console.log("Final processed results from webhook:", updatedResults); // Detailed debugging
        
        // Ensure we have at least some result images if the API didn't return any
        if (updatedResults.recommendedImages.length === 0 && quizData.selectedImages.length > 0) {
          // Use some of the user's selected images as recommendations
          updatedResults.recommendedImages = quizData.selectedImages
            .slice(0, 3)
            .map(img => ({...img, description: `A perfect complement to your ${mainStyle} style.`}));
        }
        
        // Ensure we definitely have a title and description
        if (!updatedResults.title || updatedResults.title.trim() === '') {
          updatedResults.title = `${updatedResults.mainStyle} Style`;
        }
        
        if (!updatedResults.description || updatedResults.description.trim() === '') {
          updatedResults.description = `Your design preferences align with the ${updatedResults.mainStyle} style, which features elegant balance and thoughtful composition.`;
        }
        
        // Complete state update with the webhook results
        updateQuizData({
          results: updatedResults
        });
        
        console.log("Updated quiz state with results:", updatedResults);
        
        // Skip the processing step and go directly to the results after ensuring state is updated
        setTimeout(() => {
          // Log what we're about to show to ensure data is correct
          console.log("Proceeding to results with webhook data");
          
          // Go to processing step first
          nextStep();
          
          // Then to results step after a brief delay
          setTimeout(() => {
            nextStep(); // Go to results
          }, 1000);
        }, 500);
      } catch (processingError) {
        console.error("Error processing make.com response:", processingError);
        setFormError("We're having trouble processing your results. Please try again.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error sending quiz data:', error);
      
      // Provide a fallback mechanism if the webhook fails
      if (quizData.selectedImages.length > 0) {
        console.log("Webhook failed, generating fallback results from user selections");
        
        // Generate basic results from selected images as fallback
        const mainStyle = quizData.selectedImages.reduce((acc, img) => {
          const styleCount = acc[img.style] || 0;
          acc[img.style] = styleCount + 1;
          return acc;
        }, {} as Record<string, number>);
        
        // Find the most selected style
        let dominantStyle = '';
        let maxCount = 0;
        
        Object.entries(mainStyle).forEach(([style, count]) => {
          if (count > maxCount) {
            maxCount = count;
            dominantStyle = style;
          }
        });
        
        // If we have a dominant style, use it
        if (dominantStyle) {
          // Create fresh fallback results (don't use existing results)
          const fallbackResults = {
            mainStyle: dominantStyle,
            title: `${dominantStyle} Style`,
            description: `Your selections showed a strong preference for ${dominantStyle} design elements. This style is characterized by its distinctive aesthetic and approach to space.`,
            subStyles: Object.keys(mainStyle).filter(style => style !== dominantStyle).slice(0, 3),
            recommendedImages: quizData.selectedImages.filter(img => img.style === dominantStyle)
              .slice(0, 3)
              .map(img => ({
                ...img,
                description: `This ${img.style} design element complements your ${dominantStyle} style preference.`
              }))
          };
          
          console.log("Generated fallback results:", fallbackResults);
          
          // Update quiz data with our fallback results
          updateQuizData({
            results: fallbackResults
          });
          
          // Show a warning but still proceed
          setFormError("We had trouble connecting to our style analysis service, but we've generated results based on your selections.");
          
          // Continue to results with the fallback data
          setTimeout(() => {
            nextStep(); // Go to processing step
            setTimeout(() => {
              nextStep(); // Go to results step
            }, 1000);
          }, 300);
        } else {
          setFormError('Something went wrong with our style analysis. Please try again or contact support.');
        }
      } else {
        setFormError('Something went wrong. Please try again or contact our support team.');
      }
    } finally {
      setIsSubmitting(false);
    }
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
                <div className="flex items-center gap-3 border border-[#ff9f9f]/30 bg-[#ff9f9f]/10 rounded-md p-3 mt-3 animate-fadeIn">
                  <svg className="w-5 h-5 text-[#ff9f9f]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="text-[#ff9f9f] text-sm">{formError}</p>
                </div>
              )}
            </div>
            
            <div ref={buttonsRef} className="flex justify-between gap-3">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 bg-white/20 text-white text-lg rounded-md hover:bg-white/30 transition-colors duration-300 flex items-center gap-2 min-h-[52px]"
                disabled={isSubmitting}
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 bg-[#C5A267] text-white text-lg rounded-md hover:bg-[#B49157] transition-all duration-300 flex items-center gap-2 min-h-[52px] hover:shadow-lg ${
                  isSubmitting ? 'opacity-75 cursor-wait' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-pulse">{formError ? 'Generating Results...' : 'Analyzing Your Style...'}</span>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                  </>
                ) : (
                  <>
                    Get My Results
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
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