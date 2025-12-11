"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useLanguage } from "@/context/LanguageContext"
import { cn } from "@/lib/utils"
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

type MobileNavProps = {
  isOpen: boolean
  onClose: () => void
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
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
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      } else {
        router.push(`/${hash}`)
      }
      onClose()
    }
  }

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value as "sl" | "en" | "fr")
    onClose()
  }

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage) || languages[0]

  return (
    <div
      className={cn(
        "md:hidden fixed inset-x-0 top-[60px] bg-black/95 backdrop-blur-lg border-t border-white/10 transition-all duration-300 overflow-hidden",
        isOpen ? "max-h-[calc(100vh-60px)] opacity-100" : "max-h-0 opacity-0"
      )}
    >
      <div className={cn(
        "container mx-auto px-3 py-4 flex flex-col gap-2 transition-all duration-300 overflow-y-auto",
        isOpen ? "translate-y-0" : "-translate-y-4"
      )}>
        <Link
          href="/#o-nas"
          onClick={(e) => handleAnchorClick(e, '#o-nas')}
          className="py-2 px-2 border-b border-white/10 hover:bg-white/5 rounded-md transition-colors active:bg-white/10"
        >
          {t("about")}
        </Link>

        {/*   <Link
          href="/#nase-vrednote"
          onClick={(e) => handleAnchorClick(e, '#nase-vrednote')}
          className="py-2 px-2 border-b border-white/10 hover:bg-white/5 rounded-md transition-colors active:bg-white/10"
        >
          {t("values")}
        </Link> */}

        <Link
          href="/products"
          onClick={onClose}
          className="py-2 px-2 border-b border-white/10 hover:bg-white/5 rounded-md transition-colors active:bg-white/10"
        >
          {t("products")}
        </Link>

        <Link
          href="/gallery"
          onClick={onClose}
          className="py-2 px-2 border-b border-white/10 hover:bg-white/5 rounded-md transition-colors active:bg-white/10"
        >
          {t("gallery")}
        </Link>

        <Link
          href="/#kontakt"
          onClick={(e) => handleAnchorClick(e, '#kontakt')}
          className="py-2 px-2 border-b border-white/10 hover:bg-white/5 rounded-md transition-colors active:bg-white/10"
        >
          {t("contact")}
        </Link>

        <div className="pt-3 border-t border-white/10 mt-2">
          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger
              className="w-full h-10 bg-white/5 border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200 [&>span:first-of-type]:hidden focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus:outline-none focus:border-white/10"
              aria-label="Select language"
            >
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
                  className="hover:bg-white/10 cursor-pointer"
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
      </div>
    </div>
  )
}
