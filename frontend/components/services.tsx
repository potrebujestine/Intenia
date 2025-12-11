"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useWPData } from "@/hooks/useWPData"

export default function Services() {
  const { data: wpServices, loading } = useWPData("services")
  const { data: wpServicesSection, loading: servicesSectionLoading } = useWPData("services-section")

  const servicesSection = wpServicesSection?.[0]
  const header = servicesSection?.header
  const description = servicesSection?.description

  const services = wpServices.map((service: any) => ({
    id: service.id,
    name: service.service_title || service.title.rendered,
    description: service.short_description || service.content.rendered || "",
    image: service.image?.guid || "/images/placeholder.png",
    category: service.acf?.category || "Storitve",
  }))


  const ServiceSkeleton = ({ index }: { index: number }) => (
    <div className={`w-full py-16 md:py-24 ${index % 2 === 0 ? 'bg-white/5' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 order-2 md:order-1 text-left">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-white/10 animate-pulse rounded"></div>
              <div className="h-12 bg-white/10 animate-pulse rounded w-3/4"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-white/10 animate-pulse rounded w-full"></div>
              <div className="h-4 bg-white/10 animate-pulse rounded w-5/6"></div>
              <div className="h-4 bg-white/10 animate-pulse rounded w-4/6"></div>
            </div>
          </div>
          <div className="flex-1 order-1 md:order-2 w-full">
            <div className="relative h-[300px] md:h-[450px] w-full bg-white/10 animate-pulse rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <section className="relative bg-black overflow-hidden" aria-labelledby="services-heading">
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
          <h2 id="services-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-6 text-white">
            {header}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col relative z-10">
        {loading ? (
          <>
            {[1, 2, 3].map((i) => (
              <ServiceSkeleton key={i} index={i - 1} />
            ))}
          </>
        ) : (
          services.map((service: any, index: number) => (
            <motion.div
              key={service.id}
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
                      <span className="text-brand-primary text-4xl md:text-5xl font-black tracking-tighter leading-none ">III</span>
                      <h3 className="text-3xl md:text-4xl font-bold uppercase text-white leading-tight">
                        {service.name}
                      </h3>
                    </div>
                    <p
                      className="text-lg text-white/70 leading-relaxed mb-8 max-w-xl"
                      dangerouslySetInnerHTML={{ __html: service.description }}
                    />
                  </div>

                  <div className="flex-1 order-1 md:order-2 w-full">
                    <div className="relative h-[300px] md:h-[450px] w-full overflow-hidden rounded-lg shadow-lg">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        priority={index < 2}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                        className="object-cover hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <div className="container mx-auto px-4 py-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >

        </motion.div>
      </div>
    </section>
  )
}

