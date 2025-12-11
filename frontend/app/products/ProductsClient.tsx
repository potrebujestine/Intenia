"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import dynamic from "next/dynamic"
import { useWPData } from "@/hooks/useWPData"

const ContactForm = dynamic(() => import("@/components/contact-form"), {
  loading: () => <div className="min-h-[400px] bg-black" />,
})

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
}

export default function ProductsClient() {
  const { data: wpProducts, loading, error } = useWPData("new-products")
  const { data: wpProductsSection, loading: productsSectionLoading } = useWPData("new-products-section")

  const productsSection = wpProductsSection?.[0]
  const header = productsSection?.header
  const description = productsSection?.description

  const products = wpProducts
    .filter((product: any) => {
      const showOnProductsPage = product.show_on_products_page;
      return showOnProductsPage === "1" || showOnProductsPage === 1 || (Array.isArray(showOnProductsPage) && showOnProductsPage.length > 0);
    })
    .map((product: any) => ({
      id: product.id,
      name: product.products_title || product.title?.rendered || '',
      description: product.short_description || product.content?.rendered?.substring(0, 150) || '',
      image: product.image?.guid || product.acf?.image?.url || product.uagb_featured_image_src?.full?.[0] || '/images/placeholder.jpg',
      category: product.acf?.category || 'Produkt',
    }))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  const ProductSkeleton = () => (
    <div className="group relative">
      <div className="absolute -inset-1 bg-gradient-to-r to-brand-primary-light rounded-xl blur-sm opacity-30"></div>
      <div className="relative rounded-lg p-5 sm:p-6 h-full flex flex-col">
        <div className="mb-4">
          <div className="relative w-full h-96 mb-3 bg-white/10 animate-pulse rounded-lg"></div>
        </div>
        <div className="h-8 bg-white/10 animate-pulse rounded mb-2 w-3/4"></div>
        <div className="h-4 bg-white/10 animate-pulse rounded mb-2 w-full"></div>
        <div className="h-4 bg-white/10 animate-pulse rounded w-5/6"></div>
      </div>
    </div>
  )

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Napaka pri nalaganju produktov</h1>
          <p className="text-white/70">Prosimo, poskusite znova pozneje.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <section
        className="relative py-12 sm:py-16 md:py-24 bg-black overflow-hidden"
        aria-labelledby="products-heading"
      >
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-primary/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-brand-primary-light/10 rounded-full blur-[100px]"></div>
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-repeat opacity-5"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-24 sm:pt-24 lg:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h1 id="products-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
              {header}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto">
              {description}
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="group relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r  to-brand-primary-light rounded-xl blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative   rounded-lg p-5 sm:p-6 h-full flex flex-col hover:border-brand-primary-light/50 transition-colors">
                    <div className="mb-4">
                      <div className="relative w-full h-96 mb-3 transition-transform duration-300 overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          priority={index < 6}
                          placeholder="blur"
                          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      {/*  <span className="text-xs text-brand-primary-light font-medium">
                        {product.category}
                      </span> */}
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-brand-primary-light transition-colors">
                      {product.name}
                    </h2>
                    <p
                      className="text-sm sm:text-base text-white/70 mb-4 flex-grow"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <ContactForm />
    </div>
  )
}
