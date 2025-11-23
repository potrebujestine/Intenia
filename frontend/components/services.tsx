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

  return (
    <section className="relative bg-black overflow-hidden" aria-labelledby="products-heading">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-primary/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-brand-primary-light/10 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-repeat opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 id="products-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Naše storitve
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto">
            Obsežne rešitve, prilagojene vašim industrijskim potrebam
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col relative z-10">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`w-full py-16 md:py-24 ${index % 2 === 0 ? 'bg-white/5' : 'bg-transparent'}`}
          >
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                <div className="flex-1 order-2 md:order-1 text-left">
                  <div className="flex items-start gap-4 mb-6">
                    <span className="text-brand-primary text-4xl md:text-5xl font-black tracking-tighter leading-none mt-1">III</span>
                    <h3 className="text-3xl md:text-5xl font-bold uppercase text-white leading-tight">
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-xl">
                    {product.description}
                  </p>
                </div>

                <div className="flex-1 order-1 md:order-2 w-full">
                  <div className="relative h-[300px] md:h-[450px] w-full overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
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

