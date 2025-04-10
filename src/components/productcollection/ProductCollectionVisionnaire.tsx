"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "react-intersection-observer";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ProductCollectionVisionnaire: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const textRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (inView) {
      setTimeout(() => setLoading(false), 300);
    }
  }, [inView]);

  useEffect(() => {
    if (
      !inView ||
      loading ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    gsap.fromTo(
      [textRef.current, videoRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.2 }
    );
  }, [inView, loading]);

  return (
    <section
      ref={ref}
      className="px-[5%] py-12 md:py-16 lg:py-20 bg-gray-100"
      aria-label="Luxury Collaboration with Visionnaire"
    >
      <div className="container mx-auto max-w-7xl">
        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#c9a671]"></div>
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-12 lg:gap-x-20 md:items-center">
            {/* Text Section */}
            <div ref={textRef}>
              <h2 className="mb-5 text-3xl sm:text-4xl font-bold md:mb-6 md:text-5xl lg:text-7xl text-gray-900">
                CURATED LUXURY INTERIORS BY FINEST DESIGN HOUSES
              </h2>
              <p className="mb-6 md:mb-8 text-gray-700 leading-relaxed text-justify">
                At D&D Design Center, we proudly partner with Italy’s most
                celebrated brands—
                <strong className="text-gray-900">Visionnaire</strong>,{" "}
                <strong>Longhi</strong>, <strong>Prestige</strong>, and{" "}
                <strong>Aster</strong>—to bring you exclusive collections that
                define contemporary elegance and heritage craftsmanship.
              </p>

              <p className="mb-6 md:mb-8 text-gray-700 leading-relaxed text-justify">
                Each brand offers a distinct take on luxury: Visionnaire’s
                avant-garde design, Longhi’s refined modernism, Prestige’s bold
                artistic statement, and Aster’s functional sophistication for
                the luxury kitchen. These collections are hand-selected to
                transform every corner of your home—from living rooms to
                kitchens—into a curated expression of Italian excellence.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-2">
                <div>
                  <h5 className="mb-2 text-base font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#b49157] to-[#c9a671]">
                    FOUR ICONIC BRANDS, ONE BESPOKE EXPERIENCE
                  </h5>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-justify">
                    Discover rare pieces and tailored collections from
                    Visionnaire, Longhi, Prestige, and Aster—all under one roof
                    at our NYC showroom.
                  </p>
                </div>
                <div>
                  <h5 className="mb-2 text-base font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#b49157] to-[#c9a671]">
                    ITALIAN LUXURY TAILORED TO YOUR SPACE
                  </h5>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed text-justify">
                    Our design specialists help you blend signature Italian
                    aesthetics with your personal style, creating truly
                    one-of-a-kind interiors.
                  </p>
                </div>
              </div>

              {/* Updated CTA Button with Inline Logo */}
              <div className="pt-6">
                <a
                  ref={buttonRef}
                  href="/collaboration"
                  className="inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-8 py-3 sm:py-4 bg-[#c5a267] text-white font-medium rounded-sm hover:bg-[#b49157] transition-all duration-200 group"
                >
                  EXPLORE PARTNER BRANDS
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
                </a>
              </div>
            </div>

            {/* Video Section */}
            <div ref={videoRef}>
              <div className="relative aspect-w-16 aspect-h-9 overflow-hidden shadow-xl">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="https://res.cloudinary.com/designcenter/image/upload/Bespoke_Furniture_Collection_In_New_York_City.avif"
                  preload="metadata"
                >
                  <source
                    src="https://res.cloudinary.com/designcenter/video/upload/f_auto,q_auto:good/visionnaire-luxury-collection.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCollectionVisionnaire;
