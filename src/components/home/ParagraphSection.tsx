"use client";

import React, { useEffect, useRef } from 'react';
import { motion, stagger, useAnimate, useInView } from "framer-motion";

// Utility function to combine class names
function cn(...classes: (string | undefined | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

// Text Generate Effect Component
const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.3,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 0.3,
        delay: stagger(0.1),
      }
    );
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="whitespace-pre-line">
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("", className)}>
      <div className="">
        <div className="">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};

const ParagraphSection: React.FC = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    
    return (
        <section 
            ref={ref}
            className="relative py-12 sm:py-24 px-6 md:px-12 overflow-hidden" 
            style={{ 
                background: 'linear-gradient(to bottom, #FDFBF7, #F7F3EE)' 
            }}
        >
            {/* Marble texture background */}
            <div className="absolute inset-0 opacity-100 pointer-events-none">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558346648-9757f2fa4474?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/100 to-white/50" />
            </div>
            
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:items-center relative z-10">
                {/* Left Column with enhanced gold accent line */}
                <motion.div 
                    className="relative pl-12 flex-shrink-0 w-full lg:w-auto max-w-md"
                    style={{
                        opacity: isInView ? 1 : 0,
                        transform: isInView ? "translateY(0)" : "translateY(20px)",
                        transition: "all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
                    }}
                >
                    {/* Brushed gold vertical line with subtle glow */}
                    <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#D4B77B] via-[#C5A267] to-[#9E7F43]">
                        <div className="absolute -left-[2px] top-0 h-full w-[7px] bg-[#C5A267] opacity-40 blur-sm"></div>
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl md:text-5xl text-gray-900 leading-tight tracking-wide" 
                        style={{ fontFamily: "'Playfair Display', serif" }}>
                        <span className="uppercase font-light block mb-3">Timeless Design</span>
                        <span className="normal-case text-lg sm:text-xl md:text-2xl text-[#9E7F43] font-light block mt-3" 
                              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                            Rooted in Italian Craftsmanship
                        </span>
                    </h2>
                </motion.div>

                {/* Right Column – Supporting Paragraph with soft shadow */}
                <motion.div
                    style={{
                        opacity: isInView ? 1 : 0,
                        transform: isInView ? "translateY(0)" : "translateY(20px)",
                        transition: "all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
                    }}
                    className="pr-4 md:pr-10"
                >
                    <div className="relative">
                        <TextGenerateEffect 
                            words={`At D&D, we believe true luxury lies in subtlety and detail.\n\nOur interiors reflect decades of Italian tradition, where each space is thoughtfully designed to bring beauty, function, and soul into everyday living.`}
                            className="text-gray-700 text-base md:text-lg leading-relaxed font-light"
                            duration={0.5}
                            filter={false}
                        />
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-radial from-[#C5A267]/10 to-transparent opacity-50"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ParagraphSection;