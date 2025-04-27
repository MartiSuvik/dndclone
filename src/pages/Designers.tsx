import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import DesignersHero from '../components/designers/DesignersHero';
import DesignerProfile from '../components/designers/DesignerProfile';
import DesignersCTA from '../components/designers/DesignersCTA';

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

const Designers: React.FC = () => {
  const [designers, setDesigners] = useState<Designer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDesigners = async () => {
      try {
        // In a real application, you'd fetch this from an API
        // For now we're using the import.meta.glob to load from JSON files
        const modules = import.meta.glob('../data/designers/*.json');
        const designerData = await Promise.all(
          Object.values(modules).map(module => module())
        );
        
        // Extract the default exports from the modules
        const loadedDesigners = designerData.map(module => (module as any).default || module);
        setDesigners(loadedDesigners);
      } catch (error) {
        console.error("Error loading designers:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDesigners();
  }, []);

  // Function to trigger footer contact form
  const triggerFooterContact = () => {
    const footerElement = document.querySelector('#footer');
    if (footerElement instanceof HTMLElement) {
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      window.scrollTo({
        top: scrollHeight - windowHeight,
        behavior: 'smooth',
      });
      setTimeout(() => {
        const footerContactBtn = document.querySelector(
          '[data-footer-contact]'
        ) as HTMLButtonElement;
        if (footerContactBtn) {
          footerContactBtn.click();
        }
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Meet Our Designers | D&D Design Center</title>
        <meta 
          name="description" 
          content="Get to know the creative minds behind D&D Design Center. Explore their stories and see a handpicked selection of their best work."
        />
        <link rel="canonical" href="https://dnddesigncenter.com/designers" />
      </Helmet>

      <DesignersHero />

      {/* Designers Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C5A267]"></div>
            </div>
          ) : (
            designers.map((designer, index) => (
              <DesignerProfile 
                key={designer.id}
                designer={designer}
                index={index}
                onConnect={() => triggerFooterContact()}
              />
            ))
          )}
        </div>
      </section>

      <DesignersCTA onContactTeam={triggerFooterContact} />
    </div>
  );
};

export default Designers;