"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import dynamic from "next/dynamic"

const ContactForm = dynamic(() => import("@/components/contact-form"), {
  loading: () => <div className="min-h-[400px] bg-black" />,
})

interface GalleryImage {
  ID: string;
  url: string;
  title?: string;
}

interface GalleryClientProps {
  images: GalleryImage[];
}

export default function GalleryClient({ images }: GalleryClientProps) {
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
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <section
        className="relative py-12 sm:py-16 md:py-24 bg-black overflow-hidden"
        aria-labelledby="gallery-heading"
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
            <h1 id="gallery-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
              Galerija
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto">
              Naši projekti in dosežki
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {images.map((image, index) => (
              <motion.div
                key={image.ID}
                variants={itemVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-primary-light rounded-xl blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative rounded-lg overflow-hidden h-full">
                  <div className="relative w-full h-64 sm:h-72 lg:h-80 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={image.url}
                      alt={image.title || "Gallery image"}
                      fill
                      priority={index < 9}
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <ContactForm />
    </div>
  )
}
