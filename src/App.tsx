import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import ScrollToTop from './components/ui/ScrollToTop';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import Home from './pages/Home';
import Loading from './components/ui/Loading';
import ErrorBoundary from './components/ui/ErrorBoundary';

const Sustainability = lazy(() => import('./pages/Sustainability'));
const HowWeWork = lazy(() => import('./pages/HowWeWork'));
const ProductsCollection = lazy(() => import('./pages/ProductsCollection'));
const Collaboration = lazy(() => import('./pages/collaboration'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPostPage = lazy(() => import('./components/blog/BlogPostPage'));
const Designers = lazy(() => import('./pages/Designers'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const CraftedCalm = lazy(() => import('./pages/CraftedCalm'));
const ItalianKitchens = lazy(() => import('./pages/ItalianKitchens'));

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFooterExpanded, setIsFooterExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FurnitureStore",
      "name": "D&D Design Center",
      "url": "https://dnddesigncenter.com",
      "logo": "https://res.cloudinary.com/designcenter/image/upload/D_D_Logo.avif",
      "image": "https://res.cloudinary.com/designcenter/image/upload/D_D_New_York_Showroom.avif",
      "description": "Luxury bespoke furniture solutions...",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2615 East 17th Street",
        "addressLocality": "Brooklyn",
        "addressRegion": "NY",
        "postalCode": "11235",
        "addressCountry": "US"
      },
      "telephone": "+1 718-934-7100",
      "openingHours": "Mo-Su 10:00-19:00",
      "serviceArea": [
        { "@type": "AdministrativeArea", "name": "New York" },
        { "@type": "City", "name": "Brooklyn" },
        { "@type": "City", "name": "Manhattan" },
        { "@type": "City", "name": "Queens" },
        { "@type": "City", "name": "Long Island" },
        { "@type": "AdministrativeArea", "name": "New Jersey" },
        { "@type": "City", "name": "Miami" },
        { "@type": "City", "name": "Orlando" },
        { "@type": "City", "name": "Tampa" },
        { "@type": "AdministrativeArea", "name": "Florida" },
        { "@type": "City", "name": "Columbus" },
        { "@type": "City", "name": "Cleveland" },
        { "@type": "AdministrativeArea", "name": "Ohio" },
        { "@type": "Country", "name": "United States" }
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1 718-934-7100",
        "contactType": "customer service",
        "areaServed": "US",
        "availableLanguage": ["English", "Russian"]
      },
      "sameAs": [
        "https://www.instagram.com/dnddesigncenter/",
        "https://www.facebook.com/dnddesigncenter"
      ]
    });

    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const triggerFooterContact = () => {
    const footerElement = document.querySelector('#footer');
    if (footerElement instanceof HTMLElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const footerContactBtn = document.querySelector('[data-footer-contact]') as HTMLButtonElement;
        if (footerContactBtn) {
          footerContactBtn.click();
        }
      }, 800);
    }
  };

  return (
    <>
      <Helmet>
        <title>D&D Design Center | Luxury Custom Furniture Across America</title>
        <meta name="description" content="Luxury custom furniture and high-end interior designs across the U.S." />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="D&D Design Center" />
        <meta property="og:description" content="Luxury interiors with bespoke design solutions." />
        <meta property="og:image" content="https://res.cloudinary.com/designcenter/image/upload/D_D_New_York_Showroom.avif" />
        <meta property="og:url" content="https://dnddesigncenter.com" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="https://res.cloudinary.com/designcenter/image/upload/Favicon_DnD.avif" />
      </Helmet>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Router>
            <ScrollToTop />
            <Navbar
              isScrolled={isScrolled}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              triggerFooterContact={triggerFooterContact}
              isFooterExpanded={isFooterExpanded}
            />
            <ErrorBoundary>
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/sustainability" element={<Sustainability />} />
                  <Route path="/how-we-work" element={<HowWeWork />} />
                  <Route path="/productscollection" element={<ProductsCollection />} />
                  <Route path="/collaboration" element={<Collaboration />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPostPage />} />
                  <Route path="/designers" element={<Designers />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/crafted-calm" element={<CraftedCalm />} />
                  <Route path="/italian-kitchens-nyc" element={<ItalianKitchens />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
            <Footer onExpandChange={setIsFooterExpanded} />
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;