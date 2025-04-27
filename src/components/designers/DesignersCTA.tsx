import React from 'react';
import { Link } from 'react-router-dom';
import ParticleBackground from '../sustainability/ParticleBackground'; // Add this import

interface DesignersCTAProps {
  onContactTeam: () => void;
}

const DesignersCTA: React.FC<DesignersCTAProps> = ({ onContactTeam }) => {
  return (
    <section className="py-16 bg-gray-100 relative overflow-hidden">
      {/* Particle background */}
      <ParticleBackground containerId="designers-cta-particles" className="pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl font-serif text-gray-900 mb-6">
          WORK WITH OUR DESIGNERS
        </h2>
        <p className="text-gray-600 max-w-2xl text-xl mx-auto mb-8">
          Our talented designers are ready to bring your vision to life. Whether you're looking to refresh a single room or redesign your entire home,
          <br />
          our team has the expertise to create the perfect space for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onContactTeam}
            className="px-6 py-3 bg-[#C5A267] text-white font-medium hover:bg-[#B49157] transition-colors duration-300 min-h-[44px]"
          >
            Contact Our Design Team
          </button>
          <Link
            to="/how-we-work"
            className="px-6 py-3 border border-[#C5A267] text-[#C5A267] font-medium hover:bg-[#C5A267] hover:text-white transition-colors duration-300 min-h-[44px]"
          >
            Learn About Our Process
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DesignersCTA;