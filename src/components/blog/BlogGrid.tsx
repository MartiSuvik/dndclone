import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BlogPost from './BlogPost';
import { Filter } from 'lucide-react';
import matter from 'gray-matter';
import { Buffer } from 'buffer';
if (typeof window !== 'undefined') {
  (window as any).Buffer = Buffer;
}

const categories = ['All', 'Design', 'Inspiration', 'Trends', 'Sustainability', 'Craftsmanship'];

// Dynamically import all markdown files in src/posts
const postFiles = import.meta.glob('../../posts/*.md', { query: '?raw', import: 'default' });

const BlogGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const loadedPosts = await Promise.all(
          Object.entries(postFiles).map(async ([path, resolver]) => {
            const raw = await resolver();
            const { data, content } = matter(raw as string);
            // Generate slug from filename
            const fileName = path.split('/').pop()?.replace('.md', '');
            return {
              ...data,
              content,
              slug: fileName,
            };
          })
        );
        // Sort by date (newest first)
        loadedPosts.sort((a, b) => {
          const dateA = (a as any).date ? new Date((a as any).date).getTime() : 0;
          const dateB = (b as any).date ? new Date((b as any).date).getTime() : 0;
          return dateB - dateA;
        });
        setPosts(loadedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchPosts();
  }, []);

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  return (
    <section className="py-12 md:py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-serif">Latest Articles</h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 text-gray-600"
            >
              <Filter className="w-5 h-5" />
              Filter
            </button>
          </div>
          
          <div className={`flex flex-wrap gap-3 ${showFilters ? 'block' : 'hidden md:flex'}`}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-[#C5A267] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C5A267]"></div>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredPosts.map((post, index) => (
              <BlogPost key={post.title} post={post} index={index} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogGrid;