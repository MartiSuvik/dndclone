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
          <title>Luxury Interiors & Custom Furniture | D&D Design Center</title>
          <meta
            name="description"
            content="Welcome to D&D Design Center. Discover our luxury custom furniture and crafted interiors."
          />
          <link rel="canonical" href="https://dnddesigncenter.com/" />

          {/* JSON-LD VideoObject for SEO */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": "Hero Luxury Decor Showcase",
              "description": "Discover timeless elegance with handcrafted Italian interiors from D&D Design Center.",
              "thumbnailUrl": "https://res.cloudinary.com/designcenter/image/upload/Hero_Video_Banner.avif",
              "uploadDate": "2025-04-01",
              "contentUrl": "https://res.cloudinary.com/designcenter/video/upload/f_auto,q_auto:low/Hero_Luxury_Decor_Showcase_Slow_Motion.mp4",
              "embedUrl": "https://res.cloudinary.com/designcenter/video/upload/f_auto,q_auto:low/Hero_Luxury_Decor_Showcase_Slow_Motion.mp4",
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