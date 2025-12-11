"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HeroClient({ buttonText }: { buttonText: string }) {
  return (
    <Button
      onClick={() => {
        document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
      className="bg-brand-primary hover:bg-brand-primary-dark text-white h-12 px-8 text-base rounded-full group mt-6"
    >
      {buttonText}
      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Button>
  )
}
