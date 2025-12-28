import ProductsClient from './ProductsClient';
import { getLocale } from "next-intl/server";
import { getWPData, getWPSection } from "@/lib/wp-ssr";
import type { Metadata } from 'next';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const descriptions: Record<string, string> = {
    sl: "Oglejte si našo paleto inženirskih produktov in rešitev. Intenia Engineering ponuja kakovostne izdelke, prilagojene vašim potrebam.",
    en: "Explore our range of engineering products and solutions. Intenia Engineering offers quality products tailored to your needs.",
    fr: "Découvrez notre gamme de produits et solutions d'ingénierie. Intenia Engineering propose des produits de qualité adaptés à vos besoins.",
  };

  const titles: Record<string, string> = {
    sl: "Produkti",
    en: "Products",
    fr: "Produits",
  };

  return {
    title: titles[locale] || titles.sl,
    description: descriptions[locale] || descriptions.sl,
    alternates: {
      canonical: '/products',
    },
    openGraph: {
      title: titles[locale] || titles.sl,
      description: descriptions[locale] || descriptions.sl,
    },
    twitter: {
      title: titles[locale] || titles.sl,
      description: descriptions[locale] || descriptions.sl,
    },
  };
}

export default async function ProductsPage() {
  const locale = await getLocale();
  const [products, productsSection] = await Promise.all([
    getWPData("new-products", { locale, revalidate }),
    getWPSection("new-products-section", { locale, revalidate }),
  ]);

  return <ProductsClient products={products} section={productsSection} />;
}
