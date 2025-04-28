"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

interface FeatureItem {
  id: number;
  title: string;
  image: string;
  description: string;
}

interface Feature197Props {
  features: FeatureItem[];
  triggerFooterContact?: () => void; // Add this prop for the button click handler
}

const defaultFeatures: FeatureItem[] = [
    {
      id: 1,
      title: "Kitchen",
      image: "https://res.cloudinary.com/designcenter/image/upload/Luxury%20Kitchen%20Interiors%20%E2%80%93%20Custom%20Cabinetry%20and%20Marble%20Finishes.avif",
      description: "We begin by discussing your culinary habits, lifestyle, and aesthetic goals during a personalized consultation. Our design team then creates a fully customized kitchen layout, focusing on functionality, flow, and visual harmony. We source Italian-made cabinetry, marble surfaces, and premium appliances, ensuring every material aligns with your taste and daily use. Throughout production, we coordinate with artisans and manufacturers in Italy, overseeing quality control and timelines. Our team manages delivery, installation, and final detailing to ensure your kitchen becomes a refined centerpiece of your home."
    },
    {
      id: 2,
      title: "Living Room",
      image: "https://res.cloudinary.com/designcenter/image/upload/Luxury%20Living%20Room%20Design%20%E2%80%93%20Custom%20Sofas%20and%20Decor%20NYC.avif",
      description: "We start by understanding how you live and entertain—whether you host frequent gatherings or prefer serene, intimate spaces. After establishing your design vision, we curate a bespoke layout that balances comfort and artistry, specifying custom Italian sofas, built-in cabinetry, and lighting tailored to your lifestyle. We create detailed floor plans and mood boards, source every piece directly from our trusted suppliers, and supervise each phase of delivery and installation to ensure your living room embodies both luxurious relaxation and timeless design integrity."
    },
    {
      id: 3,
      title: "Dining Room",
      image: "https://res.cloudinary.com/designcenter/image/upload/Luxury%20Dining%20Room%20Furniture%20%E2%80%93%20Custom%20Tables%20and%20Seating.avif",
      description: "We first explore how you envision dining experiences in your home—whether formal, casual, or a seamless extension of your living area. Our team designs a tailored dining environment around your needs, recommending custom Italian tables, handcrafted seating, and lighting that sets the perfect ambiance. We oversee every element, from proportion and material selection to installation and styling, ensuring your dining room becomes a sophisticated space for memorable gatherings and daily enjoyment."
    },
    {
      id: 4,
      title: "Bedroom",
      image: "https://res.cloudinary.com/designcenter/image/upload/Custom%20Luxury%20Bedroom%20Design%20%E2%80%93%20High-End%20Interiors%20NYC.avif",
      description: "We begin with an in-depth consultation to understand your rituals of rest, relaxation, and personal style. Our designers then craft a layout centered on tranquility and elegance, recommending bespoke Italian beds, custom wardrobes, and integrated lighting solutions. Each element is sourced from our network of master artisans, with full project management to ensure seamless delivery and meticulous installation. The result is a bedroom sanctuary that blends comfort, sophistication, and personal storytelling."
    },
    {
      id: 6,
      title: "Bathroom",
      image: "https://res.cloudinary.com/designcenter/image/upload/Luxury%20Bathroom%20Design%20%E2%80%93%20Bespoke%20Vanities%20and%20Interiors.avif",
      description: "We start by identifying how you want your bathroom to feel—spa-like, sleek, dramatic, or timeless. After gathering inspiration and spatial measurements, we design a bespoke bathroom plan using custom vanities, Italian stone surfaces, premium fixtures, and tailored storage solutions. Throughout production, we maintain rigorous quality checks and timeline management, coordinating with our artisans to ensure flawless finishes. Installation is overseen directly by our project managers, guaranteeing a result that turns daily rituals into indulgent experiences."
    },
    {
      id: 8,
      title: "Office",
      image: "https://res.cloudinary.com/designcenter/image/upload/Bespoke%20Office%20Furniture%20%E2%80%93%20Luxury%20Workspaces%20NYC.avif",
      description: "We tailor your home office based on your work habits, creative needs, and design preferences. Beginning with a consultation, we create a custom space plan featuring Italian desks, ergonomic seating, integrated storage, and ambient lighting for productivity and refinement. Our team handles every detail, from selecting handcrafted materials to coordinating fabrication and delivery schedules, culminating in an office space that enhances focus and embodies effortless sophistication."
    },
    {
      id: 9,
      title: "Closet",
      image: "https://res.cloudinary.com/designcenter/image/upload/Closet_Designed_For_Modern_Homes.avif",
      description: "We start by mapping your wardrobe habits—whether you need expansive walk-in solutions or elegantly hidden storage. Our designers create customized layouts using modular Italian systems, emphasizing aesthetic clarity and functional organization. Materials are carefully selected for durability and beauty, with options for integrated lighting and luxurious hardware. We manage the entire fabrication and installation process, delivering closets that feel as curated and personal as a designer boutique."
    },
    {
      id: 5,
      title: "Light",
      image: "https://res.cloudinary.com/designcenter/image/upload/Luxury%20Lighting%20Design%20%E2%80%93%20Modern%20Fixtures%20for%20High-End%20Homes.avif",
      description: "We collaborate with you to understand the emotional tone and architectural needs of each space before designing a layered lighting plan. Our specialists source Italian-made chandeliers, sconces, and recessed lighting systems that blend artistry and functionality. We provide detailed lighting schematics and coordinate installation with our trusted electricians, ensuring your home radiates atmosphere, elegance, and warmth at every hour."
    },
    {
      id: 7,
      title: "Outdoor",
      image: "https://res.cloudinary.com/designcenter/image/upload/Luxury%20Outdoor%20Furniture%20%E2%80%93%20Custom%20Patio%20and%20Terrace%20Designs.avif",
      description: "We begin by assessing your outdoor lifestyle—whether it’s hosting rooftop dinners or creating a private terrace retreat. Our team designs layouts that maximize space and visual connection to your interiors, specifying Italian outdoor furniture, weather-resistant materials, and customized planters. From furniture sourcing to architectural layout adjustments, we oversee every detail, delivering outdoor living spaces that feel like a natural extension of your luxurious indoor world."
    },
  ];  
  
const Feature197 = ({ features = defaultFeatures }: Feature197Props) => {
  const [activeTabId, setActiveTabId] = useState<number | null>(1);
  const [activeImage, setActiveImage] = useState(features[0].image);

  const triggerFooterContact = () => {
    const footerElement = document.querySelector("#footer");
    if (footerElement instanceof HTMLElement) {
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      window.scrollTo({
        top: scrollHeight - windowHeight,
        behavior: "smooth",
      });
      setTimeout(() => {
        const footerContactBtn = document.querySelector(
          "[data-footer-contact]"
        ) as HTMLButtonElement;
        if (footerContactBtn) {
          footerContactBtn.click();
        }
      }, 800);
    }
  };

  // Helper function to format description text with paragraphs and bold styling
  const renderFormattedDescription = (description: string) => {
    // Split by newlines to create paragraphs
    const paragraphs = description.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Replace **text** with <strong> elements
      const formattedText = paragraph.replace(
        /\*\*(.*?)\*\*/g, 
        '<strong>$1</strong>'
      );
      
      return (
        <p 
          key={index} 
          className="mt-3 text-gray-600 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formattedText }}
        />
      );
    });
  };

    function handleConsultationClick(event: React.MouseEvent<HTMLButtonElement>): void {
      event.preventDefault();
      // If a triggerFooterContact handler is provided via props, call it; otherwise use the default behavior.
      if (typeof triggerFooterContact === "function") {
        triggerFooterContact();
      } else {
        console.warn("No consultation handler provided.");
      }
    }
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-900 leading-relaxed">
        Discover How We Transform NYC Homes with Custom Luxury Interiors
            </h2>
            <p className="mt-4 text-m text-gray-600 max-w-1xl mx-auto leading-relaxed">
            From kitchens to closets, discover how D&D Design Center transforms each space with bespoke Italian craftsmanship and tailored elegance for modern New York living.
            </p>
        </div>
        <div className="mb-12 flex w-full flex-col md:flex-row items-start justify-between gap-12">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <Accordion type="single" className="w-full" defaultValue="item-1">
              {features.map((tab) => (
                <AccordionItem key={tab.id} value={`item-${tab.id}`} className="border-[#C5A267]/30">
                  <AccordionTrigger
                    onClick={() => {
                      setActiveImage(tab.image);
                      setActiveTabId(tab.id);
                    }}
                    className="cursor-pointer py-5 !no-underline transition"
                    aria-expanded={tab.id === activeTabId}
                  >
                    <h3
                      className={`text-xl font-serif ${tab.id === activeTabId ? "text-[#C5A267]" : "text-gray-600"}`}
                    >
                      {tab.title}
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-1 text-justify leading-relaxed">
                      {renderFormattedDescription(tab.description)}
                    </div>
                    
                    {/* Add the consultation request button */}
                    <div className="mt-6 flex justify-start">
                      <button 
                        onClick={handleConsultationClick} 
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C5A267] text-white font-medium rounded-sm hover:bg-[#D6B378] transition-all duration-300 min-h-[44px] text-sm"
                        aria-label={`Request a luxury ${tab.title.toLowerCase()} design consultation`}
                      >
                        REQUEST A CONSULTATION
                      </button>
                    </div>
                    
                    <div className="mt-4 md:hidden">
                      <img
                        src={tab.image}
                        alt={tab.title}
                        className="h-full max-h-80 w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="relative m-auto hidden w-1/2 overflow-hidden rounded-xl md:block order-1 md:order-2">
            <img
              src={activeImage}
              alt="Luxury furniture feature"
              className="aspect-[4/3] object-cover shadow-lg transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature197 };