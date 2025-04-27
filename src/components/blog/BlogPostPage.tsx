import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { Calendar, Clock, Tag } from "lucide-react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import BlogCTA from "./BlogCTA";
import rehypeRaw from "rehype-raw";
import { Helmet } from "react-helmet";

const postFiles = import.meta.glob("../../posts/*.md", { as: "raw" });

function triggerFooterContact(): void {
  const footerElement = document.querySelector("#footer");
  if (footerElement instanceof HTMLElement) {
    const scrollHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    window.scrollTo({
      top: scrollHeight - windowHeight,
      behavior: "smooth",
    });
    setTimeout(() => {
      const footerContactBtn = document.querySelector(
        "[data-footer-contact]"
      ) as HTMLButtonElement;
      if (footerContactBtn) {
        footerContactBtn.click();
      }
    }, 800);
  }
}

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 1,
  });

  const [, setShowButton] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const overlayThreshold = 0.07; // ~7% scroll, adjust as needed

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setShowOverlay(latest < overlayThreshold);
    setShowButton(scrollY.get() === 0);
  });

  const bgColor = useTransform(scrollYProgress, [0, 0.25], ["#f9fafb", "#fff"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.03], [1, 0]);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const entry = Object.entries(postFiles).find(([path]) => {
        const fileName = path.split("/").pop()?.replace(".md", "");
        return fileName === slug;
      });
      if (!entry) {
        setPost(null);
        setLoading(false);
        return;
      }
      const [, resolver] = entry;
      const raw = await resolver();
      const matter = (await import("gray-matter")).default; // dynamic import here
      const { data, content } = matter(raw);
      setPost({ ...data, content });
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }

  if (!post) {
    return (
      <div className="text-center py-20 text-gray-500">Post not found.</div>
    );
  }

  const fallback =
    "Luxury interiors and custom furniture insights from D&D Design Center.";

  const Divider = () => (
    <div className="flex items-center my-12">
      <div className="flex-grow border-t border-gray-200" />
      <span className="mx-4 text-[#C5A267] text-xl">•</span>
      <div className="flex-grow border-t border-gray-200" />
    </div>
  );

  const PullQuote = ({ children }: { children: React.ReactNode }) => (
    <blockquote className="bg-white/60 border-l-4 border-[#C5A267] italic px-6 py-4 my-8 rounded-xl shadow font-serif text-xl max-w-2xl mx-auto">
      {children}
    </blockquote>
  );

  const renderers = {
    paragraph: (props: any) => {
      if (props.node.position.start.line === 1) {
        return (
          <p className="first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:text-[#C5A267] leading-relaxed mb-6 text-sm md:text-base text-gray-800">
            {props.children}
          </p>
        );
      }
      return (
        <p className="leading-relaxed mb-6 text-sm md:text-base text-gray-800">
          {props.children}
        </p>
      );
    },
  
    blockquote: (props: any) => <PullQuote>{props.children}</PullQuote>,
    hr: () => <Divider />,
  
    a: ({ href, children }: any) => {
      const isFooterLink = href === "#footer" || href === "/footer";
      const isExternal = href && !href.startsWith("/") && !href.startsWith("#");
      if (isFooterLink) {
        return (
          <a
            href={href}
            onClick={(e) => {
              e.preventDefault();
              triggerFooterContact();
            }}
            className="text-[#C5A267] underline hover:text-[#b49554] cursor-pointer"
          >
            {children}
          </a>
        );
      }
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-[#C5A267] underline hover:text-[#b49554]"
        >
          {children}
        </a>
      );
    },
  
    img: ({ src, alt }: any) => (
      <img
        src={src}
        alt={alt || ''}
        loading="lazy"
        className="my-6 mx-auto rounded-xl shadow-md max-w-full"
      />
    ),
  
    h1: (props: any) => (
      <h1 className="text-3xl md:text-4xl font-bold mb-6 mt-10 text-gray-900 font-serif">
        {props.children}
      </h1>
    ),
    h2: (props: any) => (
      <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-gray-900 font-sans">
        {props.children}
      </h2>
    ),
    h3: (props: any) => (
      <h3 className="text-xl md:text-2xl font-medium mb-3 mt-6 text-gray-800 font-sans">
        {props.children}
      </h3>
    ),
    h4: (props: any) => (
      <h4 className="text-lg font-medium mt-4 mb-2 text-gray-700">
        {props.children}
      </h4>
    ),
    h5: (props: any) => (
      <h5 className="text-base font-medium mt-4 mb-2 text-gray-600">
        {props.children}
      </h5>
    ),
    h6: (props: any) => (
      <h6 className="text-sm font-semibold mt-4 mb-2 text-gray-500 uppercase tracking-wide">
        {props.children}
      </h6>
    ),
  };
  

  return (
    <motion.div
      className="relative min-h-screen font-normal"
      style={{ background: bgColor }}
    >
      <Helmet>
        <title>{post.title} | D&D Design Center</title>
        <meta name="description" content={post.excerpt || fallback} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://dnddesigncenter.com/blog/${slug}`} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={`${post.title} | D&D Design Center`}
        />
        <meta property="og:description" content={post.excerpt || fallback} />
        <meta
          property="og:url"
          content={`https://dnddesigncenter.com/blog/${slug}`}
        />
        <meta property="og:image" content={post.image?.url} />
        <meta property="og:site_name" content="D&D Design Center" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${post.title} | D&D Design Center`}
        />
        <meta name="twitter:description" content={post.excerpt || fallback} />
        <meta name="twitter:image" content={post.image?.url} />

        {/* JSON-LD (keep your current block) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            image: post.image?.url,
            author: {
              "@type": "Organization",
              name: "D&D Design Center",
            },
            publisher: {
              "@type": "Organization",
              name: "D&D Design Center",
              logo: {
                "@type": "ImageObject",
                url: "https://res.cloudinary.com/designcenter/image/upload/DnD_White_Logo.avif",
              },
            },
            url: `https://dnddesigncenter.com/blog/${slug}`,
            datePublished: post.date,
            dateModified: post.date,
            description: post.excerpt || fallback,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://dnddesigncenter.com/blog/${slug}`,
            },
          })}
        </script>

        {post.video?.embedUrl && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: post.video.title,
              description: post.video.description,
              thumbnailUrl: post.video.thumbnail,
              uploadDate: post.date,
              contentUrl: post.video.url,
              embedUrl: post.video.embedUrl,
              publisher: {
                "@type": "Organization",
                name: "D&D Design Center",
                logo: {
                  "@type": "ImageObject",
                  url: "https://res.cloudinary.com/designcenter/image/upload/DnD_White_Logo.avif",
                },
              },
            })}
          </script>
        )}
      </Helmet>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5A267] to-[#e2c792] z-50"
        style={{ scaleX: progress, transformOrigin: "0%" }}
      />
      {post.image?.url && (
        <div className="absolute top-0 left-0 w-full h-screen z-0 pointer-events-none">
          <img
            src={post.image.url}
            alt={post.image.alt}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />
        </div>
      )}
      {post.image?.url && showOverlay && (
        <motion.div
          className="fixed top-0 left-0 w-full h-screen z-20 flex flex-col justify-center items-center text-center px-4 pointer-events-none"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{ opacity: titleOpacity as any }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none z-10" />
          <div className="relative flex flex-col justify-center items-center text-center px-4 z-20 pointer-events-auto">
            <Link
              to="/blog"
              className="mb-6 bg-[#C5A267] text-white text-lg font-medium px-6 py-3 rounded shadow transition hover:bg-[#b49554] z-30"
              style={{
                position: "relative",
                top: 0,
                left: 0,
                width: "fit-content",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              &larr; Back to Blog
            </Link>
            <motion.h1
              className={`text-white font-serif text-4xl md:text-6xl font-bold drop-shadow-lg mb-4 ${
                post.title && post.title.trim().split(/\s+/).length > 5
                  ? "break-words whitespace-normal block"
                  : ""
              }`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{
                fontFamily: "'Playfair Display', serif",
                opacity: titleOpacity as any,
                maxWidth:
                  post.title && post.title.trim().split(/\s+/).length > 5
                    ? "22ch"
                    : undefined,
                marginLeft: "auto",
                marginRight: "auto",
                wordBreak: "break-word",
              }}
            >
              {/* ✅ This h1 is for SEO crawlers & screen readers */}
              <h1 className="sr-only">{post.title}</h1>

              {/* ✅ This is your styled version, still visible */}
              {post.title}
            </motion.h1>
            <motion.div
              className="flex flex-wrap justify-center gap-4 bg-white/30 backdrop-blur-md rounded-full px-6 py-3 shadow-lg mb-2 text-sm md:text-base"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="flex items-center gap-2 text-gray-200 font-medium">
                <Calendar size={18} className="text-[#C5A267]" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-2 text-gray-300 font-medium">
                <Clock size={18} className="text-[#C5A267]" />
                {post.readTime} min read
              </span>
              <span className="flex items-center gap-2 text-gray-300 font-medium">
                <Tag size={18} className="text-[#C5A267]" />
                <span className="bg-[#C5A267] text-white rounded-full px-3 py-1 text-xs font-semibold">
                  {post.category}
                </span>
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
      <div className="relative z-10 pt-[75vh] md:pt-[70vh]">
        <div className="max-w-xl mx-auto px-2 md:px-20">
          <article
            className="bg-white/90 backdrop-blur rounded-2xl shadow-md md:px-6 prose prose-[0.85rem] md:prose-sm max-w-xl mx-auto overflow-hidden mt-4 sm:px-4 mb-12"
            style={{
              fontFamily:
                "'Montserrat', 'DM Sans', 'Inter', 'Space Grotesk', sans-serif",
              lineHeight: 1.6,
              letterSpacing: "0.01em",
            }}
          >
            <div className="px-2 py-8 md:px-0">
              <ReactMarkdown components={renderers} rehypePlugins={[rehypeRaw]}>
                {post.content}
              </ReactMarkdown>
            </div>
          </article>
        </div>
      </div>
      <BlogCTA triggerFooterContact={triggerFooterContact} />
    </motion.div>
  );
};

export default BlogPostPage;
