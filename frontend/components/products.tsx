"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useWPData } from "@/hooks/useWPData"

export default function Products() {
  const { data: wpProducts, loading } = useWPData("new-products")

  const products = wpProducts.map((product: any) => ({
    id: product.id,
    name: product.products_title || product.title.rendered,
    description: product.short_description || product.content.rendered.replace(/<[^>]*>?/gm, "").trim(),
    image: product.image?.guid || "/images/placeholder.png",
    category: product.acf?.category || "Proizvodnja",
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
      <div className="relative rounded-lg p-0 sm:p-6 h-full flex flex-col">
        <div className="mb-4">
          <div className="relative w-full h-96 mb-3 bg-white/10 animate-pulse rounded-lg"></div>
        </div>
        <div className="h-8 bg-white/10 animate-pulse rounded mb-2 w-3/4"></div>
        <div className="h-4 bg-white/10 animate-pulse rounded mb-2 w-full"></div>
        <div className="h-4 bg-white/10 animate-pulse rounded w-5/6"></div>
      </div>
    </div>
  )

  return (
    <section
      className="relative py-12 sm:py-16 md:py-24 bg-black overflow-hidden"
      aria-labelledby="products-heading"
    >
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-primary/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-brand-primary-light/10 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-repeat opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 id="products-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Naši produkti
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto">
            Obsežne rešitve, prilagojene vašim industrijskim potrebam
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r to-brand-primary-light rounded-xl blur-sm opacity-70  transition-opacity duration-300"></div>
                <div className="relative  rounded-lg p-0  sm:p-6 h-full flex flex-col  transition-colors">
                  <div className="mb-4">
                    <div className="relative w-full h-96 mb-3 transition-transform duration-300 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        priority={index < 2}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                      />
                    </div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2 ">
                    {product.name}
                  </h2>
                  <p className="text-sm sm:text-base text-white/70 mb-4 flex-grow">
                    {product.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8 sm:mt-12"
        >
          <Link href="/products">
            <Button className="bg-brand-primary hover:bg-brand-primary-dark text-white h-12 px-8 text-base rounded-full">
              Raziskajte več produktov
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

