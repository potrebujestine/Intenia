import dynamic from "next/dynamic";
import HeroServer from "@/components/hero-server";
import ScrollToTop from "@/components/scroll-to-top";
import ScrollToContact from "@/components/scroll-to-contact";
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const descriptions: Record<string, string> = {
    sl: "Intenia Engineering d.o.o., s sedežem v Medvodah, Slovenija, se odlično odziva pri zagotavljanju inženirskih, konzultacijskih, proizvodnih in posredovalnih storitev. Naša misija je zagotavljati inovativne rešitve, ki presegajo pričakovanja strank.",
    en: "Intenia Engineering d.o.o., based in Medvode, Slovenia, excels in providing engineering, consulting, manufacturing and intermediary services. Our mission is to provide innovative solutions that exceed customer expectations.",
    fr: "Intenia Engineering d.o.o., basée à Medvode, en Slovénie, excelle dans la fourniture de services d'ingénierie, de conseil, de fabrication et d'intermédiation. Notre mission est de fournir des solutions innovantes qui dépassent les attentes des clients.",
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
