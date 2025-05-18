import { useRef, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Clock, ShieldCheck, Trophy } from 'lucide-react';
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
  
  // State variables
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Intersection observers for animations
  const { ref: featuresRef, inView: featuresInView } = useInView({
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

      {/* What You Get Section */}
      <section 
        ref={featuresRef} 
        className="py-20 sm:py-28 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-gray-900">
              What you receive
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            {/* Feature 1 */}
            <div className="feature-item text-center">
              <div
                className="inline-flex bg-[#606061] items-center justify-center w-20 h-20 rounded-full bg-cover bg-center ring-1 ring-black/10 shadow-lg mb-8"
              >
                <ShieldCheck className="w-10 h-10 text-[#C5A267] drop-shadow" />
              </div>
              <h3 className="text-2xl font-serif mb-4 text-gray-900">Master your style</h3>
              <p className="text-xl text-gray-600">Find your unique taste</p>
            </div>

            {/* Feature 2 */}
            <div className="feature-item text-center">
              <div
                className="inline-flex bg-[#606061] items-center justify-center w-20 h-20 rounded-full bg-cover bg-center ring-1 ring-black/10 shadow-lg mb-8"
              >
                <Trophy className="w-10 h-10 text-[#C5A267] drop-shadow-md" />
              </div>
              <h3 className="text-2xl font-serif mb-4 text-gray-900">Weekly forecasts</h3>
              <p className="text-xl text-gray-600">Learn tips of expert designers</p>
            </div>

            {/* Feature 3 */}
            <div className="feature-item text-center">
              <div
                className="inline-flex bg-[#606061] items-center justify-center w-20 h-20 rounded-full bg-cover bg-center ring-1 ring-black/10 shadow-lg mb-8"
              >
                <Clock className="w-10 h-10 text-[#C5A267] drop-shadow-md" />
              </div>
              <h3 className="text-2xl font-serif mb-4 text-gray-900">Better investing</h3>
              <p className="text-xl text-gray-600">Learn the secrets of design ROI</p>
            </div>
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