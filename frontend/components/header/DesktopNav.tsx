"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function DesktopNav() {
  const pathname = usePathname()
  const router = useRouter()


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
    }
  }

  return (
    <>
      <nav className="hidden md:flex items-center gap-4 lg:gap-8">
        <Link
          href="/#o-nas"
          onClick={(e) => handleAnchorClick(e, '#o-nas')}
          className="text-white/80 hover:text-white transition-colors py-2 px-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-light/70 text-sm lg:text-base"
        >
          O nas
        </Link>

        <Link
          href="/#nase-vrednote"
          onClick={(e) => handleAnchorClick(e, '#nase-vrednote')}
          className="text-white/80 hover:text-white transition-colors py-2 px-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-light/70 text-sm lg:text-base"
        >
          Naše vrednote
        </Link>

        <Link
          href="/products"
          className="text-white/80 hover:text-white transition-colors py-2 px-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-light/70 text-sm lg:text-base"
        >
          Produkti
        </Link>

        <Link
          href="/#kontakt"
          onClick={(e) => handleAnchorClick(e, '#kontakt')}
          className="text-white/80 hover:text-white transition-colors py-2 px-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-light/70 text-sm lg:text-base"
        >
          Kontakt
        </Link>
      </nav>

      <div className="hidden md:flex items-center gap-2 lg:gap-4">
        {/*    <Button 
          variant="ghost" 
          className="text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-brand-primary-light/70 text-sm lg:text-base"
        >
          Log in
        </Button>
        <Button 
          className="bg-gradient-to-r from-brand-primary to-brand-primary-light hover:from-brand-primary-dark hover:to-brand-primary text-white border-0 shadow-lg shadow-brand-primary-light/20 hover:shadow-brand-primary-light/30 transition-shadow text-sm lg:text-base px-3 lg:px-4"
        >
          Get Started
        </Button> */}
      </div>
    </>
  )
}
