import VisionnaireHero from '../components/collaboration/VisionnaireHero';
import VisionnaireIntroWithLoopingWords from '../components/collaboration/VisionnaireIntroWithLoopingWords';
import VisionnaireShowcase from '../components/collaboration/VisionnaireShowcase';
import VisionnaireCTA from '../components/collaboration/VisionnaireCTA';
import VisionnaireThankYou from '../components/collaboration/VisionnaireThankYou';
import { HeroScrollDemo } from '../components/ui/HeroScrollDemo';
import { GridMotionDemo } from '../components/collaboration/GridMotionDemo';
import { useFooterContact } from '../hooks/useFooterContact';
import { Helmet } from 'react-helmet';
import VisionnaireBrands from '../components/collaboration/VisionnaireBrands';

const Collaboration = () => {
  // Use the hook
  const { triggerFooterContact } = useFooterContact();

  return (
    <div className="relative min-h-screen bg-white">
      <Helmet>
        <title>Collaborations with Luxury Designers | D&D Design Center</title>
        <meta name="description" content="Learn about our collaborations with top designers and brands at D&D Design Center." />
        <link rel="canonical" href="https://dnddesigncenter.com/collaboration" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": "Visionnaire Luxury Collection",
            "description": "Explore D&D Design Center's exclusive collaboration with Visionnaire – where Italian artistry meets modern luxury in bespoke interiors.",
            "thumbnailUrl": "https://res.cloudinary.com/designcenter/image/upload/Hero_Video_Banner.avif",
            "uploadDate": "2025-04-01",
            "contentUrl": "https://res.cloudinary.com/designcenter/video/upload/f_auto,q_auto:good/visionnaire-luxury-collection.mp4",
            "embedUrl": "https://res.cloudinary.com/designcenter/video/upload/f_auto,q_auto:good/visionnaire-luxury-collection.mp4",
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
      <main>
        <VisionnaireHero />
        <VisionnaireIntroWithLoopingWords />
        <GridMotionDemo />
        <VisionnaireShowcase />
        <VisionnaireBrands />
        <VisionnaireThankYou />
        <HeroScrollDemo />
        <VisionnaireCTA triggerFooterContact={triggerFooterContact} />
      </main>
    </div>
  );
};

export default Collaboration;
