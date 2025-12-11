"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useWPData } from "@/hooks/useWPData"



export default function HeroTest() {
  const { data: wpHeaderSection, loading } = useWPData("header-section")

  const headerSection = wpHeaderSection?.[0]
  const title = headerSection?.title?.rendered
  const buttonText = headerSection?.meta?.button_text

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-black pt-16 mt-8">
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center w-full">
        <div className="flex-1 flex items-center justify-center w-full">
          <Image
            src="/images/logos/intenia-logo-2.png"
            alt="Intenia Engineering Logo"
            width={1200}
            height={480}
            className="w-full h-auto max-w-full object-contain"
            priority
          />
        </div>
        <div className="text-center leading-tight max-w-[300px] items-center justify-center mt-36">
          {loading ? (
            <>
              <p className="h-6 bg-gray-800 rounded animate-pulse mb-6"></p>
              <div className="h-12 bg-gray-800 rounded-full animate-pulse w-full max-w-[200px] mx-auto"></div>
            </>
          ) : (
            <>
              <p className="mb-6">{title || ""}</p>
              <Button
                onClick={() => {
                  document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="bg-brand-primary hover:bg-brand-primary-dark text-white h-12 px-8 text-base rounded-full group mt-6"
              >
                {buttonText || ""}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
