import BlogHero from '../components/blog/BlogHero';
import BlogGrid from '../components/blog/BlogGrid';
import BlogCTA from '../components/blog/BlogCTA';
import { Helmet } from 'react-helmet';

const Blog = () => {
  function triggerFooterContact(): void {
    const contactSection = document.getElementById('footer-contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
      <title>Luxury Interior Design Insights & Trends | D&D Design Center Blog</title>
        <meta name="description" content="Read the latest news and updates from D&D Design Center on our blog." />
        <link rel="canonical" href="https://dnddesigncenter.com/blog" />
      </Helmet>
      <main className="pt-16 md:pt-20">
        <BlogHero />
        <BlogGrid />
        <BlogCTA triggerFooterContact={triggerFooterContact}/>
      </main>
    </div>
  );
};

export default Blog;
