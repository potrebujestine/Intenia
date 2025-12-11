import Image from "next/image"
import { cookies } from "next/headers"
import HeroClient from "./hero-client"

async function getHeaderSection(lang: string) {
  try {
    const res = await fetch(
      `https://wp.intenia-engineering.si/wp-json/wp/v2/header-section?lang=${lang}&_embed`,
      { next: { revalidate: 60 } }
    )
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export default async function HeroServer() {
  const cookieStore = await cookies()
  const lang = cookieStore.get("intenia-language")?.value || "en"

  const wpHeaderSection = await getHeaderSection(lang)
  const headerSection = wpHeaderSection?.[0]

  const title = headerSection?.title?.rendered
  const buttonText = headerSection.button_text

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
            fetchPriority="high"
          />
        </div>
        <div className="text-center leading-tight max-w-[300px] items-center justify-center mt-36">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">{title || "Intenia Engineering"}</h1>
          <HeroClient buttonText={buttonText} />
        </div>
      </div>
    </section>
  )
}
