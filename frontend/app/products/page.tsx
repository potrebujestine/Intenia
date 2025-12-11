import ProductsClient from './ProductsClient';
import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: {
    canonical: '/products',
  },
};

export default async function ProductsPage() {
  return <ProductsClient />;
}
