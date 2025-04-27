import SustainabilityHero from '../components/sustainability/SustainabilityHero';
import SustainabilityHighlights from '../components/sustainability/SustainabilityHighlights';
import SustainabilityShowcase from '../components/sustainability/SustainabilityShowcase';
import SustainabilityStats from '../components/sustainability/SustainabilityStats';
import SustainabilityPath from '../components/sustainability/SustainabilityPath';
import SustainabilityCTA from '../components/sustainability/SustainabilityCTA';
import { useFooterContact } from '../hooks/useFooterContact';
import { Helmet } from 'react-helmet';

const Sustainability = () => {
  // Use the hook
  const { triggerFooterContact } = useFooterContact();

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Sustainable Home Interiors | D&D Design Center</title>
        <meta name="description" content="Explore sustainable luxury with eco-conscious furniture and responsibly sourced materials designed for elegant, energy-efficient interiors." />
        <link rel="canonical" href="https://dnddesigncenter.com/sustainability" />
      </Helmet>
      <SustainabilityHero />
      <SustainabilityHighlights
        triggerFooterContact={triggerFooterContact}
        scrollToProjects={() => {}}
      />
      <SustainabilityShowcase />
      <SustainabilityStats />
      <SustainabilityPath />
      <SustainabilityCTA
        triggerFooterContact={triggerFooterContact}
      />
    </div>
  );
};

export default Sustainability;
