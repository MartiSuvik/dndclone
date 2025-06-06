import React, { useRef } from "react";

const caseStudies = [
  {
    id: 1,
    title: "Refined Bedroom – Timeless Comfort",
    description:
      "Luxury meets function with custom storage, soft lighting, and sleek design.",
    beforeImage:
      "https://res.cloudinary.com/designcenter/image/upload/Comparison_4.avif",
    afterImage:
      "https://res.cloudinary.com/designcenter/image/upload/Comparison_3.avif",
    results: [
      "Smart storage solutions",
      "Warm, ambient lighting",
      "Sophisticated modern style",
    ],
  },
  {
    id: 2,
    title: "Sleek Kitchen – Modern & Functional",
    description:
      "Upgrade to a high-end kitchen with bespoke cabinetry and premium finishes.",
    beforeImage:
      "https://res.cloudinary.com/designcenter/image/upload/Comparison_6.avif",
    afterImage:
      "https://res.cloudinary.com/designcenter/image/upload/Comparison_5.avif",
    results: [
      "Space-maximizing custom cabinetry",
      "Elegant, durable materials",
      "Effortless, stylish layouts",
    ],
  },
  {
    id: 3,
    title: "Elegant Living Room – Inviting & Luxurious",
    description:
      "Transform your space with statement furniture, rich textures, and perfect lighting.",
    beforeImage:
      "https://res.cloudinary.com/designcenter/image/upload/Comparison_2.avif",
    afterImage:
      "https://res.cloudinary.com/designcenter/image/upload/Comparison_1.avif",
    results: [
      "Bespoke Italian furnishings",
      "Premium wood flooring",
      "Warm, refined ambiance",
    ],
  },
];

const CaseStudies: React.FC = () => {
  const caseStudiesRef = useRef<HTMLDivElement>(null);
  const sliderRefs = useRef<(HTMLDivElement | null)[]>([]);


  // Function to handle slider movement
  const handleSliderInteraction = (index: number, clientX: number) => {
    if (!sliderRefs.current[index]) return;
    const rect = sliderRefs.current[index]!.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percentage = (offsetX / rect.width) * 100;

    const afterImageEl = sliderRefs.current[index]!.querySelector(".after-image") as HTMLElement;
    const dividerEl = sliderRefs.current[index]!.querySelector(".slider-divider") as HTMLElement;
    
    afterImageEl.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    dividerEl.style.left = `${percentage}%`;
  };

  return (
    <section ref={caseStudiesRef} className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-black text-center mb-8 sm:mb-12 md:mb-8">
          HOME TRANSFORMATIONS
        </h2>
        <p className="text-[#C4A661] text-center text-lg sm:text-xl mb-8 font-medium">
          Slide on the images to compare
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              className="relative flex flex-col bg-[#262626] rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:to-white/20 before:to-90%"
            >
              {/* Before / After Image Slider */}
              <div
                ref={(el) => (sliderRefs.current[index] = el!)}
                className="relative aspect-[4/3] cursor-ew-resize group flex-shrink-0"
                onMouseMove={(e) => handleSliderInteraction(index, e.clientX)}
                onTouchMove={(e) =>
                  handleSliderInteraction(index, e.touches[0].clientX)
                }
              >
                {/* After Image */}
                <img
                  src={study.afterImage}
                  alt="After"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Before Image (Revealed by Slider) */}
                <div
                  className="after-image absolute inset-0 w-full h-full"
                  style={{ clipPath: "inset(0 50% 0 0)" }}
                >
                  <img
                    src={study.beforeImage}
                    alt="Before"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {/* Pulsing Divider Line */}
                <div 
                  className="slider-divider absolute top-0 bottom-0 w-1 bg-[#C4A661] shadow-[0_0_8px_rgba(196,166,97,0.8)] z-10 animate-pulse" 
                  style={{ left: '50%', transform: 'translateX(-50%)' }}
                ></div>
                {/* Slider Instruction */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-sm bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full">
                    Slide
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 flex flex-col p-4 sm:p-6">
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl text-white mb-2">
                    {study.title}
                  </h3>
                  <p className="text-white/60 mb-4 text-sm sm:text-base leading-relaxed">
                    {study.description}
                  </p>
                </div>

                {/* Results List */}
                <div className="mt-auto pt-4 space-y-2">
                  {study.results.map((result, i) => (
                    <div
                      key={i}
                      className="flex items-center text-[#C4A661] text-sm sm:text-base"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C4A661] mr-3 flex-shrink-0" />
                      <span>{result}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Trust-Building Text Section */}
      <div className="flex justify-center mt-12 sm:mt-16 md:mt-20">
        <div className="max-w-xl text-center px-12 space-y-6">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#2C3E2B]">
            Elevating New York City Design
          </h3>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed font-light text-justify">
            In the heart of New York City, our design ethos merges cutting-edge innovation with timeless elegance.
            Each transformation we undertake reflects our deep commitment to quality, sustainability, and a visionary approach
            that redefines urban luxury. Trust in our expertise to turn every space into a masterpiece that not only inspires but
            also endures—making New York City the epicenter of refined, sustainable design.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;