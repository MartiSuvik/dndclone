import { useRef, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import galleryData from '../data/product-galleries/index';
import QuizContainer from '../components/quiz/QuizContainer';
import '../components/quiz/QuizStyles.css';

gsap.registerPlugin(ScrollTrigger);

// Filter out unwanted room types and prepare images for the quiz
const quizImages = galleryData
  .filter(item => 
    item.room !== 'Light' && 
    item.room !== 'Closet' &&
    item.room !== 'Outdoor' && 
    item.room !== 'Office'
  )
  .map(item => ({ 
    id: item.id, 
    title: item.title, 
    url: item.image, 
    room: item.room, 
    style: item.style || '' 
  }));

const CraftedCalm = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);
  const quizSectionRef = useRef<HTMLElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null); // Added for benefits section
  
  // State variables
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Intersection observers for animations
  const { inView: featuresInView } = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });

  // Video loading and playing logic
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleCanPlayThrough = () => {
        setVideoLoaded(true);
      };

      const playVideo = () => {
        if (video) {
          video.play().catch((error) => {
            console.log("Autoplay prevented:", error);
          });
        }
      };

      video.addEventListener('canplaythrough', handleCanPlayThrough);
      document.addEventListener("click", playVideo, { once: true });

      return () => {
        video.removeEventListener('canplaythrough', handleCanPlayThrough);
        document.removeEventListener("click", playVideo);
      };
    }
  }, []);

  // GSAP animations for hero section
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.5 });

    if (videoLoaded) {
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 }
      ).fromTo(
        [headlineRef.current, subheadRef.current, ctaButtonRef.current],
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.3,
          ease: "power2.out" 
        },
        "-=0.5"
      );
    }

    return () => {
      tl.kill();
    };
  }, [videoLoaded]);

  // GSAP animations for features section
  useEffect(() => {
    if (!featuresInView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const featureItems = document.querySelectorAll('.feature-item');
    
    gsap.fromTo(
      featureItems,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.2, 
        duration: 0.8,
        ease: "power2.out"
      }
    );
  }, [featuresInView]);

  // Scroll to quiz section

  // Trigger footer contact form
  const triggerFooterContact = () => {
    const footerElement = document.querySelector('#footer');
    if (footerElement instanceof HTMLElement) {
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      window.scrollTo({
        top: scrollHeight - windowHeight,
        behavior: 'smooth',
      });
      setTimeout(() => {
        const footerContactBtn = document.querySelector(
          '[data-footer-contact]'
        ) as HTMLButtonElement;
        if (footerContactBtn) {
          footerContactBtn.click();
        }
      }, 800);
    }
  };

  return (
    <div className="relative min-h-screen bg-white">
      <Helmet>
        <title>Come Home to Crafted Calm | D&D Design Center</title>
        <meta name="description" content="Step into a sanctuary designed for your life—effortlessly. Book your private preview with D&D Design Center today." />
        <link rel="canonical" href="https://dnddesigncenter.com/crafted-calm" />
      </Helmet>

      {/* Hero Section */}
      <section 
        className="relative h-screen overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('https://download.cattelanitalia.com/multimedia/ld/7a204c94-54c5-480e-8a75-6f7c010cdd2c.jpg?t=1691588886')" }}
      >
        <div className="absolute inset-0 w-full h-full">
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 sm:px-6">
          <h1 
            ref={headlineRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif mb-6 sm:mb-8 tracking-wide"
          >
            COME HOME to CRAFTED CALM
          </h1>
          <p 
            ref={subheadRef}
            className="text-1xl sm:text-2xl md:text-2xl font-light mb-10 sm:mb-12 max-w-4xl tracking-wide"
          >
            Step into a sanctuary designed for your life - effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              ref={ctaButtonRef}
              onClick={triggerFooterContact}
              className="bg-[#C5A267] hover:bg-[#B49157] text-white px-10 py-5 text-xl font-medium transition-colors duration-300 flex items-center justify-center gap-3 min-h-[52px] tracking-wide shadow-lg hover:shadow-xl"
            >
              Skip to Consultation
              <ArrowRight className="w-6 h-6" />
            </button>
            <button
              onClick={() => quizSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-transparent hover:bg-white/20 border border-white text-white px-10 py-5 text-xl font-medium transition-colors duration-300 flex items-center justify-center gap-3 min-h-[52px] tracking-wide shadow-lg hover:shadow-xl"
            >
              Start with Quiz
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 sm:py-28 bg-gradient-to-br from-[#C5A267] via-[#606061] to-[#222]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          {/* Right side: Benefits */}
          <div 
            ref={benefitsRef}
            className="bg-white/10 backdrop-blur-sm p-10 rounded-xl shadow-xl border border-white/20"
          >
            <h3 className="text-3xl mb-10 text-white font-bold text-center tracking-wide">
              Why take the quiz consultation?
            </h3>
            <ul className="flex flex-col gap-7">
              {/* Benefit 1 */}
              <li className="flex flex-col sm:flex-row sm:items-start gap-4 bg-white/5 rounded-lg p-5 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-[#C5A267] rounded-full flex items-center justify-center shadow-md border-4 border-white/20 mx-auto sm:mx-0 mb-2 sm:mb-0">
                  <span className="text-white font-bold text-2xl">1</span>
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-lg sm:text-xl font-serif text-white font-semibold mb-1 leading-snug tracking-wide">Discover your style</h4>
                  <p className="text-white/80 text-base sm:text-lg leading-relaxed">Understand your design preferences in just a few minutes with our intelligent algorithm</p>
                </div>
              </li>
              {/* Benefit 2 */}
              <li className="flex flex-col sm:flex-row sm:items-start gap-4 bg-white/5 rounded-lg p-5 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-[#C5A267] rounded-full flex items-center justify-center shadow-md border-4 border-white/20 mx-auto sm:mx-0 mb-2 sm:mb-0">
                  <span className="text-white font-bold text-2xl">2</span>
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-lg sm:text-xl font-serif text-white font-semibold mb-1 leading-snug tracking-wide">Expert recommendation</h4>
                  <p className="text-white/80 text-base sm:text-lg leading-relaxed">Receive custom design suggestions tailored to your unique taste and lifestyle</p>
                </div>
              </li>
              {/* Benefit 3 */}
              <li className="flex flex-col sm:flex-row sm:items-start gap-4 bg-white/5 rounded-lg p-5 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-[#C5A267] rounded-full flex items-center justify-center shadow-md border-4 border-white/20 mx-auto sm:mx-0 mb-2 sm:mb-0">
                  <span className="text-white font-bold text-2xl">3</span>
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-lg sm:text-xl font-serif text-white font-semibold mb-1 leading-snug tracking-wide">Visualize possibilities</h4>
                  <p className="text-white/80 text-base sm:text-lg leading-relaxed">See how different styles would transform your specific spaces and rooms</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section
        ref={quizSectionRef}
        id="quiz-section"
        className="relative z-20 bg-white"
      >
        <QuizContainer quizImages={quizImages} triggerFooterContact={triggerFooterContact} />
      </section>
    </div>
  );
};

export default CraftedCalm;