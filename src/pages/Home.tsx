import { Helmet } from "react-helmet";
import HomeHeroTop from "../components/home/HomeHeroTop";
import HomeCollections from "../components/home/HomeCollections";
import HomeProjectsCards from "../components/home/HomeProjectsCards";
import HomeHowWeWork from "../components/home/HomeHowWeWork";
import HomeHistorySection from "../components/home/HomeHistorySection";
import HomeHeroBottom from "../components/home/HomeHeroBottom";
import VisionnaireSection from "../components/home/VisionnaireSection";
import SustainabilitySection from "../components/home/SustainabilitySection";
import TextGenerateEffect from "../components/home/ParagraphSection";

function Home() {
  return (
    <div className="relative min-h-screen bg-white">
      <Helmet>
        <title>Luxury Italian Interiors & Custom Furniture | D&D Design Center NYC</title>
        <meta
          name="description"
          content="Welcome to D&D Design Center. Discover our luxury custom furniture and crafted interiors."
        />
        <link rel="canonical" href="https://dnddesigncenter.com/" />
      </Helmet>
      <main className="pb-16">
        <HomeHeroTop />
        <TextGenerateEffect/>
        <HomeProjectsCards />
        <HomeCollections />
        <HomeHowWeWork />
        <SustainabilitySection />
        <VisionnaireSection />
        <HomeHistorySection />
        <HomeHeroBottom />
      </main>
    </div>
  );
}

export default Home;
