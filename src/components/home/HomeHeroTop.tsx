import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollArrow from "../ui/ScrollArrow";

const HomeHeroTop = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const craftedTitleRef = useRef<HTMLHeadingElement>(null); // "Crafted Interiors"
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    const playVideo = () => {
      if (video) {
        video.play().catch((error) => {
          console.log("Autoplay prevented:", error);
          // Optionally, you can show a play button to the user
        });
      }
    };

    // Ensure the video plays after user interaction
    document.addEventListener("click", playVideo, { once: true });

    return () => {
      document.removeEventListener("click", playVideo);
    };
  }, []);

  useEffect(() => {
    // Optimized GSAP animation without expensive per-letter transformations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.5 });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2 }
    )
      .fromTo(
        craftedTitleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.8 },
        "-=0.6"
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30, filter: "blur(5px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5 },
        "-=1.4"
      )
      .fromTo(
        ".contact-now-hero-btn",
        { opacity: 0, y: 30, filter: "blur(5px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2 },
        "-=0.7" // Animate button right after subtitle, not with extra delay
      );

    // Create a separate timeline for the arrow animation to prevent affecting other elements
    const arrowTl = gsap.timeline();
    arrowTl.to(arrowRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Removed per-letter animation and video/overlay animations for improved rendering.
    return () => {
      tl.kill();
      arrowTl.kill(); // Clean up arrow animation as well
    };
  }, []);

  return (
    <section className="relative h-screen overflow-hidden perspective-1000">
      {" "}
      {/* Background video & overlay */}{" "}
      <div className="absolute inset-0 w-full h-full">
        {" "}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover scale-105"
          poster="https://res.cloudinary.com/designcenter/image/upload/Hero_Video_Banner.avif"
        >
          {" "}
          <source
            src="https://res.cloudinary.com/designcenter/video/upload/f_auto,q_auto:low/Hero_Luxury_Decor_Showcase_Slow_Motion.mp4"
            type="video/mp4"
          />{" "}
          Your browser does not support the video tag.{" "}
        </video>{" "}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"
        />{" "}
      </div>
      {/* Centered content container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {" "}
        <div className="text-center mx-auto px-4">
          {" "}
          <h1
            ref={titleRef}
            className="mb-3 text-7xl sm:text-6xl md:text-8xl lg:text-10xl transform-gpu uppercase text-white/90 leading-tight"
            style={{ perspective: "800px" }}
          >
            <span className="title-word block">Luxury <span className="inline">Italian</span></span>
            <span
              ref={craftedTitleRef}
              className="block text-2xl sm:text-3xl md:text-4xl lg:text-6xl mt-2 crafted-shine text-shadow break-words text-balance"
            >
              Crafted Interiors for Modern Living
            </span>
          </h1>
          <p
            ref={subtitleRef}
            className="text-white/90 text-sm sm:text-base md:text-xl lg:text-2xl font-light text-shadow"
            style={{ willChange: "transform, opacity, filter" }}
          >
            Handcrafted Italian luxury interiors designed for timeless elegance
            and contemporary lifestyles.
          </p>
          <button
            type="button"
            className="contact-now-hero-btn mt-8 px-6 py-3 bg-[#C5A267] text-white text-base font-regular shadow hover:bg-[#B49157] transition-colors duration-200 min-h-[44px]"
            style={{ opacity: 0, transform: 'translateY(30px) scale(1)', filter: 'blur(5px)' }}
            onClick={() => {
              const footer = document.getElementById('footer');
              if (footer) {
                footer.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                  const btn = document.querySelector('[data-footer-contact]') as HTMLButtonElement;
                  if (btn) btn.click();
                }, 800);
              }
            }}
          >
            Complimentary Consultation
          </button>
        </div>
      </div>
      {/* Scroll Arrow */}
      <div
        ref={arrowRef}
        className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer scroll-arrow"
      >
        {" "}
        <ScrollArrow
          targetId="HomeProjectsCards"
          className="w-10 h-10 md:w-12 md:h-12 text-white hover:text-[#C5A267] transition-colors duration-300"
        />{" "}
      </div>{" "}
      <style>{` .perspective-1000 { perspective: 1000px; } .transform-gpu { transform: translateZ(0); backface-visibility: hidden; -webkit-font-smoothing: antialiased; } /* Subtle text shadow for better readability */ .text-shadow { text-shadow: 0 2px 15px rgba(0, 0, 0, 0.6); } /* Crafted Interiors: animated golden shine */ .crafted-shine { position: relative; background: linear-gradient( 130deg, white 80%, rgba(197, 162, 103, 1) 80%, rgba(197, 162, 103, 1) 82%, white 82%, white 100% ); background-size: 200% 100%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: shine 4s linear infinite; } @keyframes shine { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } } /* Hide scroll arrow when in landscape mode on short screens */ @media (orientation: landscape) and (max-height: 500px) { .scroll-arrow { display: none; } } `}</style>{" "}
    </section>
  );
};

export default HomeHeroTop;