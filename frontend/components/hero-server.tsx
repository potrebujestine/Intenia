"use client"

import Image from "next/image"
import HeroClient from "./hero-client"
import { useWPData } from "@/hooks/useWPData"

export default function HeroServer() {
  const { data: wpHeaderSection, loading } = useWPData("header-section")
  const headerSection = wpHeaderSection?.[0]

  const title = headerSection?.title?.rendered
  const buttonText = headerSection?.button_text

  if (loading) {
    return (
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-black pt-8 sm:pt-12 md:pt-16 mt-4 sm:mt-6 md:mt-8">
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center w-full">
          <div className="flex-1 flex items-center justify-center w-full">
            <Image
              src="/images/logos/intenia-logo-2.png"
              alt="Intenia Engineering Logo"
              width={1200}
              height={480}
              className="w-full h-auto max-w-full object-contain"
              priority
              fetchPriority="high"
            />
          </div>
          <div className="text-center leading-tight items-center justify-center mt-12 sm:mt-20 md:mt-28 lg:mt-48">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">Intenia Engineering</h1>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-black pt-8 sm:pt-12 md:pt-16 mt-4 sm:mt-6 md:mt-8">
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center w-full">
        <div className="flex-1 flex items-center justify-center w-full">
          <Image
            src="/images/logos/intenia-logo-2.png"
            alt="Intenia Engineering Logo"
            width={1200}
            height={480}
            className="w-full h-auto max-w-full object-contain"
            priority
            fetchPriority="high"
          />
        </div>
        <div className="text-center leading-tight items-center justify-center mt-36 sm:mt-42 md:mt-48 lg:mt-48">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">{title || "Intenia Engineering"}</h1>
          <HeroClient buttonText={buttonText} />
        </div>
      </div>
    </section>
  )
}
