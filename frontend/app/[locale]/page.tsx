import dynamic from "next/dynamic";
import HeroServer from "@/components/hero-server";
import ScrollToTop from "@/components/scroll-to-top";
import ScrollToContact from "@/components/scroll-to-contact";
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const descriptions: Record<string, string> = {
    sl: "Intenia Engineering načrtuje, izdeluje in namešča opremo, prilagojeno vašim potrebam, ter nudi proizvodnjo delov in sklopov z razpoložljivimi presežnimi proizvodnimi kapacitetami.",
    en: "Intenia Engineering designs, builds and installs equipment tailored to your needs and provides excess-capacity manufacturing for parts & assemblies.",
    fr: "Intenia Engineering conçoit, fabrique et installe des équipements sur mesure adaptés à vos besoins et propose des capacités de fabrication excédentaires pour des pièces et des assemblages.",
  };

  return {
    description: descriptions[locale] || descriptions.sl,
    alternates: {
      canonical: `https://www.intenia-engineering.si/${locale}`,
      languages: {
        'sl': 'https://www.intenia-engineering.si/sl',
        'en': 'https://www.intenia-engineering.si/en',
        'fr': 'https://www.intenia-engineering.si/fr',
      },
    },
    openGraph: {
      description: descriptions[locale] || descriptions.sl,
    },
    twitter: {
      description: descriptions[locale] || descriptions.sl,
    },
  };
}

const Products = dynamic(() => import("@/components/products"));
const Services = dynamic(() => import("@/components/services"));
const AboutUs = dynamic(() => import("@/components/about-us"));
const ContactForm = dynamic(() => import("@/components/contact-form"));

import { ScrollRestoration, LazyLoad } from "@/components/client-wrappers";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-black px-0 sm:px-4 text-white">
      <ScrollRestoration />
      <ScrollToTop />
      <ScrollToContact />
      <HeroServer locale={locale} />
      <Services />
      <Products />
      <AboutUs />
      <ContactForm />
    </div>
  );
}
