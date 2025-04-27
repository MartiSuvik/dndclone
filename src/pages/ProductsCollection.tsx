import { useState, useEffect, useCallback } from 'react';
import ProductCollectionHero from '../components/productcollection/ProductCollectionHero';
import ProductCollectionVisionnaire from '../components/productcollection/ProductCollectionVisionnaire';
import ProductCollectionInfo from '../components/productcollection/ProductCollectionInfo';
import ProductGalleryContent from '../components/productcollection/ProductGalleryContent';
import { useInView } from 'react-intersection-observer';
import { useSwipeable } from 'react-swipeable';
import { ProductCollectionSteps } from '../components/productcollection/ProductCollectionSteps';
import { HeroScrollDemoProduct } from '../components/ui/HeroScrollDemoProduct';
import ProductCollectionCTA from '../components/productcollection/ProductCollectionCTA';
import { useFooterContact } from '../hooks/useFooterContact';
import { Helmet } from 'react-helmet';
import { Feature197Demo } from '../components/ui/accordion-feature-section';

const ProductsCollection = () => {
  // State for UI
  const [isPullToRefreshing, setIsPullToRefreshing] = useState(false);
  const [, setLoadMoreCount] = useState(1);

  // Intersection observer for infinite scroll
  const { inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Handle infinite scroll when bottom is visible
  useEffect(() => {
    if (inView) {
      // Add a small delay to simulate loading more content
      const timer = setTimeout(() => {
        setLoadMoreCount((prev) => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  // Scroll to top when component mounts
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      });
    };

    scrollToTop();
    // Use a timeout as a fallback in case the initial scroll doesn't work
    const timer = setTimeout(scrollToTop, 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle pull-to-refresh functionality
  const handlePullToRefresh = useCallback(() => {
    setIsPullToRefreshing(true);

    // Simulate refresh with a small delay
    setTimeout(() => {
      // Reset any necessary state here
      setLoadMoreCount(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsPullToRefreshing(false);
    }, 1000);
  }, []);

  // Setup swipe handlers for pull-to-refresh
  const swipeHandlers = useSwipeable({
    onSwipedDown: (eventData) => {
      // Only trigger pull-to-refresh if we're at the top of the page
      if (window.scrollY < 10 && eventData.deltaY > 70) {
        handlePullToRefresh();
      }
    },
    delta: 50, // Min distance before a swipe is recognized
    preventScrollOnSwipe: false,
    trackTouch: true,
    trackMouse: false,
  });

  // Use the hook for consistent footer contact behavior
  const { triggerFooterContact } = useFooterContact();

  return (
    <div className="min-h-screen overflow-x-hidden" {...swipeHandlers}>
      {/* Pull-to-refresh indicator */}
      {isPullToRefreshing && (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center h-16 bg-white/80 backdrop-blur-sm">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#C5A267]"></div>
          <span className="ml-2 text-sm text-gray-600">Refreshing...</span>
        </div>
      )}
      <Helmet>
        <title>Custom Luxury Furniture Collection | D&D Design Center</title>
        <meta name="description" content="Explore our exclusive collection of luxury custom furniture at D&D Design Center." />
        <link rel="canonical" href="https://dnddesigncenter.com/productscollection" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": "New York City Furniture Design",
            "description": "Experience our handcrafted luxury furniture collections, designed with elegance and precision in the heart of New York City.",
            "thumbnailUrl": "https://res.cloudinary.com/designcenter/image/upload/Hero_Video_Banner.avif",
            "uploadDate": "2025-04-01",
            "contentUrl": "https://res.cloudinary.com/designcenter/video/upload/New_York_City_Furniture_Design.mp4",
            "embedUrl": "https://res.cloudinary.com/designcenter/video/upload/New_York_City_Furniture_Design.mp4",
            "publisher": {
              "@type": "Organization",
              "name": "D&D Design Center",
              "logo": {
                "@type": "ImageObject",
                "url": "https://res.cloudinary.com/designcenter/image/upload/v1741965462/DnD_Logo_Transparent.svg"
              }
            }
          })}
        </script>
      </Helmet>
      <ProductCollectionHero />
      <ProductGalleryContent />
      <Feature197Demo />
      <ProductCollectionVisionnaire />
      <ProductCollectionSteps />
      <div className="w-full">
        <HeroScrollDemoProduct />
      </div>
      <ProductCollectionInfo />
      <ProductCollectionCTA 
        triggerFooterContact={triggerFooterContact} 
      />
    </div>
  );
};

export default ProductsCollection;
