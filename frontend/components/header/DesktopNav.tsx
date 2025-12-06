"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useLanguage } from "@/context/LanguageContext"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const languages = [
  { code: "sl", label: "Slovenščina", flag: "🇸🇮" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
]

export default function DesktopNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { selectedLanguage, setSelectedLanguage } = useLanguage()
  const t = useTranslations("nav")

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const hash = href

      if (pathname === '/') {
        const element = document.querySelector(hash)
        if (element) {
          const headerHeight = 60
          let offset = headerHeight

          if (hash === '#kontakt') {
            offset = headerHeight - 20
          } else if (hash === '#o-nas') {
            offset = headerHeight + 20
          }

          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - offset
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
        }
      } else {
        router.push(`/${hash}`)
      }
    }
  }
  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value as "sl" | "en" | "fr")
  }

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage) || languages[0]

  return (
    <>
      <Link href="/" className="hidden md:flex items-center   mr-2 lg:mr-4 ml-2 lg:ml-4">
        <Image
          src="/images/logos/intenia-logo-2.png"
          alt="Intenia Engineering Logo"
          width={150}
          height={40}
          className="h-5 w-auto"
          priority
        />
      </Link>
      <nav className="hidden md:flex items-center gap-4 lg:gap-8">
        <Link
          href="/#o-nas"
          onClick={(e) => handleAnchorClick(e, '#o-nas')}
          className="text-white/80 hover:text-white transition-colors py-2 px-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-light/70 text-sm lg:text-base"
        >
          {t("about")}
        </Link>

        {/*   <Link
          href="/#nase-vrednote"
          onClick={(e) => handleAnchorClick(e, '#nase-vrednote')}
          className="text-white/80 hover:text-white transition-colors py-2 px-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-light/70 text-sm lg:text-base"
        >
          {t("values")}
        </Link> */}

        <Link
          href="/products"
          className="text-white/80 hover:text-white transition-colors py-2 px-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-light/70 text-sm lg:text-base"
        >
          {t("products")}
        </Link>

        <Link
          href="/gallery"
          className="text-white/80 hover:text-white transition-colors py-2 px-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-light/70 text-sm lg:text-base"
        >
          {t("gallery")}
        </Link>

        <Link
          href="/#kontakt"
          onClick={(e) => handleAnchorClick(e, '#kontakt')}
          className="text-white/80 hover:text-white transition-colors py-2 px-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-light/70 text-sm lg:text-base"
        >
          {t("contact")}
        </Link>
      </nav>

      <div className="hidden md:flex items-center gap-1 lg:gap-3">
        <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-[110px] h-9 bg-white/5 border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200 [&>span:first-of-type]:hidden focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus:outline-none focus:border-white/10 active:border-white/10 data-[state=open]:border-white/10 data-[state=closed]:border-white/10 [&:focus]:border-white/10 [&:active]:border-white/10 [&:focus-visible]:border-white/10 [&:focus-visible]:ring-0">
            <SelectValue />
            <div className="flex items-center gap-2">
              <span>{currentLanguage.flag}</span>
              <span className="text-sm">{currentLanguage.code.toUpperCase()}</span>
            </div>
          </SelectTrigger>
          <SelectContent className="bg-black/95 backdrop-blur-sm border-white/10 text-white">
            {languages.map((language) => (
              <SelectItem
                key={language.code}
                value={language.code}
                className="hover:bg-white/10  cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">{language.flag}</span>
                  <span>{language.code.toUpperCase()}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  )
}