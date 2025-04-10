import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const brandPartners = [
  {
    id: 1,
    name: "VISIONNAIRE",
    logo: "https://res.cloudinary.com/designcenter/image/upload/t_crop/Visionnaire_Logo_Brand.svg",
    website: "https://www.visionnaire-home.com",
    description: "One-of-a-kind design to respond to the desires of its clients.",
  },
  {
    id: 2,
    name: "ASTER",
    logo: "https://res.cloudinary.com/designcenter/image/upload/t_crop/Aster_Logo.svg",
    website: "https://www.astercucine.it/en/",
    description: "Because our kitchens live with us every day of our life.",
  },
  {
    id: 3,
    name: "LONGHI",
    logo: "https://res.cloudinary.com/designcenter/image/upload/t_crop/Longhi_Logo.svg",
    website: "https://www.longhi.it/en-us",
    description: "50 Years of Authentic “Made in Italy”.",
  },
  {
    id: 4,
    name: "PRESTIGE",
    logo: "https://res.cloudinary.com/designcenter/image/upload/Prestige_Logo.svg",
    website: "https://www.prestigemobili.com/en/",
    description: "1989, born in the land of classic.",
  }
];

const VisionnaireShowcase = () => {
  const [, setIsMobile] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  const brandCarouselRef = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused] = useState(false);

  // Use two copies for a seamless loop
  const extendedBrandPartners = [...brandPartners, ...brandPartners];

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Animate header, content, button, and carousel entrance (unchanged)
  useEffect(() => {
    if (!inView || !headerRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      headerRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "power2.out" }
      );
    }

    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: "power2.out" }
      );
    }

    if (brandCarouselRef.current) {
      gsap.fromTo(
        brandCarouselRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.9, ease: "power2.out" }
      );
    }
  }, [inView]);

  // Animate the carousel continuously with a seamless loop
  useEffect(() => {
    if (carouselRef.current && !isPaused) {
      const carousel = carouselRef.current;
      // With two copies, one copy's width is half of the scrollWidth.
      const oneSetWidth = carousel.scrollWidth / 2;

      gsap.to(carousel, {
        x: -oneSetWidth,
        ease: "linear",
        duration: 30, // Adjust duration to control speed
        repeat: -1,
        modifiers: {
          // Wrap the transform so it seamlessly loops
          x: (x) => {
            return parseFloat(x) % oneSetWidth + "px";
          },
        },
      });
    }
  }, [isPaused]);

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={brandCarouselRef} className="mt-24 mb-16">
          <h3 className="text-2xl sm:text-5xl font-serif text-black text-center mb-8">
            OUR LUXURY BRAND PARTNERS
          </h3>
          <div className="relative overflow-hidden py-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-24 before:z-10 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:right-0 after:top-0 after:bottom-0 after:w-24 after:z-10 after:bg-gradient-to-l after:from-white after:to-transparent">
            <div ref={carouselRef} className="flex items-center gap-16">
              {extendedBrandPartners.map((brand, index) => (
                <div
                  key={`${brand.id}-${index}`}
                  className="flex flex-col items-center gap-4 flex-shrink-0"
                >
                  <div className="h-60 sm:h-40 md:h-80 w-64 sm:w-80 md:w-96 relative flex items-center justify-center p-4">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-center text-sm text-gray-600 max-w-xs">{brand.description}</p>
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-white border border-[#C5A267] text-[#C5A267] text-sm font-medium hover:bg-[#C5A267] hover:text-white transition-colors duration-300 rounded-sm min-w-[140px] text-center"
                    aria-label={`Visit ${brand.name} website`}
                  >
                    View Brand
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionnaireShowcase;