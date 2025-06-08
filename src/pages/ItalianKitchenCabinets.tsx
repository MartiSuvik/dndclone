import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Star, CheckCircle2, MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';

// Custom hook to fade in elements when they come into view
const useFadeIn = (threshold = 0.1, triggerOnce = true) => {
  const { ref, inView } = useInView({ threshold, triggerOnce });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  return { ref, hasAnimated: inView || hasAnimated };
};

interface FAQProps {
  question: string;
  answer: string;
}

const FAQ = ({ question, answer }: FAQProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button 
        className="w-full text-left py-5 flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h4 className="text-lg font-medium text-gray-900">{question}</h4>
        {isOpen ? 
          <ChevronUp className="w-5 h-5 text-gray-500" /> : 
          <ChevronDown className="w-5 h-5 text-gray-500" />
        }
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-700">{answer}</p>
      </div>
    </div>
  );
};

const ItalianKitchenCabinets = () => {
  const { ref: heroRef, hasAnimated: heroAnimated } = useFadeIn();
  const { ref: showcaseRef, hasAnimated: showcaseAnimated } = useFadeIn();
  const { ref: ctaRef, hasAnimated: ctaAnimated } = useFadeIn();
  const { ref: contentRef } = useFadeIn();
  const { ref: testimonialsRef, hasAnimated: testimonialsAnimated } = useFadeIn();
  const { ref: logosRef, hasAnimated: logosAnimated } = useFadeIn();
  
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Function to handle consultation form submission
  const handleConsultation = () => {
    const footerElement = document.querySelector('#footer');
    if (footerElement instanceof HTMLElement) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
      setTimeout(() => {
        const footerContactBtn = document.querySelector('[data-footer-contact]') as HTMLButtonElement;
        if (footerContactBtn) {
          footerContactBtn.click();
        }
      }, 800);
    }
  };

  // Animate kitchen showcase images
  const showcaseImagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showcaseAnimated || !showcaseImagesRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const images = showcaseImagesRef.current.querySelectorAll('img');
    gsap.fromTo(
      images,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.2,
        ease: 'power2.out'
      }
    );
  }, [showcaseAnimated]);

  return (
    <div className="bg-white">
      <Helmet>
        <title>Custom Italian Kitchen Cabinets NYC | D&D Design Center Brooklyn</title>
        <meta 
          name="description" 
          content="Discover handcrafted Italian kitchen cabinets designed for NYC homes. Modern & classic designs at our Brooklyn showroom. Free consultation available." 
        />
        <meta name="keywords" content="italian kitchen cabinets nyc, luxury italian kitchen, modern italian kitchen, custom kitchen cabinets brooklyn, italian kitchen showroom nyc" />
        <link rel="canonical" href="https://dnddesigncenter.com/italian-kitchen-cabinets" />
        <meta property="og:title" content="Custom Italian Kitchen Cabinets NYC | D&D Design Center" />
        <meta property="og:description" content="Luxury Italian kitchen cabinets custom-designed for NYC apartments, brownstones, and townhomes. Visit our Brooklyn showroom." />
        <meta property="og:image" content="https://res.cloudinary.com/designcenter/image/upload/Product_2/Kitchen/Modern/Kitchen_Modern_8.avif" />
        <meta property="og:url" content="https://dnddesigncenter.com/italian-kitchen-cabinets" />
        
        {/* Schema Markup for Local Business */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "D&D Design Center",
            "image": "https://res.cloudinary.com/designcenter/image/upload/DnD_Logo_Transparent.svg",
            "@id": "https://dnddesigncenter.com",
            "url": "https://dnddesigncenter.com",
            "telephone": "+1 718-934-7100",
            "priceRange": "$$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "2615 East 17th Street",
              "addressLocality": "Brooklyn",
              "addressRegion": "NY",
              "postalCode": "11235",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 40.586662,
              "longitude": -73.953265
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "10:00",
                "closes": "19:00"
              }
            ],
            "sameAs": [
              "https://www.facebook.com/dnddesigncenter",
              "https://www.instagram.com/dnddesigncenter"
            ]
          })}
        </script>
        
        {/* Schema Markup for Service */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Italian Kitchen Cabinet Installation",
            "provider": {
              "@type": "LocalBusiness",
              "name": "D&D Design Center",
              "url": "https://dnddesigncenter.com"
            },
            "areaServed": {
              "@type": "City",
              "name": "New York City"
            },
            "description": "Custom Italian kitchen cabinets designed and installed for NYC homes, featuring premium materials and expert craftsmanship.",
            "offers": {
              "@type": "Offer",
              "price": "5000.00-50000.00",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            }
          })}
        </script>
        
        {/* Schema Markup for Product */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Custom Italian Kitchen Cabinets",
            "image": "https://res.cloudinary.com/designcenter/image/upload/Product_2/Kitchen/Modern/Kitchen_Modern_8.avif",
            "description": "Handcrafted Italian kitchen cabinets custom-designed for NYC homes, featuring premium materials and expert craftsmanship.",
            "brand": {
              "@type": "Brand",
              "name": "D&D Design Center"
            },
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "USD",
              "lowPrice": "5000",
              "highPrice": "50000",
              "offerCount": "5"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "87"
            }
          })}
        </script>
      </Helmet>
      
      {/* Hero Section - IMPROVED WITH DARKER OVERLAY AND SINGLE PRIMARY CTA */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: heroAnimated ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Image with darker overlay for better readability */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/designcenter/image/upload/Product_2/Kitchen/Modern/Kitchen_Modern_8.avif" 
            alt="Luxury Italian kitchen cabinets in a modern NYC apartment" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div> {/* Darker overlay */}
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white text-center md:text-left flex flex-col md:flex-row items-center">
          <div className="md:w-3/5 md:pr-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-6 leading-tight">
              Custom Italian Kitchen Cabinets in NYC
            </h1>
            <h2 className="text-xl sm:text-2xl font-light mb-8 italic">
              Designed in Italy. Built for New York living.
            </h2>
            <p className="text-lg mb-10 max-w-xl">
              Discover handcrafted Italian kitchen cabinetry made for discerning New Yorkers. Our Brooklyn-based showroom curates modern and classic kitchen designs using materials sourced directly from Italian artisans. From layout planning to final installation, we bring precision and timeless aesthetics into your space.
            </p>
            
            {/* SIMPLIFIED: Single primary CTA with more visual weight */}
            <button 
              onClick={handleConsultation}
              className="bg-[#D6A85B] hover:bg-[#B48040] text-white px-8 py-4 text-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2 min-w-[250px] min-h-[54px] shadow-lg mx-auto md:mx-0"
            >
              Schedule Free Consultation
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="md:w-2/5 hidden lg:block">
            {/* Extra visual element for desktop */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg mt-12 max-w-md ml-auto border border-white/10">
              <div className="flex items-center mb-5 gap-2">
                <div className="w-3 h-3 bg-[#D6A85B] rounded-full"></div>
                <p className="text-sm uppercase tracking-wider font-medium">Serving NYC Since 2006</p>
              </div>
              <h3 className="text-2xl mb-4 font-serif">Why Choose Our Italian Cabinets?</h3>
              <ul className="space-y-3">
                {[
                  "Designed for NYC apartment dimensions",
                  "Premium materials sourced from Italy",
                  "Custom-built to your exact specifications",
                  "Expert installation included"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#D6A85B] flex-shrink-0 mt-0.5" />
                    <span className="text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Video Section - NEW */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Video */}
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src="https://player.cloudinary.com/embed/?cloud_name=designcenter&public_id=Kitchen-remodel&profile=cld-default"
                    width="360"
                    height="640" 
                    style={{ height: 'auto', width: '100%', aspectRatio: '360 / 640' }}
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    allowFullScreen
                    frameBorder="0"
                    title="Kitchen Remodel Process Video"
                  />
                </div>
              </div>
              
              {/* Text Content */}
              <div className="lg:pl-8">
                <h2 className="text-3xl sm:text-4xl font-serif mb-8 text-[#2C3E2D]">
                  What You Can Expect From Us
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#D6A85B] flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2 text-gray-900">Initial Consultation & Design</h3>
                      <p className="text-gray-700">We'll discuss your vision, measure your space, and create custom designs that maximize both style and functionality for your NYC home.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#D6A85B] flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2 text-gray-900">Expert Craftsmanship</h3>
                      <p className="text-gray-700">Your cabinets are handcrafted in Italy using premium materials and traditional techniques, ensuring exceptional quality and durability.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#D6A85B] flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2 text-gray-900">Professional Installation</h3>
                      <p className="text-gray-700">Our experienced team handles every detail of the installation process, working within NYC building requirements and co-op regulations.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#D6A85B] flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">4</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2 text-gray-900">Ongoing Support</h3>
                      <p className="text-gray-700">We provide comprehensive warranty coverage and ongoing support to ensure your Italian kitchen continues to perform beautifully for years to come.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Showcase Section - IMPROVED WITH EQUAL-SIZED COLUMNS */}
      <section 
        ref={showcaseRef}
        className="py-20 sm:py-28 bg-gray-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced section header with visual separator */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-6 text-[#2C3E2D]">
              Luxury Italian Kitchen Designs That Fit NYC Homes
            </h2>
            <div className="w-24 h-1 bg-[#D6A85B] mx-auto my-6"></div>
            <p className="text-lg text-gray-700">
              Whether you're after clean-lined modern cabinets or detailed traditional joinery, our curated kitchen collections include exclusive finishes, hardware, and design options. Each kitchen is built for real-life use in New York apartments, brownstones, and townhomes — without compromising on Italian craftsmanship.
            </p>
          </div>
          
          {/* SIMPLIFIED: 3 key styles in equal-sized columns with uniform aspect ratios */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12" ref={showcaseImagesRef}>
            {[
              {
                src: "https://res.cloudinary.com/designcenter/image/upload/Product_2/Kitchen/Modern/Kitchen_Modern_5.avif",
                alt: "Modern Italian kitchen cabinets with sleek hardware in NYC apartment",
                title: "Modern Elegance",
                desc: "Sleek lines with integrated appliances"
              },
              {
                src: "https://res.cloudinary.com/designcenter/image/upload/Product_2/Kitchen/Traditional/Kitchen_Traditional_8.avif",
                alt: "Traditional Italian kitchen design for brownstone home in Brooklyn",
                title: "Classic Heritage",
                desc: "Timeless designs with detailed craftsmanship"
              },
              {
                src: "https://res.cloudinary.com/designcenter/image/upload/Product_2/Kitchen/Art_Deco/Kitchen_Art_Deco_16.avif",
                alt: "Art Deco Italian kitchen cabinets for luxury NYC condo",
                title: "Art Deco Sophistication",
                desc: "Bold geometry with artistic flair"
              }
            ].map((item, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-md bg-white h-full transform transition-transform hover:translate-y-[-5px] hover:shadow-xl cursor-pointer">
                <div className="aspect-w-4 aspect-h-3"> {/* Uniform aspect ratio */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-serif mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Features block with improved spacing */}
          <div className="mt-24 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-10">
              <h3 className="text-2xl font-serif mb-8 text-center text-gray-900">Key Features of Our Italian Kitchen Cabinets</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  "Soft-close Italian cabinet systems",
                  "Natural wood veneers + high-gloss lacquer",
                  "Integrated European appliance layouts",
                  "Tailored to NYC building codes",
                  "Customizable internal organization",
                  "Premium hardware options",
                  "Space-maximizing corner solutions",
                  "Moisture-resistant materials for NYC climate"
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#D6A85B] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trust Logos Section - SEPARATED FOR BETTER BREATHING ROOM */}
      <section
        ref={logosRef}
        className="py-16 bg-[#F8F8F8]"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-serif mb-6 text-gray-900">Partnering with Italy's Finest Brands</h2>
              <div className="w-16 h-0.5 bg-[#D6A85B] mx-auto"></div>
            </div>
            
            {/* IMPROVED: Single row logo display with more white space */}
            <motion.div 
              className="flex flex-wrap justify-center items-center gap-12 sm:gap-16 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: logosAnimated ? 1 : 0, y: logosAnimated ? 0 : 20 }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="https://res.cloudinary.com/designcenter/image/upload/t_crop/Aster_Logo.svg" 
                alt="Aster Cucine" 
                className="h-14 sm:h-20 w-auto object-contain"
                loading="lazy"
              />
              <img 
                src="https://res.cloudinary.com/designcenter/image/upload/Visionnaire_Logo_Brand.svg" 
                alt="Visionnaire" 
                className="h-14 sm:h-20 w-auto object-contain"
                loading="lazy"
              />
              <img 
                src="https://res.cloudinary.com/designcenter/image/upload/Longhi_Logo.svg" 
                alt="Longhi" 
                className="h-14 sm:h-20 w-auto object-contain"
                loading="lazy"
              />
              <img 
                src="https://res.cloudinary.com/designcenter/image/upload/Prestige_Logo.svg" 
                alt="Prestige" 
                className="h-14 sm:h-20 w-auto object-contain"
                loading="lazy"
              />
            </motion.div>
            
            {/* Reviews */}
            <div className="mt-10 text-center">
              <p className="text-xl font-serif mb-4">Serving NYC since 2006</p>
              <div className="flex justify-center items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-[#D6A85B] text-[#D6A85B]" />
                ))}
              </div>
              <p className="text-lg">4.9/5 based on 87 reviews</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Consultation CTA Section */}
      <section 
        ref={ctaRef} 
        className="py-20 sm:py-28 bg-[#1A1A1A] relative overflow-hidden"
      >
        {/* Background Image with stronger overlay */}
        <div className="absolute inset-0 opacity-10"> {/* Reduced opacity */}
          <img 
            src="https://res.cloudinary.com/designcenter/image/upload/Product_2/Kitchen/Traditional/Kitchen_Traditional_3.avif" 
            alt="Background Italian kitchen design" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <motion.div 
          className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: ctaAnimated ? 1 : 0, y: ctaAnimated ? 0 : 20 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-8">
              Let's Design Your Ideal Italian Kitchen
            </h2>
            <p className="text-lg sm:text-xl mb-10 leading-relaxed">
              Start with a one-on-one consultation at our Brooklyn kitchen showroom or virtually. We'll help you select cabinetry styles, materials, and layouts tailored to your space. Since 2006, we've completed over 100 kitchen remodels across NYC.
            </p>
            
            {/* SIMPLIFIED: Single, prominent CTA */}
            <button 
              onClick={handleConsultation}
              className="bg-[#D6A85B] hover:bg-[#B48040] text-white px-10 py-5 text-xl font-medium transition-colors duration-300 flex items-center mx-auto justify-center gap-2 min-h-[56px] shadow-lg"
            >
              Schedule Your Free Consultation
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </section>
      
      {/* Supporting Content Section with improved visual hierarchy */}
      <section 
        ref={contentRef} 
        className="py-20 sm:py-28 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Improved section heading with visual separator */}
            <h2 className="text-3xl sm:text-4xl font-serif mb-4 text-center text-[#2C3E2D]">
              Why Choose Italian Cabinets for New York Homes?
            </h2>
            <div className="w-24 h-1 bg-[#D6A85B] mx-auto mb-10"></div>
            
            <div className="prose prose-lg mx-auto mt-8">
              <p className="text-lg leading-relaxed text-gray-700">
                Italian cabinetry is known for its precision, aesthetic balance, and longevity. Unlike generic kitchen packages, our offerings blend artisanal design with spatial efficiency — ideal for Manhattan lofts, Brooklyn brownstones, and modern condos alike. Every project is planned with function and style in mind. From door hardware to integrated lighting, no detail is overlooked.
              </p>
              
              <h3 className="text-2xl font-serif mt-12 mb-6 text-gray-900">The Italian Craftsmanship Advantage</h3>
              <p className="text-lg leading-relaxed text-gray-700">
                Italian cabinet makers are renowned for their attention to detail and quality materials. Our cabinetry features:
              </p>
              <ul className="space-y-3 my-6">
                {[
                  "Superior joinery techniques that ensure decades of use",
                  "Premium hardware that maintains smooth operation for years",
                  "Innovative space-saving designs perfect for NYC's compact living",
                  "Eco-friendly materials and finishes for healthier homes"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#D6A85B] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              
              <h3 className="text-2xl font-serif mt-12 mb-6 text-gray-900">Designed for New York Living</h3>
              <p className="text-lg leading-relaxed text-gray-700">
                We understand the unique challenges of New York City homes. Our cabinets are designed to:
              </p>
              <ul className="space-y-3 my-6">
                {[
                  "Maximize storage in limited square footage",
                  "Withstand NYC's humidity fluctuations without warping",
                  "Navigate narrow hallways and elevators during installation",
                  "Comply with all building regulations and co-op requirements"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#D6A85B] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/italian-closets-nyc" className="text-[#D6A85B] hover:text-[#B48040] font-medium text-lg inline-flex items-center">
                  Need custom Italian closet solutions?
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link to="/bathroom-vanities-nyc" className="text-[#D6A85B] hover:text-[#B48040] font-medium text-lg inline-flex items-center">
                  See matching bathroom vanities
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* FAQ Section with Accordion functionality */}
          <div className="mt-24 max-w-3xl mx-auto">
            <div className="border-t border-gray-200 pt-12">
              <h3 className="text-2xl font-serif mb-8 text-center text-gray-900">
                Frequently Asked Questions
              </h3>
              
              <div className="space-y-0 mt-8">
                {[
                  {
                    q: "How long does it take to get Italian kitchen cabinets in NYC?",
                    a: "Most projects take 12-16 weeks from design approval to installation, including shipping from Italy. Rush options are available for some collections."
                  },
                  {
                    q: "Do you provide installation services?",
                    a: "Yes, our experienced installation team handles all aspects of the installation process, ensuring a perfect fit and finish for your new Italian kitchen cabinets."
                  },
                  {
                    q: "Can I customize the finishes and hardware?",
                    a: "Absolutely. We offer a wide range of custom finishes, hardware options, and internal accessories to create a kitchen that's uniquely yours."
                  },
                  {
                    q: "What's the typical price range for Italian kitchen cabinets?",
                    a: "Our Italian kitchen cabinetry typically ranges from $30,000 to $100,000+ depending on size, materials, and customization. We work with various budgets and offer financing options."
                  },
                  {
                    q: "Do you work with architects and contractors?",
                    a: "Yes, we frequently collaborate with architects, designers, and contractors. We can join your existing team or help you assemble the right professionals for your project."
                  }
                ].map((faq, index) => (
                  <FAQ key={index} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section 
        ref={testimonialsRef}
        className="py-20 sm:py-28 bg-gray-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-serif mb-4 text-center text-[#2C3E2D]">
            What NYC Homeowners Say
          </h2>
          <div className="w-24 h-1 bg-[#D6A85B] mx-auto mb-16"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                quote: "The Italian cabinets from D&D transformed our Upper East Side apartment kitchen. The quality is exceptional, and they designed around our building's constraints perfectly.",
                name: "Jennifer L.",
                location: "Upper East Side, Manhattan"
              },
              {
                quote: "After searching every kitchen showroom in NYC, we found exactly what we wanted at D&D. Their Italian cabinets are both beautiful and incredibly functional for our Park Slope brownstone.",
                name: "Michael T.",
                location: "Park Slope, Brooklyn"
              },
              {
                quote: "The team at D&D guided us through every step of creating our dream Italian kitchen. The materials are stunning, and the installation was flawless despite our building's strict renovation rules.",
                name: "Sophia C.",
                location: "Tribeca, Manhattan"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: testimonialsAnimated ? 1 : 0, y: testimonialsAnimated ? 0 : 20 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white p-8 rounded-lg shadow-lg border border-gray-100"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#D6A85B] text-[#D6A85B]" />
                  ))}
                </div>
                <p className="text-gray-700 mb-8 italic leading-relaxed text-lg">"{testimonial.quote}"</p>
                <div>
                  <p className="font-medium text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <button 
              onClick={handleConsultation}
              className="bg-[#D6A85B] hover:bg-[#B48040] text-white px-10 py-5 text-xl font-medium transition-colors duration-300 flex items-center mx-auto justify-center gap-2 min-h-[56px] shadow-lg"
            >
              Request Your Kitchen Design Consultation
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>
      
      {/* Location Section */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-serif mb-4 text-center text-[#2C3E2D]">
              Visit Our Italian Kitchen Showroom in Brooklyn
            </h2>
            <div className="w-24 h-1 bg-[#D6A85B] mx-auto mb-16"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-lg mb-8 leading-relaxed text-gray-700">
                  Experience our Italian kitchen collections in person at our Brooklyn showroom. Touch the materials, see the craftsmanship up close, and envision how these designs will transform your NYC home.
                </p>
                
                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#D6A85B] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-xl mb-1">Our Location</h3>
                      <p className="text-gray-700">2615 East 17th Street, Brooklyn, NY 11235</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#D6A85B] flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-xl mb-1">Hours</h3>
                      <p className="text-gray-700">Monday-Sunday: 10:00 AM - 7:00 PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
                  <a 
                    href="https://goo.gl/maps/xJZK1e5W5K3WQvLK9" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#D6A85B] text-white hover:bg-[#B48040] transition-colors duration-300 font-medium min-h-[48px]"
                  >
                    Get Directions
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  
                  <a 
                    href="tel:+17189347100" 
                    className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#D6A85B] text-[#D6A85B] hover:bg-[#D6A85B] hover:text-white transition-colors duration-300 font-medium min-h-[48px]"
                  >
                    <Phone className="w-5 h-5" />
                    (718) 934-7100
                  </a>
                </div>
              </div>
              
              <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
                <iframe
                  title="D&D Design Center Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3028.908548691334!2d-73.9555435!3d40.5864611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c244357e142439%3A0x9a38397e6c75764!2s2615%20E%2017th%20St%2C%20Brooklyn%2C%20NY%2011235!5e0!3m2!1sen!2sus!4v1650123456789!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-20 bg-[#1A1A1A] text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-serif mb-8">
            Ready to Transform Your NYC Kitchen?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Let's create a custom Italian kitchen that perfectly suits your New York City lifestyle.
          </p>
          <button 
            onClick={handleConsultation}
            className="bg-[#D6A85B] hover:bg-[#B48040] text-white px-10 py-5 text-xl font-medium transition-colors duration-300 flex items-center mx-auto justify-center gap-2 min-h-[56px] shadow-lg"
          >
            Start Your Kitchen Journey
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ItalianKitchenCabinets;