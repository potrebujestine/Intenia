"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import DesktopNav from "./DesktopNav"
import MobileNav from "./MobileNav"

export default function ModernHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])


  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header
      style={{ paddingRight: "var(--removed-body-scroll-bar-size)" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 h-[60px] flex items-center",
        scrolled ? "bg-black/80 backdrop-blur-lg shadow-lg shadow-black/20 border-b border-white/10" : "bg-transparent"
      )}
    >
      <div className="container mx-auto pl-0 pr-4 flex items-center justify-between relative">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white focus-visible:ring-2 focus-visible:ring-brand-primary-light/70 h-9 w-9 z-10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Zapri meni" : "Odpri meni"}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {!isHomePage && (
          <div className="absolute left-1/2 transform -translate-x-1/2 md:hidden">
            <Link href="/">
              <Image
                src="/images/logos/intenia-logo-2.png"
                alt="Intenia Engineering Logo"
                width={200}
                height={40}
                className="h-5 w-auto"
                priority
              />
            </Link>
          </div>
        )}

        <DesktopNav />
      </div>

      {/* Mobile Menu */}
      <MobileNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  )
}
