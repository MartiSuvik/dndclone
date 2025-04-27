import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable browser's native scroll restoration
    window.history.scrollRestoration = "manual";

    const html = document.documentElement;
    // Store the original scroll behavior
    const originalScrollBehavior = html.style.scrollBehavior;
    // Temporarily disable smooth scrolling
    html.style.scrollBehavior = "auto";

    // Instantly set scroll position to top
    window.scrollTo(0, 0);

    // Fallback to ensure scroll position is reset, then restore scroll behavior
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
      html.style.scrollBehavior = originalScrollBehavior;
    }, 50);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
};

export default ScrollToTop;