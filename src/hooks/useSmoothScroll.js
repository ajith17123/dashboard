import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook to initialize Lenis smooth scrolling and integrate with GSAP ScrollTrigger.
 */
export const useSmoothScroll = () => {
  useEffect(() => {
    // Initialize Lenis instance
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Make instance accessible if needed
    window.lenis = lenis;

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleScroll);

    // Connect Lenis RAF with GSAP's ticker for synchronized rendering
    const handleTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(handleTicker);

    // Disable lag smoothing to prevent scroll jumps
    gsap.ticker.lagSmoothing(0);

    // Support smooth scrolling for in-page anchor links
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        const targetId = anchor.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl, { offset: 0, duration: 1.2 });
          }
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);

    // Cleanup on unmount
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(handleTicker);
      lenis.off('scroll', handleScroll);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);
};

export default useSmoothScroll;
