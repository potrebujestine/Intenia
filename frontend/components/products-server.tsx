import { getLocale } from "next-intl/server"
import { getWPData, getWPSection } from "@/lib/wp-ssr"
import ProductsClient from "@/components/products-client"

const revalidate = 3600;


export default async function ProductsServer() {
  const locale = await getLocale()
  const [products, productsSection] = await Promise.all([
    getWPData("new-products", { locale, revalidate }),
    getWPSection("new-products-section", { locale, revalidate }),
  ])
  return <ProductsClient products={products} section={productsSection} />
}