import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import Loading from '../components/ui/Loading';

// 🔄 Lazy load components
const BlogHero = lazy(() => import('../components/blog/BlogHero'));
const BlogGrid = lazy(() => import('../components/blog/BlogGrid'));
const BlogCTA = lazy(() => import('../components/blog/BlogCTA'));

const Blog = () => {
  function triggerFooterContact(): void {
    const contactSection = document.getElementById('footer-contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="relative min-h-screen bg-white">
      <Helmet>
        <title>Interior Design Insights & Trends | D&D Design Center</title>
        <meta
          name="description"
          content="Read the latest news and updates from D&D Design Center on our blog."
        />
        <link rel="canonical" href="https://dnddesigncenter.com/blog" />
      </Helmet>

      <main>
        <Suspense fallback={<Loading />}>
          <BlogHero />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <BlogGrid />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <BlogCTA triggerFooterContact={triggerFooterContact} />
        </Suspense>
      </main>
    </div>
  );
};

export default Blog;
