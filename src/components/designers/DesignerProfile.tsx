import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface Designer {
  id: string;
  name: string;
  title: string;
  bio: string;
  photo: string;
  website: string;
  featuredWorks: {
    id: number;
    image: string;
    alt: string;
    link: string;
  }[];
}

interface DesignerProfileProps {
  designer: Designer;
  index: number;
  onConnect: (designerName: string) => void;
}

const DesignerProfile: React.FC<DesignerProfileProps> = ({ designer, index }) => {
  // Carousel state for mobile
  const [current, setCurrent] = useState(0);
  const works = designer.featuredWorks.slice(0, 6);

  const handlePrev = () => setCurrent((prev) => (prev === 0 ? works.length - 1 : prev - 1));
  const handleNext = () => setCurrent((prev) => (prev === works.length - 1 ? 0 : prev + 1));

  return (
    <motion.div 
      className="mb-20"
      initial={{ opacity: 0 }} // Start fully transparent
      animate={{ opacity: 1 }} // Fade in to fully visible
      transition={{ duration: 1, delay: index * 0.2 }} // Smooth fade-in with delay based on index
    >
      {/* Main layout: photo left, info & works right */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Designer Photo */}
        <motion.div 
          className="md:w-1/3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: index * 0.3 }}
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-[#C5A267]/20 rounded-lg transform rotate-3 transition-transform group-hover:rotate-6"></div>
            <img 
              src={designer.photo} 
              alt={designer.name} 
              className="relative rounded-lg shadow-lg w-full aspect-[4/5] object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>
        
        {/* Info and Featured Work */}
        <motion.div 
          className="md:w-2/3 flex flex-col gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: index * 0.4 }}
        >
          {/* Designer Info */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-2">{designer.name}</h2>
            <p className="text-[#C5A267] font-medium mb-4">{designer.title}</p>
            <p className="text-gray-600 mb-4 leading-relaxed font-montserrat font-light">{designer.bio}</p>
            <a 
              href={designer.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#C5A267] hover:text-[#B49157] font-medium flex items-center gap-1 transition-colors duration-300"
              aria-label={`Connect with ${designer.name}`}
            >
              Connect with {designer.name.split(' ')[0]}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          {/* Featured Work */}
          <div>
            <h3 className="text-xl font-medium text-gray-900 mb-4">Featured Work</h3>
            {/* Carousel for mobile, grid for desktop */}
            <div className="block sm:hidden relative">
              <div className="flex items-center justify-center">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-full bg-white shadow absolute left-0 top-1/2 -translate-y-1/2 z-10"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <motion.a
                  key={works[current].id}
                  href={works[current].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 w-full max-w-xs mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={works[current].image} 
                      alt={works[current].alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-white font-medium">View on Instagram</span>
                    </div>
                  </div>
                </motion.a>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-full bg-white shadow absolute right-0 top-1/2 -translate-y-1/2 z-10"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <div className="flex justify-center mt-2 gap-1">
                {works.map((_, i) => (
                  <button
                    key={i}
                    className={`w-2 h-2 rounded-full ${i === current ? 'bg-[#C5A267]' : 'bg-gray-300'}`}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="hidden sm:grid grid-cols-3 sm:grid-rows-1 gap-4">
              {works.map((work) => (
                <motion.a 
                  key={work.id} 
                  href={work.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: index * 0.5 }}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={work.image} 
                      alt={work.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-white font-medium">View on Instagram</span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DesignerProfile;