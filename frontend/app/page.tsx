import dynamic from "next/dynamic";
import HeroServer from "@/components/hero-server";
import ScrollToTop from "@/components/scroll-to-top";
import ScrollToContact from "@/components/scroll-to-contact";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

const Products = dynamic(() => import("@/components/products"));
const Services = dynamic(() => import("@/components/services"));
const AboutUs = dynamic(() => import("@/components/about-us"));
const ContactForm = dynamic(() => import("@/components/contact-form"));

import { ScrollRestoration, LazyLoad } from "@/components/client-wrappers";

export default async function Home() {
  return (
    <div className="min-h-screen bg-black px-0 sm:px-4 text-white">
      <ScrollRestoration />
      <ScrollToTop />
      <ScrollToContact />
      <HeroServer />
      <Services />
      <Products />

      <AboutUs />


      <ContactForm />

    </div>
  );
}
