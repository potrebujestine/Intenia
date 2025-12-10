import dynamic from "next/dynamic";
import HeroServer from "@/components/hero-server"; // New SSR hero
import ScrollToTop from "@/components/scroll-to-top";

// Keep lazy loading for below-the-fold content
const Products = dynamic(() => import("@/components/products"));
const Services = dynamic(() => import("@/components/services"));
const AboutUs = dynamic(() => import("@/components/about-us"));
const ContactForm = dynamic(() => import("@/components/contact-form"));

// This needs to be a client component for scroll handling
import { ScrollRestoration, LazyLoad } from "@/components/client-wrappers";

export default async function Home() {
  return (
    <div className="min-h-screen bg-black px-0 sm:px-4 text-white">
      <ScrollRestoration />
      <ScrollToTop />
      <HeroServer />
      <Services />
      <Products />
      <LazyLoad>
        <AboutUs />
      </LazyLoad>
      <LazyLoad>
        <ContactForm />
      </LazyLoad>
    </div>
  );
}
