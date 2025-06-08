import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Star, CheckCircle2 } from 'lucide-react';
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

const ItalianKitchenCabinets = () => {
  const { ref: heroRef, hasAnimated: heroAnimated } = useFadeIn();
  const { ref: showcaseRef, hasAnimated: showcaseAnimated } = useFadeIn();
  const { ref: ctaRef, hasAnimated: ctaAnimated } = useFadeIn();
  const { ref: contentRef, hasAnimated: contentAnimated } = useFadeIn();
  const { ref: testimonialsRef, hasAnimated: testimonialsAnimated } = useFadeIn();
  
  const [isDesktop, setIsDesktop] = useState(false);
  
  // Check if we're on desktop
  useEffect(() => {
    const checkIfDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkIfDesktop();
    window.addEventListener('resize', checkIfDesktop);
    return () => window.removeEventListener('resize', checkIfDesktop);
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
      
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: heroAnimated ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/designcenter/image/upload/Product_2/Kitchen/Modern/Kitchen_Modern_8.avif" 
            alt="Luxury Italian kitchen cabinets in a modern NYC apartment" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white text-center md:text-left flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-4 leading-tight">
              Custom Italian Kitchen Cabinets in NYC
            </h1>
            <h2 className="text-xl sm:text-2xl font-light mb-8 italic">
              Designed in Italy. Built for New York living.
            </h2>
            <p className="text-lg mb-8 max-w-xl">
              Discover handcrafted Italian kitchen cabinetry made for discerning New Yorkers. Our Brooklyn-based showroom curates modern and classic kitchen designs using materials sourced directly from Italian artisans. From layout planning to final installation, we bring precision and timeless aesthetics into your space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleConsultation}
                className="bg-[#C5A267] hover:bg-[#B49157] text-white px-6 py-3 text-base font-medium transition-colors duration-300 flex items-center justify-center gap-2 min-w-[200px] min-h-[44px]"
              >
                Schedule Free Consultation
                <ArrowRight className="w-5 h-5" />
              </button>
              <a 
                href="tel:+17189347100" 
                className="border border-white hover:bg-white/20 text-white px-6 py-3 text-base font-medium transition-colors duration-300 flex items-center justify-center gap-2 min-w-[200px] min-h-[44px]"
              >
                <Phone className="w-5 h-5" />
                Call For Pricing
              </a>
            </div>
          </div>
          
          <div className="md:w-1/2 hidden lg:block">
            {/* Extra visual element for desktop */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg mt-12 max-w-md ml-auto">
              <div className="flex items-center mb-4 gap-2">
                <div className="w-3 h-3 bg-[#C5A267] rounded-full"></div>
                <p className="text-sm uppercase tracking-wider font-medium">Serving NYC Since 2006</p>
              </div>
              <h3 className="text-xl mb-3 font-medium">Why Choose Our Italian Cabinets?</h3>
              <ul className="space-y-2">
                {[
                  "Designed for NYC apartment dimensions",
                  "Premium materials sourced from Italy",
                  "Custom-built to your exact specifications",
                  "Expert installation included"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#C5A267] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* Showcase Section */}
      <section 
        ref={showcaseRef}
        className="py-16 sm:py-24 bg-gray-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-6">
              Luxury Italian Kitchen Designs That Fit NYC Homes
            </h2>
            <p className="text-lg text-gray-700">
              Whether you're after clean-lined modern cabinets or detailed traditional joinery, our curated kitchen collections include exclusive finishes, hardware, and design options. Each kitchen is built for real-life use in New York apartments, brownstones, and townhomes — without compromising on Italian craftsmanship.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12" ref={showcaseImagesRef}>
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
              },
              {
                src: "https://res.cloudinary.com/designcenter/image/upload/Product_2/Kitchen/Modern/Kitchen_Modern_12.avif",
                alt: "Minimalist Italian kitchen cabinets for Manhattan loft",
                title: "Urban Minimalism",
                desc: "Simplified elegance for contemporary living"
              },
              {
                src: "https://res.cloudinary.com/designcenter/image/upload/Product_2/Kitchen/Modern/Kitchen_Modern_30.avif",
                alt: "Luxury Italian kitchen with island for NYC townhome",
                title: "Statement Island",
                desc: "Centerpiece designs for entertaining"
              },
              {
                src: "https://res.cloudinary.com/designcenter/image/upload/Product_2/Kitchen/Art_Deco/Kitchen_Art_Deco_2.avif",
                alt: "Custom Italian kitchen design for compact NYC apartment",
                title: "Space-Optimized",
                desc: "Ingenious solutions for NYC dimensions"
              }
            ].map((item, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-md bg-white h-full transform transition-transform hover:scale-[1.02] cursor-pointer group">
                <div className="aspect-w-4 aspect-h-3">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-serif mb-6 text-center">Key Features of Our Italian Kitchen Cabinets</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <CheckCircle2 className="w-5 h-5 text-[#C5A267] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Consultation CTA Section */}
      <section 
        ref={ctaRef} 
        className="py-16 sm:py-24 bg-[#1A1A1A] relative overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
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
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-6">
              Let's Design Your Ideal Italian Kitchen
            </h2>
            <p className="text-lg sm:text-xl mb-8">
              Start with a one-on-one consultation at our Brooklyn kitchen showroom or virtually. We'll help you select cabinetry styles, materials, and layouts tailored to your space. Since 2006, we've completed over 100 kitchen remodels across NYC.
            </p>
            <button 
              onClick={handleConsultation}
              className="bg-[#C5A267] hover:bg-[#B49157] text-white px-8 py-4 text-xl font-medium transition-colors duration-300 flex items-center mx-auto justify-center gap-2 min-h-[52px]"
            >
              Schedule Your Free Consultation
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <div className="mt-16">
              <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 mb-8">
                <img 
                  src="https://res.cloudinary.com/designcenter/image/upload/t_crop/Aster_Logo.svg" 
                  alt="Aster Cucine" 
                  className="h-12 sm:h-16 w-auto object-contain filter invert"
                  loading="lazy"
                />
                <img 
                  src="https://res.cloudinary.com/designcenter/image/upload/Visionnaire_Logo_Brand.svg" 
                  alt="Visionnaire" 
                  className="h-12 sm:h-16 w-auto object-contain filter invert"
                  loading="lazy"
                />
                <img 
                  src="https://res.cloudinary.com/designcenter/image/upload/Longhi_Logo.svg" 
                  alt="Longhi" 
                  className="h-12 sm:h-16 w-auto object-contain filter invert"
                  loading="lazy"
                />
                <img 
                  src="https://res.cloudinary.com/designcenter/image/upload/Prestige_Logo.svg" 
                  alt="Prestige" 
                  className="h-12 sm:h-16 w-auto object-contain filter invert"
                  loading="lazy"
                />
              </div>
              
              <p className="text-lg font-serif">Serving NYC since 2006</p>
            </div>
            
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#C5A267] text-[#C5A267]" />
                ))}
                <span className="ml-2 text-lg">4.9/5 based on 87 reviews</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Supporting Content Section */}
      <section 
        ref={contentRef} 
        className="py-16 sm:py-24 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-serif mb-6 text-center">
              Why Choose Italian Cabinets for New York Homes?
            </h2>
            
            <div className="prose prose-lg mx-auto mt-8">
              <p>
                Italian cabinetry is known for its precision, aesthetic balance, and longevity. Unlike generic kitchen packages, our offerings blend artisanal design with spatial efficiency — ideal for Manhattan lofts, Brooklyn brownstones, and modern condos alike. Every project is planned with function and style in mind. From door hardware to integrated lighting, no detail is overlooked.
              </p>
              
              <h3>The Italian Craftsmanship Advantage</h3>
              <p>
                Italian cabinet makers are renowned for their attention to detail and quality materials. Our cabinetry features:
              </p>
              <ul>
                <li>Superior joinery techniques that ensure decades of use</li>
                <li>Premium hardware that maintains smooth operation for years</li>
                <li>Innovative space-saving designs perfect for NYC's compact living</li>
                <li>Eco-friendly materials and finishes for healthier homes</li>
              </ul>
              
              <h3>Designed for New York Living</h3>
              <p>
                We understand the unique challenges of New York City homes. Our cabinets are designed to:
              </p>
              <ul>
                <li>Maximize storage in limited square footage</li>
                <li>Withstand NYC's humidity fluctuations without warping</li>
                <li>Navigate narrow hallways and elevators during installation</li>
                <li>Comply with all building regulations and co-op requirements</li>
              </ul>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/italian-closets-nyc" className="text-[#C5A267] hover:text-[#B49157] font-medium">
                  Need custom Italian closet solutions? &rarr;
                </Link>
                <Link to="/bathroom-vanities-nyc" className="text-[#C5A267] hover:text-[#B49157] font-medium">
                  See matching bathroom vanities. &rarr;
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="border-t border-gray-200 pt-12">
              <h3 className="text-2xl font-serif mb-6 text-center">
                Frequently Asked Questions
              </h3>
              
              <div className="space-y-6">
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
                  <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
                    <h4 className="text-lg font-medium mb-2">{faq.q}</h4>
                    <p className="text-gray-700">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section 
        ref={testimonialsRef}
        className="py-16 sm:py-24 bg-gray-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-serif mb-12 text-center">
            What NYC Homeowners Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#C5A267] text-[#C5A267]" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button 
              onClick={handleConsultation}
              className="bg-[#C5A267] hover:bg-[#B49157] text-white px-8 py-4 text-lg font-medium transition-colors duration-300 flex items-center mx-auto justify-center gap-2 min-h-[52px]"
            >
              Request Your Kitchen Design Consultation
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
      
      {/* Location Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-serif mb-8 text-center">
              Visit Our Italian Kitchen Showroom in Brooklyn
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg mb-6">
                  Experience our Italian kitchen collections in person at our Brooklyn showroom. Touch the materials, see the craftsmanship up close, and envision how these designs will transform your NYC home.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#C5A267] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">Our Location</h3>
                      <p>2615 East 17th Street, Brooklyn, NY 11235</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#C5A267] flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">Hours</h3>
                      <p>Monday-Sunday: 10:00 AM - 7:00 PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-x-4">
                  <a 
                    href="https://goo.gl/maps/xJZK1e5W5K3WQvLK9" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-[#C5A267] text-[#C5A267] hover:bg-[#C5A267] hover:text-white transition-colors duration-300 font-medium"
                  >
                    Get Directions
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  
                  <a 
                    href="tel:+17189347100" 
                    className="inline-flex items-center gap-2 px-4 py-2 border border-[#C5A267] text-[#C5A267] hover:bg-[#C5A267] hover:text-white transition-colors duration-300 font-medium"
                  >
                    <Phone className="w-5 h-5" />
                    (718) 934-7100
                  </a>
                </div>
              </div>
              
              <div className="h-[400px] rounded-lg overflow-hidden shadow-md">
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
      <section className="py-16 sm:py-24 bg-[#1A1A1A] text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-serif mb-6">
            Ready to Transform Your NYC Kitchen?
          </h2>
          <p className="text-xl mb-8">
            Let's create a custom Italian kitchen that perfectly suits your New York City lifestyle.
          </p>
          <button 
            onClick={handleConsultation}
            className="bg-[#C5A267] hover:bg-[#B49157] text-white px-8 py-4 text-xl font-medium transition-colors duration-300 flex items-center mx-auto justify-center gap-2 min-h-[52px]"
          >
            Start Your Kitchen Journey
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ItalianKitchenCabinets;