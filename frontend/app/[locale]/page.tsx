import dynamic from "next/dynamic";
import HeroServer from "@/components/hero-server";
import ServicesServer from "@/components/services-server";
import ScrollToTop from "@/components/scroll-to-top";
import ScrollToContact from "@/components/scroll-to-contact";
import type { Metadata } from 'next';
import ProductsServer from "@/components/products-server";
import AboutUsServer from "@/components/about-us-server";

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
      title: "Intenia Engineering",
      description: descriptions[locale] || descriptions.sl,
      url: `https://www.intenia-engineering.si/${locale}`,
      siteName: "Intenia Engineering",
      images: [
        {
          url: "https://www.intenia-engineering.si/images/logos/intenia-logo-2.png",
          width: 1200,
          height: 630,
          alt: "Intenia Engineering",
        },
      ],
      locale: locale === 'sl' ? 'sl_SI' : locale === 'fr' ? 'fr_FR' : 'en_US',
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Intenia Engineering",
      description: descriptions[locale] || descriptions.sl,
      images: ["https://www.intenia-engineering.si/images/logos/intenia-logo-2.png"],
    },
  };
}

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
      <ServicesServer />
      <ProductsServer />
      <AboutUsServer />
      <ContactForm />
    </div>
  );
}
