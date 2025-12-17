import ProductsClient from './ProductsClient';

export const revalidate = 3600;

export default async function ProductsPage() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const url = `${baseUrl}/api/new-products`;

    const response = await fetch(url, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const wpProducts = await response.json();

    const products = wpProducts
      .filter((product: any) => product.show_on_products_page === "1" || product.show_on_products_page === 1)
      .map((product: any) => ({
        id: product.id,
        name: product.products_title || product.title?.rendered || '',
        description: product.short_description || product.content?.rendered?.replace(/<[^>]*>?/gm, "").trim() || '',
        image: product.image?.guid || '/images/placeholder.png',
        category: product.acf?.category || 'Produkt',
      }));

    return <ProductsClient products={products} />;
  } catch (error) {
    console.error('Error loading products:', error);
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Napaka pri nalaganju produktov</h1>
          <p className="text-white/70">Prosimo, poskusite znova pozneje.</p>
        </div>
      </div>
    );
  }
}