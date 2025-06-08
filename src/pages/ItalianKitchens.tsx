import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { ChevronDown, ChevronUp, Star, MapPin, Phone, Mail, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Kitchen style type definition
interface KitchenStyle {
  id: string;
  name: string;
  description: string;
  image: string;
  features: string[];
}

// FAQ type definition
interface FAQ {
  question: string;
  answer: string;
}

const ItalianKitchens: React.FC = () => {
  // State for mobile interactions
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [activeStyle, setActiveStyle] = useState<string>('modern');
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [expandedText, setExpandedText] = useState<{ [key: string]: boolean }>({});
  const [isMobile, setIsMobile] = useState(false);

  // Refs for animations
  const heroRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);
  
  // Intersection observer hooks for lazy loading and animations
  const { ref: benefitsRef, inView: benefitsInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  
  const { ref: stylesRef, inView: stylesInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animation for hero section
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    if (heroRef.current && ctaButtonRef.current) {
      tl.fromTo(
        heroRef.current.querySelector('h1'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }
      ).fromTo(
        heroRef.current.querySelector('p'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      ).fromTo(
        ctaButtonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      );
    }
  }, []);

  // Animation for benefits section
  useEffect(() => {
    if (!benefitsInView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const benefits = document.querySelectorAll('.benefit-item');
    
    gsap.fromTo(
      benefits,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.15, 
        duration: 0.6,
        ease: "power2.out"
      }
    );
  }, [benefitsInView]);

  // Animation for styles section
  useEffect(() => {
    if (!stylesInView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const styles = document.querySelectorAll('.style-card');
    
    gsap.fromTo(
      styles,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.2, 
        duration: 0.7,
        ease: "power2.out"
      }
    );
  }, [stylesInView]);

  // Animation for testimonials section
  useEffect(() => {
    if (!testimonialsInView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    gsap.fromTo(
      testimonials,
      { opacity: 0, scale: 0.95 },
      { 
        opacity: 1, 
        scale: 1, 
        stagger: 0.2, 
        duration: 0.6,
        ease: "back.out(1.2)"
      }
    );
  }, [testimonialsInView]);

  // Toggle accordion sections
  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  // Toggle text expansion
  const toggleTextExpansion = (id: string) => {
    setExpandedText(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simulate form submission
      setFormStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
        setFormStatus('idle');
        setShowContactForm(false);
      }, 3000);
    } catch (error) {
      setFormStatus('error');
    }
  };

  // Trigger footer contact form
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

  // Kitchen styles data
  const kitchenStyles: KitchenStyle[] = [
    {
      id: 'modern',
      name: 'Modern Italian',
      description: 'Clean lines, minimalist design, and innovative materials define our modern Italian kitchens. Perfect for contemporary NYC apartments and lofts.',
      image: 'https://res.cloudinary.com/designcenter/image/upload/v1744048199/Product_2/Kitchen/Modern/Kitchen_Modern_8.avif',
      features: [
        'Handleless cabinet designs',
        'High-gloss or matte lacquer finishes',
        'Integrated appliances',
        'Sleek, minimalist hardware',
        'Smart storage solutions'
      ]
    },
    {
      id: 'traditional',
      name: 'Traditional Italian',
      description: 'Timeless elegance with rich details and warm tones. Ideal for brownstones and classic New York homes seeking old-world charm with modern functionality.',
      image: 'https://res.cloudinary.com/designcenter/image/upload/v1744045922/Product_2/Kitchen/Traditional/Kitchen_Traditional_1.avif',
      features: [
        'Ornate cabinet detailing',
        'Natural wood finishes',
        'Decorative moldings and cornices',
        'Classic hardware and fixtures',
        'Warm, inviting color palette'
      ]
    },
    {
      id: 'artdeco',
      name: 'Art Deco Italian',
      description: 'Bold geometric patterns and luxurious materials create a statement kitchen with unmistakable New York glamour and Italian craftsmanship.',
      image: 'https://res.cloudinary.com/designcenter/image/upload/v1744046401/Product_2/Kitchen/Art_Deco/Kitchen_Art_Deco_1.avif',
      features: [
        'Geometric patterns and motifs',
        'Contrasting materials and textures',
        'Bold color combinations',
        'Metallic accents and inlays',
        'Statement lighting fixtures'
      ]
    }
  ];

  // FAQ data
  const faqs: FAQ[] = [
    {
      question: 'How long does it take to install custom Italian kitchen cabinets?',
      answer: 'The timeline for custom Italian kitchen cabinets typically ranges from 12-16 weeks. This includes 8-10 weeks for production in Italy and 4-6 weeks for shipping and installation in NYC. Our team manages the entire process to ensure a smooth experience from design to completion.'
    },
    {
      question: 'What makes Italian kitchen cabinets different from standard options?',
      answer: 'Italian kitchen cabinets stand out for their superior craftsmanship, innovative design, and premium materials. They feature precision engineering with soft-close mechanisms, higher-grade hardware, and exclusive finishes not available in mass-produced cabinetry. Each piece is made to order with meticulous attention to detail, resulting in exceptional durability and timeless aesthetics.'
    },
    {
      question: 'Do you offer design services for NYC apartments?',
      answer: 'Yes, we specialize in designing Italian kitchens for NYC apartments, condos, and townhomes. Our designers understand the unique challenges of New York spaces and create custom solutions that maximize functionality while maintaining aesthetic excellence. We work within building regulations and can coordinate with your building management for a seamless installation process.'
    },
    {
      question: 'What is the price range for Italian kitchen cabinets?',
      answer: 'Custom Italian kitchen cabinets typically range from $40,000 to $100,000+ depending on size, materials, and complexity. We offer various price points while maintaining the signature Italian quality and design excellence. During your consultation, we'll provide transparent pricing based on your specific needs and preferences.'
    },
    {
      question: 'Can I see samples of your Italian kitchen cabinets?',
      answer: 'Absolutely! We invite you to visit our Brooklyn showroom to experience our Italian kitchen cabinet collections firsthand. You can touch the materials, test the mechanisms, and see the craftsmanship up close. We also offer virtual consultations with digital material samples for clients who prefer remote design services.'
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: 'Sarah L.',
      location: 'Upper East Side, Manhattan',
      text: 'The Italian kitchen cabinets transformed our pre-war apartment completely. The team understood exactly how to blend modern functionality with our home's classic character.',
      rating: 5
    },
    {
      name: 'Michael R.',
      location: 'Brooklyn Heights',
      text: 'From design to installation, the process was seamless. Our kitchen now has that distinctive Italian elegance while perfectly fitting our brownstone's dimensions.',
      rating: 5
    },
    {
      name: 'Jennifer T.',
      location: 'Tribeca',
      text: 'The attention to detail in our custom cabinetry is remarkable. Worth every penny for the quality and the compliments we receive from everyone who visits.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Custom Italian Kitchen Cabinets NYC | D&D Design Center</title>
        <meta 
          name="description" 
          content="Discover handcrafted Italian kitchen cabinetry made for discerning New Yorkers. Our Brooklyn showroom features modern, traditional, and art deco styles for NYC homes."
        />
        <link rel="canonical" href="https://dnddesigncenter.com/italian-kitchens-nyc" />
        
        {/* Schema markup for local business */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "D&D Design Center - Italian Kitchens NYC",
            "image": "https://res.cloudinary.com/designcenter/image/upload/v1744048199/Product_2/Kitchen/Modern/Kitchen_Modern_8.avif",
            "description": "Custom Italian kitchen cabinets and design for NYC homes. Visit our Brooklyn showroom to explore modern, traditional, and art deco styles.",
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
              "latitude": 40.586,
              "longitude": -73.954
            },
            "url": "https://dnddesigncenter.com/italian-kitchens-nyc",
            "telephone": "+17189347100",
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "10:00",
                "closes": "19:00"
              }
            ],
            "priceRange": "$$$"
          })}
        </script>
        
        {/* Schema markup for product */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Custom Italian Kitchen Cabinets",
            "image": "https://res.cloudinary.com/designcenter/image/upload/v1744048199/Product_2/Kitchen/Modern/Kitchen_Modern_8.avif",
            "description": "Handcrafted Italian kitchen cabinetry made for discerning New Yorkers. Available in modern, traditional, and art deco styles.",
            "brand": {
              "@type": "Brand",
              "name": "D&D Design Center"
            },
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "USD",
              "lowPrice": "40000",
              "highPrice": "100000",
              "offerCount": "3"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "27"
            }
          })}
        </script>
        
        {/* Schema markup for service */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Italian Kitchen Design",
            "provider": {
              "@type": "LocalBusiness",
              "name": "D&D Design Center"
            },
            "areaServed": {
              "@type": "City",
              "name": "New York City"
            },
            "description": "Custom Italian kitchen design and installation services for NYC homes. From concept to completion, we create bespoke kitchen spaces with authentic Italian craftsmanship.",
            "offers": {
              "@type": "Offer",
              "price": "40000",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-[80vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: "url('https://res.cloudinary.com/designcenter/image/upload/v1744048199/Product_2/Kitchen/Modern/Kitchen_Modern_8.avif')" 
            }}
          />
          <div className="absolute inset-0 bg-black/60" /> {/* Darker overlay for better text readability */}
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white mb-4 sm:mb-6">
            Custom Italian Kitchen Cabinets in NYC
          </h1>
          <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Designed in Italy. Built for New York living.
          </p>
          <p className="text-base sm:text-lg text-white/80 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Discover handcrafted Italian kitchen cabinetry made for discerning New Yorkers. Our Brooklyn-based showroom curates modern and classic kitchen designs using materials sourced directly from Italian artisans.
          </p>
          <button
            ref={ctaButtonRef}
            onClick={triggerFooterContact}
            className="bg-[#C5A267] hover:bg-[#B49157] text-white px-8 py-4 text-base sm:text-lg font-medium transition-colors duration-300 min-h-[44px] shadow-lg"
          >
            Schedule Free Consultation
          </button>
        </div>
      </section>

      {/* Benefits Section - Mobile Optimized with Expandable Cards */}
      <section 
        ref={benefitsRef}
        className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-serif text-center mb-8 sm:mb-10">
            Why Choose Italian Cabinets for New York Homes?
          </h2>
          
          <div className="space-y-4">
            {/* Benefit 1 - Collapsible on Mobile */}
            <div className="benefit-item bg-white rounded-lg shadow-md overflow-hidden">
              <button 
                className="w-full flex justify-between items-center p-4 text-left"
                onClick={() => toggleAccordion('benefit1')}
                aria-expanded={activeAccordion === 'benefit1'}
              >
                <h3 className="text-lg font-medium">Superior Craftsmanship</h3>
                {activeAccordion === 'benefit1' ? (
                  <ChevronUp className="w-5 h-5 text-[#C5A267]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#C5A267]" />
                )}
              </button>
              
              {activeAccordion === 'benefit1' && (
                <div className="p-4 pt-0 border-t border-gray-100">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Italian cabinetry is known for its precision, aesthetic balance, and longevity. Unlike generic kitchen packages, our offerings blend artisanal design with spatial efficiency — ideal for Manhattan lofts, Brooklyn brownstones, and modern condos alike.
                  </p>
                </div>
              )}
            </div>
            
            {/* Benefit 2 */}
            <div className="benefit-item bg-white rounded-lg shadow-md overflow-hidden">
              <button 
                className="w-full flex justify-between items-center p-4 text-left"
                onClick={() => toggleAccordion('benefit2')}
                aria-expanded={activeAccordion === 'benefit2'}
              >
                <h3 className="text-lg font-medium">Space-Optimized for NYC</h3>
                {activeAccordion === 'benefit2' ? (
                  <ChevronUp className="w-5 h-5 text-[#C5A267]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#C5A267]" />
                )}
              </button>
              
              {activeAccordion === 'benefit2' && (
                <div className="p-4 pt-0 border-t border-gray-100">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Our Italian kitchen designs are specifically adapted for New York City's unique spatial challenges. We maximize storage and functionality without compromising on style, creating kitchens that work efficiently in compact urban spaces.
                  </p>
                </div>
              )}
            </div>
            
            {/* Benefit 3 */}
            <div className="benefit-item bg-white rounded-lg shadow-md overflow-hidden">
              <button 
                className="w-full flex justify-between items-center p-4 text-left"
                onClick={() => toggleAccordion('benefit3')}
                aria-expanded={activeAccordion === 'benefit3'}
              >
                <h3 className="text-lg font-medium">Exclusive Materials</h3>
                {activeAccordion === 'benefit3' ? (
                  <ChevronUp className="w-5 h-5 text-[#C5A267]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#C5A267]" />
                )}
              </button>
              
              {activeAccordion === 'benefit3' && (
                <div className="p-4 pt-0 border-t border-gray-100">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Access premium materials not available through standard retailers. From rare wood veneers to specialized finishes and hardware, our Italian cabinets offer distinctive options that elevate your kitchen beyond the ordinary.
                  </p>
                </div>
              )}
            </div>
            
            {/* Benefit 4 */}
            <div className="benefit-item bg-white rounded-lg shadow-md overflow-hidden">
              <button 
                className="w-full flex justify-between items-center p-4 text-left"
                onClick={() => toggleAccordion('benefit4')}
                aria-expanded={activeAccordion === 'benefit4'}
              >
                <h3 className="text-lg font-medium">Increased Home Value</h3>
                {activeAccordion === 'benefit4' ? (
                  <ChevronUp className="w-5 h-5 text-[#C5A267]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#C5A267]" />
                )}
              </button>
              
              {activeAccordion === 'benefit4' && (
                <div className="p-4 pt-0 border-t border-gray-100">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Italian kitchens are recognized as a premium investment that increases property value. In NYC's competitive real estate market, a custom Italian kitchen can be a significant selling point and differentiator for your home.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Kitchen Styles Section - Swipeable on Mobile */}
      <section 
        ref={stylesRef}
        className="py-12 sm:py-16 px-4 sm:px-6"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-serif text-center mb-8 sm:mb-10">
            Luxury Italian Kitchen Designs That Fit NYC Homes
          </h2>
          
          <p className="text-base text-gray-700 text-center mb-8 max-w-2xl mx-auto">
            Whether you're after clean-lined modern cabinets or detailed traditional joinery, our curated kitchen collections include exclusive finishes, hardware, and design options.
          </p>
          
          {/* Style Selector Tabs - Mobile Friendly */}
          <div className="flex justify-center mb-8 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex space-x-2">
              {kitchenStyles.map(style => (
                <button
                  key={style.id}
                  onClick={() => setActiveStyle(style.id)}
                  className={`px-4 py-2 text-sm whitespace-nowrap min-w-[100px] transition-colors duration-300 ${
                    activeStyle === style.id
                      ? 'bg-[#C5A267] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {style.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Active Style Content */}
          {kitchenStyles.map(style => (
            style.id === activeStyle && (
              <div key={style.id} className="style-card">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={style.image}
                      alt={`${style.name} Italian kitchen cabinets in NYC`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <h3 className="text-xl font-medium mb-3">{style.name}</h3>
                    
                    <p className="text-gray-700 text-sm mb-4">
                      {expandedText[style.id] 
                        ? style.description 
                        : `${style.description.substring(0, 100)}...`}
                      <button
                        onClick={() => toggleTextExpansion(style.id)}
                        className="text-[#C5A267] font-medium ml-1"
                      >
                        {expandedText[style.id] ? 'Read Less' : 'Read More'}
                      </button>
                    </p>
                    
                    <h4 className="text-base font-medium mb-2">Key Features:</h4>
                    <ul className="space-y-2">
                      {style.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#C5A267] mt-1.5 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </section>

      {/* Testimonials Section - Swipeable Cards */}
      <section 
        ref={testimonialsRef}
        className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-serif text-center mb-8 sm:mb-10">
            What NYC Homeowners Say
          </h2>
          
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex space-x-4" style={{ minWidth: 'min-content' }}>
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="testimonial-card flex-shrink-0 w-[280px] sm:w-[320px] bg-white rounded-lg shadow-md p-4 sm:p-6"
                >
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#C5A267] fill-[#C5A267]" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-4 italic">"{testimonial.text}"</p>
                  
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile Swipe Indicator */}
          <div className="flex justify-center mt-4 md:hidden">
            <div className="flex space-x-1">
              <div className="w-8 h-1 bg-[#C5A267] rounded-full" />
              <div className="w-2 h-1 bg-gray-300 rounded-full" />
              <div className="w-2 h-1 bg-gray-300 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Accordion Style */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-serif text-center mb-8 sm:mb-10">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button 
                  className="w-full flex justify-between items-center p-4 text-left"
                  onClick={() => toggleAccordion(`faq${index}`)}
                  aria-expanded={activeAccordion === `faq${index}`}
                >
                  <h3 className="text-base font-medium pr-8">{faq.question}</h3>
                  {activeAccordion === `faq${index}` ? (
                    <ChevronUp className="w-5 h-5 text-[#C5A267] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#C5A267] flex-shrink-0" />
                  )}
                </button>
                
                {activeAccordion === `faq${index}` && (
                  <div className="p-4 pt-0 border-t border-gray-100">
                    <p className="text-gray-700 text-sm">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-[#1A1A1A] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-serif mb-4 sm:mb-6">
            Let's Design Your Ideal Italian Kitchen
          </h2>
          
          <p className="text-white/80 text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Start with a one-on-one consultation at our Brooklyn kitchen showroom or virtually. We'll help you select cabinetry styles, materials, and layouts tailored to your space.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={triggerFooterContact}
              className="bg-[#C5A267] hover:bg-[#B49157] text-white px-6 py-3 text-base font-medium transition-colors duration-300 min-h-[44px] flex items-center justify-center gap-2"
            >
              Schedule Free Consultation
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <a
              href="tel:+17189347100"
              className="bg-transparent hover:bg-white/10 border border-white text-white px-6 py-3 text-base font-medium transition-colors duration-300 min-h-[44px] flex items-center justify-center gap-2"
            >
              Call Now
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-gray-500 text-sm uppercase tracking-wider">Trusted By New Yorkers Since 2006</p>
          </div>
          
          {/* Brand Logos - Scrollable on Mobile */}
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex items-center justify-center space-x-8" style={{ minWidth: 'min-content' }}>
              <img 
                src="https://res.cloudinary.com/designcenter/image/upload/t_crop/Aster_Logo.svg" 
                alt="Aster Cucine" 
                className="h-12 sm:h-16 object-contain"
              />
              <img 
                src="https://res.cloudinary.com/designcenter/image/upload/Prestige_Logo.svg" 
                alt="Prestige" 
                className="h-12 sm:h-16 object-contain"
              />
              <img 
                src="https://res.cloudinary.com/designcenter/image/upload/Longhi_Logo.svg" 
                alt="Longhi" 
                className="h-12 sm:h-16 object-contain"
              />
            </div>
          </div>
          
          {/* Review Summary */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <div className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#C5A267] fill-[#C5A267]" />
                ))}
              </div>
              <span className="ml-2 font-medium">4.9/5</span>
            </div>
            
            <span className="hidden sm:block text-gray-400">|</span>
            
            <div className="text-center sm:text-left">
              <span className="text-gray-700">Based on 27 verified customer reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Related Links Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-serif text-center mb-6 sm:mb-8">
            Explore More Italian Design Solutions
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link 
              to="/italian-closets-nyc"
              className="bg-white rounded-lg shadow-md p-4 flex items-center hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <h3 className="text-lg font-medium mb-1">Italian Closet Solutions</h3>
                <p className="text-gray-600 text-sm">Custom Italian closets for NYC homes</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#C5A267] ml-auto" />
            </Link>
            
            <Link 
              to="/bathroom-vanities-nyc"
              className="bg-white rounded-lg shadow-md p-4 flex items-center hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <h3 className="text-lg font-medium mb-1">Bathroom Vanities</h3>
                <p className="text-gray-600 text-sm">Matching Italian bathroom designs</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#C5A267] ml-auto" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form Modal - Shows when triggered */}
      {showContactForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium">Request a Consultation</h3>
              <button 
                onClick={() => setShowContactForm(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C5A267]"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C5A267]"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C5A267]"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C5A267] resize-none"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={formStatus === 'success'}
                className={`w-full py-3 text-white font-medium rounded-md transition-colors duration-300 min-h-[44px] ${
                  formStatus === 'success'
                    ? 'bg-green-500'
                    : formStatus === 'error'
                    ? 'bg-red-500'
                    : 'bg-[#C5A267] hover:bg-[#B49157]'
                }`}
              >
                {formStatus === 'success'
                  ? 'Request Sent!'
                  : formStatus === 'error'
                  ? 'Try Again'
                  : 'Request Consultation'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Location Section with Map */}
      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-serif text-center mb-6 sm:mb-8">
            Visit Our Italian Kitchen Showroom
          </h2>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                title="D&D Design Center Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3028.7763398106223!2d-73.95638492346016!3d40.58600294924136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c244302a77e92b%3A0x4d6eb6e652f2e3d0!2s2615%20E%2017th%20St%2C%20Brooklyn%2C%20NY%2011235!5e0!3m2!1sen!2sus!4v1682456762971!5m2!1sen!2sus"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C5A267] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium">D&D Design Center</h3>
                    <p className="text-gray-600 text-sm">2615 East 17th Street, Brooklyn, NY 11235</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:items-end gap-2">
                  <a 
                    href="tel:+17189347100"
                    className="flex items-center gap-2 text-[#C5A267] hover:text-[#B49157] transition-colors min-h-[44px]"
                  >
                    <Phone className="w-4 h-4" />
                    <span>(718) 934-7100</span>
                  </a>
                  
                  <a 
                    href="mailto:info@dnddesigncenter.com"
                    className="flex items-center gap-2 text-[#C5A267] hover:text-[#B49157] transition-colors min-h-[44px]"
                  >
                    <Mail className="w-4 h-4" />
                    <span>info@dnddesigncenter.com</span>
                  </a>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="font-medium mb-2">Hours:</h4>
                <p className="text-gray-600 text-sm">Monday - Sunday: 10:00 AM - 7:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Contact Button - Mobile Only */}
      <div className="fixed bottom-4 right-4 z-40 md:hidden">
        <button
          onClick={triggerFooterContact}
          className="w-14 h-14 rounded-full bg-[#C5A267] text-white flex items-center justify-center shadow-lg"
          aria-label="Contact Us"
        >
          <Phone className="w-6 h-6" />
        </button>
      </div>

      {/* Add custom styles for mobile optimization */}
      <style jsx>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        /* Smooth transitions for accordions */
        .benefit-item, .testimonial-card {
          transition: all 0.3s ease;
        }
        
        /* Ensure touch targets are large enough */
        button, a {
          min-height: 44px;
          min-width: 44px;
        }
        
        /* Improve tap highlight for mobile */
        @media (hover: none) {
          button:active, a:active {
            background-color: rgba(0,0,0,0.05);
          }
        }
      `}</style>
    </div>
  );
};

export default ItalianKitchens;