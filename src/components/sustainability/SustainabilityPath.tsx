import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';

gsap.registerPlugin(ScrollTrigger);

const SustainabilityPath: React.FC = () => {
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    if (!inView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );

      // Animate content sections
      gsap.fromTo(
        Array.from(contentRef.current?.children ?? []),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.3,
          ease: 'power3.out',
        }
      );

      // Animate images
      imageRefs.current.forEach((img) => {
        if (img) {
          gsap.fromTo(
            img,
            { opacity: 0, scale: 0.95 },
            {
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: img,
                start: 'top 80%',
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, [inView]);

  return (
    <section 
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-12">
        <div ref={contentRef} className="space-y-24">
          {/* Woods Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 
                  ref={titleRef}
                  className="text-3xl sm:text-4xl md:text-5xl font-serif mb-6 text-[#3e533c]"
                >
                  The Timeless Elegance of Woodcraft
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed font-light text-justify">
                Wood has always stood as a symbol of warmth, heritage, and endurance. As part of our eco friendly home furniture promise, we source timbers that are both exquisite and ethically harvested. 
                Each handcrafted piece tells a sustainability story—blending precision, natural materials, and artistry into lasting luxury. 
                  <br /><br />
                  Our artisans work with intention, designing sustainably sourced furniture that’s both stunning and responsible.
                </p>
            </div>
            <div className="order-1 lg:order-2">
              <img
                ref={el => imageRefs.current[0] = el}
                src="https://images.unsplash.com/photo-1596237563267-84ffd99c80e1?q=80&w=2624&auto=format&fit=crop"
                alt="Woodworking craftsmanship"
                className="w-full h-[400px] sm:h-[500px] object-cover shadow-lg"
                loading="lazy"
              />
            </div>
          </div>

          {/* Upholstery Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="lg:order-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-6 text-[#3e533c]">
                  Upholstery - Where Luxury Meets Comfort
                </h2>
                  <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed font-light text-justify">
                  Our master upholsterers craft with intention—pairing soft-touch, eco-certified textiles with luxurious comfort. The result? Sustainability products that blend tactile beauty with ergonomic performance. 
                    <br /><br />
                    Every stitch honors our belief that environmental friendly products can also redefine elegance. With every chair and cushion, we prove that comfort and conscience go hand in hand.
                  </p>
            </div>
            <div className="lg:order-1">
              <img
                ref={el => imageRefs.current[1] = el}
                src="https://res.cloudinary.com/dnddesigncenter/image/upload/Sustainability.jpg"
                alt="Upholstery craftsmanship"
                className="w-full h-[400px] sm:h-[500px] object-cover shadow-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilityPath;
