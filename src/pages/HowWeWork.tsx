import TestimonialsSection from '../components/ui/testimonials-with-marquee';
import CaseStudies from '../components/howwework/CaseStudies';
import HowWeWorkHero from '../components/howwework/HowWeWorkHero';
import HowWeWorkStages from '../components/howwework/HowWeWorkStages';
import HowWeWorkCallToAction from '../components/howwework/HowWeWorkCallToAction';
import { FeatureStepsDemo } from '../components/howwework/FeatureStepsDemo';
import { AnimatePresence } from 'framer-motion';
import { useFooterContact } from '../hooks/useFooterContact';
import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';

const HowWeWork = () => {
  const { triggerFooterContact } = useFooterContact();
  type Testimonial = {
    author: {
      name: string;
      role: string;
      image: string;
    };
    text: string;
    href?: string;
  };
  
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    // Vite's import.meta.glob for eager loading all JSON files
    const modules = import.meta.glob('../data/testimonials/*.json', { eager: true });
    const loaded = Object.values(modules).map((mod: any) => mod.default || mod);
    // Map to your component's expected shape
    setTestimonials(
      loaded.map((t: any) => ({
        author: {
          name: t.name,
          role: t.role || "",
          image: t.photo || "",
        },
        text: t.quote,
        href: t.website || undefined,
      }))
    );
  }, []);

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <Helmet>
        <title>Our Design Process for Luxury Homes | D&D Design Center</title>
        <meta name="description" content="Learn about our process and how we create luxury custom furniture at D&D Design Center." />
        <link rel="canonical" href="https://dnddesigncenter.com/how-we-work" />
      </Helmet>
      <HowWeWorkHero />
      <HowWeWorkStages />
      <AnimatePresence mode="sync">
        <FeatureStepsDemo />
      </AnimatePresence>
      <CaseStudies />
      <TestimonialsSection
        title="What Our Clients Say"
        description="Real feedback from our happy clients."
        testimonials={testimonials}
      />
      <HowWeWorkCallToAction
        triggerFooterContact={triggerFooterContact}
      />
    </div>
  );
};

export default HowWeWork;
