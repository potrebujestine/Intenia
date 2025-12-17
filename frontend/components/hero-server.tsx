import Image from "next/image"
import HeroClient from "./hero-client"

export const revalidate = 3600

async function getHeaderSection(locale: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const url = `${baseUrl}/api/wp/header-section?lang=${locale}`

    const response = await fetch(url, {
      next: { revalidate: 3600 }
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data?.[0] || null
  } catch (error) {
    return null
  }
}

export default async function HeroServer({ locale }: { locale: string }) {
  const headerSection = await getHeaderSection(locale)

  const title = headerSection?.title?.rendered
  const buttonText = headerSection?.button_text

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