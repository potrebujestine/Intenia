"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function SocialProof() {
  const companies = [
    { name: "Engineering", logo: "https://cdn.simpleicons.org/slack" },
    { name: "Manufacturing", logo: "https://cdn.simpleicons.org/github" },
    { name: "Mounting", logo: "https://cdn.simpleicons.org/notion" },
    { name: "Brokerage", logo: "https://cdn.simpleicons.org/google" },
    { name: "Consulting", logo: "https://cdn.simpleicons.org/figma" },
    { name: "Partnerships", logo: "https://cdn.simpleicons.org/stripe" },
  ];

  const stats = [
    { value: "10+", label: "Let izkušenj" },
    { value: "4+", label: "Članov ekipe" },
    { value: "EU", label: "Industrijskih partnerjev" },
    { value: "100%", label: "Zaveza k kakovosti" },
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
      className="relative py-12 sm:py-16 md:py-20 overflow-hidden bg-black"
      aria-labelledby="social-proof-heading"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-50" aria-hidden="true">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-brand-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-brand-primary-light/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-repeat opacity-5"></div>
      </div>

      <div className="container relative z-10 px-4 md:px-8">
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-base sm:text-lg text-brand-primary-light font-medium mb-2">Intenia Engineering d.o.o.</p>
          <h2 id="social-proof-heading" className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Več kot 10 let izkušenj</h2>
        </motion.div>

        {/* Company logos */}
        {/*    <motion.div
          className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 sm:gap-x-8 md:gap-x-12 mb-12 sm:mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          aria-label="Companies using our platform"
        >
          {companies.map((company, index) => (
            <motion.div
              key={index}
              className="opacity-60 hover:opacity-100 transition-all duration-300"
              variants={itemVariants}
            >
     
              <div className="w-[30px] h-[30px] sm:w-[80px] sm:h-[80px] md:h-[40px] flex items-center justify-center">
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  width={60}
                  height={60}
                  className="object-contain filter brightness-0 invert"
                />
              </div>
            </motion.div>
          ))}
        </motion.div> */}

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 auto-rows-fr"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          aria-label="Key platform statistics"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} className="text-center h-full" variants={itemVariants}>
              <div className="relative group h-full">
                <div
                  className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-primary-light rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-300"
                  aria-hidden="true"
                ></div>
                <div
                  className="relative bg-black/70 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/10 h-full flex flex-col justify-center"
                  role="presentation"
                >
                  <div
                    className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-brand-primary to-brand-primary-light bg-clip-text text-transparent mb-1 sm:mb-2 truncate"
                    aria-hidden="true"
                  >
                    {stat.value}
                  </div>
                  <p
                    className="text-white/70 text-sm sm:text-base truncate"
                    aria-label={`${stat.value} ${stat.label}`}
                  >
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
