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
      description: "Elevate your kitchen with **bespoke Italian craftsmanship** and full-service kitchen redesign in New York. From contemporary luxury kitchens to integrated kitchen and bath renovations, our design studio crafts tailored spaces that reflect your culinary lifestyle and architectural taste.\n\nWe specialize in custom installations, premium materials, and layout transformations—delivering kitchens that combine **modern elegance with lasting function**. Serving NYC clients seeking a high-end kitchen design experience from consultation to completion."
    },
    {
      id: 2,
      title: "Living Room",
      image: "https://res.cloudinary.com/designcenter/image/upload/Luxury%20Living%20Room%20Design%20%E2%80%93%20Custom%20Sofas%20and%20Decor%20NYC.avif",
      description: "Transform your living room interior with **custom Italian design**, crafted to elevate everyday comfort and style. Whether you need a luxury sofa for your Manhattan loft or a refined open-plan layout for your Brooklyn brownstone, our team specializes in high-end living room remodels that reflect your taste and lifestyle.\n\nFrom living room layout consultation to bespoke cabinetry and lighting, our NYC interior designers create **cohesive, functional, and stunning living spaces** tailored to you."
    },
    {
      id: 3,
      title: "Dining Room",
      image: "https://res.cloudinary.com/designcenter/image/upload/Luxury%20Dining%20Room%20Furniture%20%E2%80%93%20Custom%20Tables%20and%20Seating.avif",
      description: "Discover our **modern dining room design gallery**, featuring fully styled interiors that blend Italian craftsmanship with NYC sophistication. From minimalist dining setups to elegant open-plan concepts, our portfolio includes contemporary dining room decor and stylish dining room ideas tailored to high-end Manhattan and Brooklyn residences.\n\nWhether you're seeking modern dining room images for inspiration or full-service design consultation, we turn your dining space into a **visual and functional centerpiece**."
    },
    {
      id: 4,
      title: "Bedroom",
      image: "https://res.cloudinary.com/designcenter/image/upload/Custom%20Luxury%20Bedroom%20Design%20%E2%80%93%20High-End%20Interiors%20NYC.avif",
      description: "Indulge in **custom bedroom design in New York** with interiors crafted for elegance, comfort, and timeless sophistication. At D&D Design Center, we curate bespoke bedroom suites featuring Italian-made furnishings, modern aesthetics, and personalized layouts.\n\nWhether it's a master suite in Manhattan or a refined guest room in Brooklyn, our luxury bedroom designs elevate daily rituals into restful experiences. From concept to installation, we deliver **full-service design** that reflects your unique style and the serenity of true craftsmanship."
    },
    {
      id: 6,
      title: "Bathroom",
      image: "https://res.cloudinary.com/designcenter/image/upload/Luxury%20Bathroom%20Design%20%E2%80%93%20Bespoke%20Vanities%20and%20Interiors.avif",
      description: "Transform your bathroom design in New York with **bespoke vanities, luxury fixtures, and handcrafted surfaces** made for timeless sophistication. Our NYC clients choose us for our Italian-designed bathrooms that balance serenity and style, from spa-inspired layouts to bold, modern expressions.\n\nWhether you're renovating a Manhattan condo or building your dream bathroom in Brooklyn, we deliver **high-end design solutions** that reflect your taste and elevate everyday routines. Discover why bathroom design NYC is evolving with custom artistry and refined materials."
    },
    {
      id: 8,
      title: "Office",
      image: "https://res.cloudinary.com/designcenter/image/upload/Bespoke%20Office%20Furniture%20%E2%80%93%20Luxury%20Workspaces%20NYC.avif",
      description: "Design your ideal office in New York with our collection of **custom Italian furniture** tailored for workspaces that blend sophistication with performance. Whether you're building a luxury home office in Brooklyn or curating a high-end executive suite in Manhattan, our handcrafted desks, cabinetry, and seating deliver both style and productivity.\n\nWith premium materials and **bespoke craftsmanship**, every piece reflects the elegance expected by New York professionals. Explore our office furniture collections designed for modern living and refined tastes."
    },
    {
      id: 9,
      title: "Closet",
      image: "https://res.cloudinary.com/designcenter/image/upload/Closet_Designed_For_Modern_Homes.avif",
      description: "Create your dream closet in New York with **custom Italian craftsmanship** tailored to your lifestyle. Whether you're upgrading to a walk-in closet in a Manhattan penthouse or refining your Brooklyn brownstone wardrobe, we specialize in bespoke closet systems designed for luxury, function, and elegance.\n\nOur closet designers in NYC use only the finest materials to craft **personalized storage solutions** that elevate your everyday routine. Discover why custom closet design in NYC starts with timeless aesthetics and tailored perfection."
    },
    {
      id: 5,
      title: "Light",
      image: "https://res.cloudinary.com/designcenter/image/upload/Luxury%20Lighting%20Design%20%E2%80%93%20Modern%20Fixtures%20for%20High-End%20Homes.avif",
      description: "Illuminate your home with **expert lighting design in New York**, featuring curated fixtures from Italy's most revered design houses. Our luxury lighting collection blends architectural form and functional brilliance—ideal for Manhattan penthouses, Brooklyn brownstones, and modern lofts alike.\n\nWhether you're sourcing a designer chandelier or planning a full lighting redesign with our specialists, we deliver **elegance, efficiency, and atmosphere**. Explore bespoke lighting NYC clients trust for high-end interiors that shine with personality."
    },
    {
      id: 7,
      title: "Outdoor",
      image: "https://res.cloudinary.com/designcenter/image/upload/Luxury%20Outdoor%20Furniture%20%E2%80%93%20Custom%20Patio%20and%20Terrace%20Designs.avif",
      description: "Bring your terrace to life with **luxury outdoor furniture** and terrace design in New York tailored to your lifestyle. Whether it's a rooftop retreat in Manhattan or a balcony oasis in Brooklyn, we craft bespoke outdoor spaces with Italian-made pieces and refined materials.\n\nFrom custom seating and planters to architectural layouts, our NYC terrace design solutions combine **elegance, comfort, and functionality** for year-round enjoyment. Explore outdoor living elevated by craftsmanship and style."
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
            Custom Luxury Furniture for Every Room in Your NYC Home
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
                  >
                    <h6
                      className={`text-xl font-serif ${tab.id === activeTabId ? "text-[#C5A267]" : "text-gray-600"}`}
                    >
                      {tab.title}
                    </h6>
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

const demoData = {
    features: [
        {
            id: 1,
            title: "KITCHEN",
            image: "https://res.cloudinary.com/designcenter/image/upload/Luxury%20Kitchen%20Interiors%20%E2%80%93%20Custom%20Cabinetry%20and%20Marble%20Finishes.avif",
            description: "Elevate your kitchen with **bespoke Italian craftsmanship** and full-service kitchen redesign in New York. From contemporary luxury kitchens to integrated kitchen and bath renovations, our design studio crafts tailored spaces that reflect your culinary lifestyle and architectural taste.\n\nWe specialize in custom installations, premium materials, and layout transformations—delivering kitchens that combine **modern elegance with lasting function**. Serving NYC clients seeking a high-end kitchen design experience from consultation to completion."
        },
          {
            id: 2,
            title: "LIVING ROOM",
            image: "https://res.cloudinary.com/designcenter/image/upload/Luxury%20Living%20Room%20Design%20%E2%80%93%20Custom%20Sofas%20and%20Decor%20NYC.avif",
            description: "Transform your living room interior with **custom Italian design**, crafted to elevate everyday comfort and style. Whether you need a luxury sofa for your Manhattan loft or a refined open-plan layout for your Brooklyn brownstone, our team specializes in high-end living room remodels that reflect your taste and lifestyle.\n\nFrom living room layout consultation to bespoke cabinetry and lighting, our NYC interior designers create **cohesive, functional, and stunning living spaces** tailored to you."
        },
          {
            id: 3,
            title: "DINING ROOM",
            image: "https://res.cloudinary.com/designcenter/image/upload/Luxury%20Dining%20Room%20Furniture%20%E2%80%93%20Custom%20Tables%20and%20Seating.avif",
            description: "Discover our **modern dining room design gallery**, featuring fully styled interiors that blend Italian craftsmanship with NYC sophistication. From minimalist dining setups to elegant open-plan concepts, our portfolio includes contemporary dining room decor and stylish dining room ideas tailored to high-end Manhattan and Brooklyn residences.\n\nWhether you're seeking modern dining room images for inspiration or full-service design consultation, we turn your dining space into a **visual and functional centerpiece**."
        },
          {
            id: 4,
            title: "BEDROOM",
            image: "https://res.cloudinary.com/designcenter/image/upload/Custom%20Luxury%20Bedroom%20Design%20%E2%80%93%20High-End%20Interiors%20NYC.avif",
            description: "Indulge in **custom bedroom design in New York** with interiors crafted for elegance, comfort, and timeless sophistication. At D&D Design Center, we curate bespoke bedroom suites featuring Italian-made furnishings, modern aesthetics, and personalized layouts.\n\nWhether it's a master suite in Manhattan or a refined guest room in Brooklyn, our luxury bedroom designs elevate daily rituals into restful experiences. From concept to installation, we deliver **full-service design** that reflects your unique style and the serenity of true craftsmanship."
        },
          {
            id: 6,
            title: "BATHROOM",
            image: "https://res.cloudinary.com/designcenter/image/upload/Luxury%20Bathroom%20Design%20%E2%80%93%20Bespoke%20Vanities%20and%20Interiors.avif",
            description: "Transform your bathroom design in New York with **bespoke vanities, luxury fixtures, and handcrafted surfaces** made for timeless sophistication. Our NYC clients choose us for our Italian-designed bathrooms that balance serenity and style, from spa-inspired layouts to bold, modern expressions.\n\nWhether you're renovating a Manhattan condo or building your dream bathroom in Brooklyn, we deliver **high-end design solutions** that reflect your taste and elevate everyday routines. Discover why bathroom design NYC is evolving with custom artistry and refined materials."
        },
          {
            id: 8,
            title: "OFFICE",
            image: "https://res.cloudinary.com/designcenter/image/upload/Bespoke%20Office%20Furniture%20%E2%80%93%20Luxury%20Workspaces%20NYC.avif",
            description: "Design your ideal office in New York with our collection of **custom Italian furniture** tailored for workspaces that blend sophistication with performance. Whether you're building a luxury home office in Brooklyn or curating a high-end executive suite in Manhattan, our handcrafted desks, cabinetry, and seating deliver both style and productivity.\n\nWith premium materials and **bespoke craftsmanship**, every piece reflects the elegance expected by New York professionals. Explore our office furniture collections designed for modern living and refined tastes."
        },
          {
            id: 9,
            title: "CLOSET",
            image: "https://res.cloudinary.com/designcenter/image/upload/Closet_Designed_For_Modern_Homes.avif",
            description: "Create your dream closet in New York with **custom Italian craftsmanship** tailored to your lifestyle. Whether you're upgrading to a walk-in closet in a Manhattan penthouse or refining your Brooklyn brownstone wardrobe, we specialize in bespoke closet systems designed for luxury, function, and elegance.\n\nOur closet designers in NYC use only the finest materials to craft **personalized storage solutions** that elevate your everyday routine. Discover why custom closet design in NYC starts with timeless aesthetics and tailored perfection."
        },
          {
            id: 5,
            title: "LIGHTS",
            image: "https://res.cloudinary.com/designcenter/image/upload/Luxury%20Lighting%20Design%20%E2%80%93%20Modern%20Fixtures%20for%20High-End%20Homes.avif",
            description: "Illuminate your home with **expert lighting design in New York**, featuring curated fixtures from Italy's most revered design houses. Our luxury lighting collection blends architectural form and functional brilliance—ideal for Manhattan penthouses, Brooklyn brownstones, and modern lofts alike.\n\nWhether you're sourcing a designer chandelier or planning a full lighting redesign with our specialists, we deliver **elegance, efficiency, and atmosphere**. Explore bespoke lighting NYC clients trust for high-end interiors that shine with personality."
        },
          {
            id: 7,
            title: "OUTDOOR",
            image: "https://res.cloudinary.com/designcenter/image/upload/Luxury%20Outdoor%20Furniture%20%E2%80%93%20Custom%20Patio%20and%20Terrace%20Designs.avif",
            description: "Bring your terrace to life with **luxury outdoor furniture** and terrace design in New York tailored to your lifestyle. Whether it's a rooftop retreat in Manhattan or a balcony oasis in Brooklyn, we craft bespoke outdoor spaces with Italian-made pieces and refined materials.\n\nFrom custom seating and planters to architectural layouts, our NYC terrace design solutions combine **elegance, comfort, and functionality** for year-round enjoyment. Explore outdoor living elevated by craftsmanship and style."
        },
    ],
  };

function Feature197Demo() {
  // Example implementation with a mock trigger function
  const demoTriggerFooterContact = () => {
    alert("Contact form would appear here in the real implementation");
    // In real implementation, this would scroll to or open the contact form
  };

  return <Feature197 {...demoData} triggerFooterContact={demoTriggerFooterContact} />;
}

export { Feature197, Feature197Demo };