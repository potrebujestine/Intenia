"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Products() {
  const products = [
    {
      id: 1,
      name: "Storitve CNC obdelave",
      description: "Natančna CNC obdelava za visokokakovostne komponente",
      image: "/images/slika-1.png",
      category: "Proizvodnja",
    },
    {
      id: 2,
      name: "Rešitve za varjenje",
      description: "Profesionalne storitve varjenja za industrijske aplikacije",
      image: "/images/slika-2.png",
      category: "Proizvodnja",
    },
    {
      id: 3,
      name: "Inženirske konzultacije",
      description: "Strokovni inženirski nasveti in načrtovanje projektov",
      image: "/images/slika-3.png",
      category: "Inženirstvo",
    },
    {
      id: 4,
      name: "Montaža opreme",
      description: "Profesionalne storitve namestitve in montaže",
      image: "/images/slika-4.png",
      category: "Storitve",
    },
    {
      id: 5,
      name: "Proizvodnja rezervnih delov",
      description: "Proizvodnja prilagojenih rezervnih delov",
      image: "/images/slika-5.png",
      category: "Proizvodnja",
    },
    {
      id: 6,
      name: "Površinske obdelave",
      description: "Napredne rešitve za površinske obdelave",
      image: "/images/slika-6.png",
      category: "Proizvodnja",
    },
  ]

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
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

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
            Naši produkti in storitve
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto">
            Obsežne rešitve, prilagojene vašim industrijskim potrebam
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-primary-light rounded-xl blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-black/80 backdrop-blur-sm border border-white/10 rounded-lg p-5 sm:p-6 h-full flex flex-col hover:border-brand-primary-light/50 transition-colors">
                <div className="mb-4">
                  <div className="relative w-full h-96 mb-3 transition-transform duration-300 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                    />

                  </div>
                  <span className="text-xs text-brand-primary-light font-medium">
                    {product.category}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-brand-primary-light transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm sm:text-base text-white/70 mb-4 flex-grow">
                  {product.description}
                </p>
                {/*   <div className="flex items-center text-brand-primary-light text-sm font-medium group-hover:translate-x-1 transition-transform">
                  Več informacij
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div> */}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-8 sm:mt-12"
        >
          <Link href="/products">
            <Button className="bg-gradient-to-r from-brand-primary to-brand-primary-light hover:from-brand-primary-dark hover:to-brand-primary text-white border-0 h-10 sm:h-12 px-6 sm:px-8 text-sm sm:text-base">
              Raziskajte več produktov
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

