import React from 'react';
import { ArrowRight } from 'lucide-react';

interface DesignerCardProps {
  designer: {
    name: string;
    description: string;
    photo: string;
    website: string;
  };
  index: number;
}

const DesignerCard: React.FC<DesignerCardProps> = ({ designer }) => {
  return (
    <div className="flex flex-col md:flex-row items-start gap-8 mb-16">
      {/* Image column */}
      <div className="w-full md:w-1/3 max-w-xs mx-auto md:mx-0 mb-6 md:mb-0 relative group">
        <div className="absolute inset-0 bg-[#C5A267]/20 rounded-lg transform rotate-3 transition-transform group-hover:rotate-6"></div>
        <img
          src={designer.photo}
          alt={designer.name}
          className="relative rounded-lg shadow-lg w-full aspect-[4/5] object-cover"
          loading="lazy"
        />
      </div>
      {/* Description column */}
      <div className="w-full md:w-2/3 flex flex-col justify-center">
        <h2 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-4">{designer.name}</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">{designer.description}</p>
        <a
          href={designer.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#C5A267] text-white rounded hover:bg-[#B49157] transition-colors duration-300 font-medium mt-2"
          aria-label={`Visit ${designer.name}'s website`}
        >
          Visit Website
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default DesignerCard;