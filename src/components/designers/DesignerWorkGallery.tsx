import React from 'react';

interface Work {
  id: number;
  image: string;
  alt: string;
  link: string;
}

interface DesignerWorkGalleryProps {
  works: Work[];
}

const DesignerWorkGallery: React.FC<DesignerWorkGalleryProps> = ({ works }) => {
  return (
    <div className="md:w-2/3">
      <h3 className="text-xl font-medium text-gray-900 mb-4">Featured Work</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {works.map((work) => (
          <a 
            key={work.id} 
            href={work.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
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
          </a>
        ))}
      </div>
    </div>
  );
};

export default DesignerWorkGallery;