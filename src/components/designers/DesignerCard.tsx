import React from 'react';
import { ArrowRight } from 'lucide-react';

interface DesignerCardProps {
  designer: {
    id: string;
    name: string;
    title: string;
    bio: string;
    photo: string;
  };
  index: number;
  onConnect: (designerName: string) => void;
}

const DesignerCard: React.FC<DesignerCardProps> = ({ designer, onConnect }) => {
  return (
    <div className={`md:w-1/3 mb-8 md:mb-0`}>
      <div className="relative mb-6 group">
        <div className="absolute inset-0 bg-[#C5A267]/20 rounded-lg transform rotate-3 transition-transform group-hover:rotate-6"></div>
        <img 
          src={designer.photo} 
          alt={designer.name} 
          className="relative rounded-lg shadow-lg w-full aspect-[4/5] object-cover"
          loading="lazy"
        />
      </div>
      <h2 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-2">{designer.name}</h2>
      <p className="text-[#C5A267] font-medium mb-4">{designer.title}</p>
      <p className="text-gray-600 mb-4 leading-relaxed">{designer.bio}</p>
      
      <button 
        onClick={() => onConnect(designer.name.split(' ')[0])}
        className="text-[#C5A267] hover:text-[#B49157] font-medium flex items-center gap-1 transition-colors duration-300"
        aria-label={`CONNECT WITH ${designer.name}`}
      >
        CONNECT WITH {designer.name.split(' ')[0]}
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default DesignerCard;