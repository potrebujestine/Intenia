"use client"

import { Link } from "@/routing"
import Image from "next/image"
import { Twitter, Facebook, Instagram, Linkedin, Github } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useTranslations } from "next-intl"

export default function ModernFooter() {
  const t = useTranslations("footer")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [revealRadius, setRevealRadius] = useState(0)
  const [revealOpacity, setRevealOpacity] = useState(0)
  const logoContainerRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLElement>(null)
  const isMobile = useIsMobile()
  const hoverZoneRadius = 900
  const maxRevealRadius = 1000
  const minRevealRadius = 300

  const revealStartOffset = -300
  const revealEndOffset = 0
  const revealSensitivity = 0.8

  useEffect(() => {
    if (isMobile) {
      const handleScroll = () => {
        if (!logoContainerRef.current || !footerRef.current) return

        const rect = logoContainerRef.current.getBoundingClientRect()
        const footerRect = footerRef.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight

        const footerTop = footerRect.top
        const footerBottom = footerRect.bottom
        const footerHeight = footerRect.height

        const isFooterVisible = footerBottom > 0 && footerTop < viewportHeight

        if (isFooterVisible) {
          const footerVisibleHeight = Math.min(viewportHeight - footerTop, footerHeight)
          const totalRevealDistance = viewportHeight + revealStartOffset
          const scrollProgress = Math.max(0, Math.min(1, (footerVisibleHeight + revealStartOffset) / totalRevealDistance * revealSensitivity))

          setIsHovering(true)

          const revealX = rect.width / 2
          const revealY = Math.max(0, Math.min(rect.height, rect.height * scrollProgress))

          setMousePosition({ x: revealX, y: revealY })

          const proximity = scrollProgress
          const radius = minRevealRadius + (maxRevealRadius - minRevealRadius) * proximity
          const opacity = proximity

          setRevealRadius(radius)
          setRevealOpacity(opacity)
        } else {
          setIsHovering(false)
          setRevealRadius(0)
          setRevealOpacity(0)
        }
      }

      handleScroll()
      window.addEventListener("scroll", handleScroll, { passive: true })
      window.addEventListener("resize", handleScroll, { passive: true })
      return () => {
        window.removeEventListener("scroll", handleScroll)
        window.removeEventListener("resize", handleScroll)
      }
    } else {
      const handleMouseMove = (e: MouseEvent) => {
        if (!logoContainerRef.current) return

        const rect = logoContainerRef.current.getBoundingClientRect()
        const mouseX = e.clientX
        const mouseY = e.clientY

        const containerLeft = rect.left
        const containerRight = rect.right
        const containerTop = rect.top
        const containerBottom = rect.bottom

        const isMouseInside = mouseX >= containerLeft && mouseX <= containerRight &&
          mouseY >= containerTop && mouseY <= containerBottom

        let distanceToContainer = 0
        let closestX = mouseX
        let closestY = mouseY

        if (isMouseInside) {
          closestX = mouseX
          closestY = mouseY
          distanceToContainer = 0
        } else {
          if (mouseX < containerLeft) {
            closestX = containerLeft
          } else if (mouseX > containerRight) {
            closestX = containerRight
          } else {
            closestX = mouseX
          }

          if (mouseY < containerTop) {
            closestY = containerTop
          } else if (mouseY > containerBottom) {
            closestY = containerBottom
          } else {
            closestY = mouseY
          }

          const dx = mouseX - closestX
          const dy = mouseY - closestY
          distanceToContainer = Math.sqrt(dx * dx + dy * dy)
        }

        if (distanceToContainer <= hoverZoneRadius) {
          setIsHovering(true)

          const revealX = Math.max(0, Math.min(rect.width, closestX - rect.left))
          const revealY = Math.max(0, Math.min(rect.height, closestY - rect.top))

          setMousePosition({ x: revealX, y: revealY })

          const normalizedDistance = Math.min(distanceToContainer / hoverZoneRadius, 1)
          const proximity = 1 - normalizedDistance

          const radius = minRevealRadius + (maxRevealRadius - minRevealRadius) * proximity
          const opacity = proximity

          setRevealRadius(radius)
          setRevealOpacity(opacity)
        } else {
          setIsHovering(false)
          setRevealRadius(0)
          setRevealOpacity(0)
        }
      }

      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isMobile, hoverZoneRadius, maxRevealRadius, minRevealRadius, revealStartOffset, revealSensitivity])

  return (
    <footer ref={footerRef} className="bg-black   px-3 sm:px-6 lg:px-8">
      <div className="container mx-auto px-4 gap-4 flex flex-col">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12">
          <div>
            {/*  <p className="text-white/70 mb-6">
              Omogočanje podjetjem z rešitvami, ki jih poganja umetna inteligenca, za spodbujanje rasti in učinkovitosti.
            </p> */}
            <div className="flex space-x-4">
              {/*   <Link href="#" className="text-white/50 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-white/50 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-white/50 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link> */}
              <div className="flex items-center space-x-2">
                <span>{t("followUs")}</span>
                <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/company/intenia-engineering" className="text-white hover:text-white/80 transition-colors relative bottom-[3.5px]">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>

              {/*  <Link href="#" className="text-white/50 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link> */}
            </div>
          </div>

          {/*  <div>
            <h3 className="text-lg font-bold mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Customers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div> *

          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors">
                  Status
                </Link>
              </li>
            </ul>
          </div> */}
        </div>

        <div className="flex flex-col md:flex-row justify-between justify-start  sm:items-center ">
          <p className="text-white/50 text-sm mb-2 sm:mb-4 md:mb-0">© {new Date().getFullYear()} Intenia Engineering. {t("copyright")}</p>
          <div className="flex gap-6">
            <Link href="/cookies" className="text-white/50 hover:text-white text-sm transition-colors">
              {t("privacyAndCookies")}
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full  py-8 sm:py-12 h-[400px] d-flex ">
        <div className="w-full flex items-end justify-center h-full items-center sm:items-end">
          <div
            ref={logoContainerRef}
            className="relative w-full mx-auto px-4 group"
          >
            <div className="relative w-full h-16 sm:h-24 md:h-32">
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  maskImage: isHovering
                    ? `radial-gradient(circle ${revealRadius * 2}px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, black 20%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 70%, transparent 100%)`
                    : 'radial-gradient(circle 0px at 50% 50%, transparent 0%, transparent 100%)',
                  WebkitMaskImage: isHovering
                    ? `radial-gradient(circle ${revealRadius * 2}px at ${mousePosition.x}px ${mousePosition.y}px, black 0%, black 20%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 70%, transparent 100%)`
                    : 'radial-gradient(circle 0px at 50% 50%, transparent 0%, transparent 100%)',
                  transition: isHovering ? 'mask-image 0.1s ease-out, -webkit-mask-image 0.1s ease-out, opacity 0.1s ease-out' : 'mask-image 0.3s ease-out, -webkit-mask-image 0.3s ease-out, opacity 0.3s ease-out',
                  opacity: revealOpacity,
                }}
              >
                <Image
                  src="/images/logos/intenia-logo.png"
                  alt="Intenia Engineering Logo"
                  width={1200}
                  height={480}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
