"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { Link } from "@/routing"
import { useTranslations } from "next-intl"

interface ServicesClientProps {
  services: any[]
  section: any
}

export default function ServicesClient({ services: wpServices, section: servicesSection }: ServicesClientProps) {
  const t = useTranslations("products")
  const header = servicesSection?.header
  const description = servicesSection?.description

  const services = wpServices.map((service: any) => ({
    id: service.id,
    name: service.service_title || service.title.rendered,
    description: service.short_description || service.content.rendered || "",
    images: Array.isArray(service.image)
      ? service.image.map((img: any) => img?.guid || "/images/placeholder.png")
      : service.image?.[0]?.guid
        ? [service.image[0].guid]
        : ["/images/placeholder.png"],
    category: service.acf?.category,
  }))

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
          <h2 id="services-heading" className="text-3xl  md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            {header}
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col relative z-10">
        {services.map((service: any, index: number) => (
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
                <div className="flex-1 order-1 md:order-1 text-left">
                  <div className="flex items-start gap-4 mb-6">
                    <span className="text-brand-primary text-4xl md:text-5xl font-black tracking-tighter leading-none ">III</span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-white leading-tight">
                      {service.name}
                    </h3>
                  </div>
                  <p
                    className="text-base text-white/70 mb-4 flex-grow leading-relaxed prose prose-invert"
                    dangerouslySetInnerHTML={{ __html: service.description }}
                  />
                </div>

                <div className="flex-1 order-2 md:order-2 w-full">
                  {service.images.length === 1 ? (
                    <div className="relative h-[300px] md:h-[450px] w-full overflow-hidden rounded-lg shadow-lg">
                      <Image
                        src={service.images[0]}
                        alt={service.name}
                        fill
                        priority={index < 2}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                        className="object-cover hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ) : service.images.length === 2 ? (
                    <div className="grid grid-rows-2 gap-3 h-[300px] md:h-[450px]">
                      {service.images.map((img: string, imgIndex: number) => (
                        <div key={imgIndex} className="relative w-full h-full overflow-hidden rounded-lg shadow-lg">
                          <Image
                            src={img}
                            alt={`${service.name} ${imgIndex + 1}`}
                            fill
                            priority={index < 2 && imgIndex === 0}
                            placeholder="blur"
                            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                            className="object-cover hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      ))}
                    </div>
                  ) : service.images.length >= 3 ? (
                    <div className="grid grid-cols-2 gap-3 h-[300px] md:h-[450px]">
                      <div className="relative row-span-2 overflow-hidden rounded-lg shadow-lg">
                        <Image
                          src={service.images[0]}
                          alt={`${service.name} 1`}
                          fill
                          priority={index < 2}
                          placeholder="blur"
                          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                          className="object-cover hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                      {service.images.slice(1, 3).map((img: string, imgIndex: number) => (
                        <div key={imgIndex + 1} className="relative w-full h-full overflow-hidden rounded-lg shadow-lg">
                          <Image
                            src={img}
                            alt={`${service.name} ${imgIndex + 2}`}
                            fill
                            priority={index < 2 && imgIndex === 0}
                            placeholder="blur"
                            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                            className="object-cover hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </div>
                      ))}
                    </div>
                  ) : null}
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
          <Link href="/gallery">
            <Button className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white bg-transparent h-12 px-8 text-base rounded-full group">
              {t("pastProjects")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}