import { motion } from 'framer-motion';
import { Clock, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPostProps {
  post: {
    title: string;
    excerpt: string;
    image: {
      url: string;
      alt: string;
    };
    category: string;
    date: string;
    readTime: number;
    slug?: string;
  };
  index: number;
}

const BlogPost = ({ post, index }: BlogPostProps) => {
  // Generate slug from title or filename (if not in frontmatter)
  const slug = post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return (
    <motion.article 
      className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      layout
    >
      <Link to={`/blog/${slug}`} className="block hover:no-underline">
        <div className="relative aspect-[16/9] overflow-hidden group">
          <img
            src={post.image.url}
            alt={post.image.alt}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-[#C5A267] text-white text-sm rounded-full">
              {post.category}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span>{new Date(post.date).toLocaleDateString('en-US', { 
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          <h3 className="text-xl font-serif mb-3 text-gray-900">
            {post.title}
          </h3>
          
          <p className="text-gray-600 mb-6 line-clamp-2">
            {post.excerpt}
          </p>

          <span className="inline-flex items-center gap-2 text-[#C5A267] hover:text-[#B49157] transition-colors duration-200 group">
            <span>Read More</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogPost;