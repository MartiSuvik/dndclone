import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useState } from 'react';

const BlogHero = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="relative overflow-hidden pb-6">
      {/* Accessible background image (screen readers only) */}
      <img 
        src="https://res.cloudinary.com/designcenter/image/upload/Product_2/Kitchen/Art_Deco/Kitchen_Art_Deco_2.avif" 
        alt="Luxurious Art Deco kitchen design with custom cabinetry and ambient lighting, showcasing D&D Design Center's craftsmanship" 
        className="sr-only"
      />

      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" 
        style={{ 
          backgroundImage: "url('https://res.cloudinary.com/designcenter/image/upload/Product_2/Kitchen/Art_Deco/Kitchen_Art_Deco_2.avif')",
          opacity: 0.9
        }} 
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-25 z-[1]" />
      <div className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-gray-100 to-transparent shadow-sm z-[2]" />

      <motion.div 
        className="container mx-auto px-4 pt-20 md:pt-32 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-serif mb-6 font-bold tracking-wide text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            INSIGHTS & INSPIRATION
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-white mb-10 md:mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore our collection of articles on design, craftsmanship, and luxury living
          </motion.p>

          <motion.div 
            className="relative max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-700 w-5 h-5" />
            <input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-5 py-4 md:py-5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C5A267] text-gray-800 placeholder:text-gray-500 shadow-md bg-white/90"
              aria-label="Search articles"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default BlogHero;
