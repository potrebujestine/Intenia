"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/hero";

// Scroll restoration component
const ScrollRestoration = () => {
  useEffect(() => {
    // Check if there's a hash in the URL
    const hash = window.location.hash;
    
    if (hash) {
      // Wait for components to load, then scroll to the hash
      const timer = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500); // Give time for lazy-loaded components
      
      return () => clearTimeout(timer);
    } else {
      // Only scroll to top if there's no hash
      window.scrollTo(0, 0);
    }

    // Disable browser's automatic scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const handleBeforeUnload = () => {
      if (!window.location.hash) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null;
};

// Lazy load components
const SocialProof = dynamic(() => import("@/components/social-proof"), {
  ssr: false,
});

const Features = dynamic(() => import("@/components/features"), {
  ssr: false,
});

const HowItWorks = dynamic(() => import("@/components/how-it-works"), {
  ssr: false,
});

const Testimonials = dynamic(() => import("@/components/testimonials"), {
  ssr: false,
});

const Pricing = dynamic(() => import("@/components/pricing"), {
  ssr: false,
});

const Integrations = dynamic(() => import("@/components/integrations"), {
  ssr: false,
});

const Products = dynamic(() => import("@/components/products"), {
  ssr: false,
});

const BlogPreview = dynamic(() => import("@/components/blog-preview"), {
  ssr: false,
});

const FaqSection = dynamic(() => import("@/components/faq"), {
  ssr: false,
});

const Cta = dynamic(() => import("@/components/cta"), {
  ssr: false,
});

// LazyLoad wrapper component
function LazyLoad({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return <div ref={ref}>{inView ? children : null}</div>;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black px-0 sm:px-4 text-white">
      <ScrollRestoration />
      <Hero />
      {/* <LazyLoad>
        <SocialProof />
      </LazyLoad> */}
      <LazyLoad>
        <Products />
      </LazyLoad>
      <LazyLoad>
        <HowItWorks />
      </LazyLoad>
      {/* <LazyLoad>
        <Features />
      </LazyLoad> */}
      {/*     <LazyLoad>
        <Integrations />
      </LazyLoad> */}
      {/*  <LazyLoad>
        <Testimonials />
      </LazyLoad> */}
      {/*      <LazyLoad>
        <BlogPreview />
      </LazyLoad> */}
      {/*   <LazyLoad>
        <Pricing />
      </LazyLoad>
      <LazyLoad>
        <FaqSection />
      </LazyLoad> */}
      <LazyLoad>
        <Cta />
      </LazyLoad>
    </div>
  );
}
