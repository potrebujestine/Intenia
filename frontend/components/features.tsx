"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, Users, Shield, BarChart3 } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export default function ModernFeatures() {
  const [activeTab, setActiveTab] = useState("engineering")
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)

  // Set mounted state to true on client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  const features = [
    {
      id: "engineering",
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Inženirstvo",
      description:
        "Naša inženirska ekipa se odlikuje po celostnem pristopu, ki ponuja prilagojeno načrtovanje projektov in strokovne konzultacije. Zagotavljamo, da je vsak projekt zasnovan s poudarkom na učinkovitosti, trajnosti in varnosti.",
      benefits: [
        "Celostni pristop k načrtovanju projektov",
        "Strokovne konzultacijske storitve",
        "Osredotočenost na učinkovitost in trajnost",
        "Strogo spoštovanje regulativnih standardov",
      ],
      image: "/images/hero1.webp",
    },
    {
      id: "manufacturing",
      icon: <Zap className="h-5 w-5" />,
      title: "Proizvodnja",
      description:
        "Proizvodni oddelek proizvaja raznolik nabor visokokakovostnih izdelkov in različnih rezervnih delov. Izkoriščanje naprednih proizvodnih tehnik in najsodobnejše tehnologije zagotavlja natančnost in vrhunsko kakovost v vsakem izdelku, ki ga izdelamo.",
      benefits: [
        "CNC obdelava",
        "Storitve varjenja",
        "Površinske obdelave",
        "Proizvodnja visokokakovostnih rezervnih delov",
      ],
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "mounting",
      icon: <Users className="h-5 w-5" />,
      title: "Montaža opreme",
      description:
        "Ponujamo montažo opreme za zagotovitev brezhibne integracije in funkcionalnosti. Naši usposobljeni tehniki imajo obsežne izkušnje pri sestavljanju in nameščanju različnih vrst opreme, od težkih strojev do kompleksnih tehnoloških sistemov.",
      benefits: [
        "Prenove in nadgradnje",
        "Storitve montaže linij",
        "Natančno načrtovanje in izvedba",
        "Stroga kontrola kakovosti",
      ],
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: "brokerage",
      icon: <Shield className="h-5 w-5" />,
      title: "Posredovanje",
      description: "Občasno ponujamo posredovalne storitve za olajšanje mednarodne trgovine in širitve podjetja. Predstavljamo tuja podjetja v Sloveniji in slovenska podjetja v tujini, pri čemer izkoriščamo našo obsežno mrežo in poglobljeno lokalno strokovno znanje.",
      benefits: [
        "Olajšanje mednarodne trgovine",
        "Strokovno znanje navigacije po trgu",
        "Podpora čezmejnim transakcijam",
        "Obsežna partnerska mreža",
      ],
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  // Automatically update activeTab when a user selects a new tab
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    
    // Only scroll on mobile devices - fixed scrolling UX issue
    if (isMobile && mounted) {
      setTimeout(() => {
        const element = document.getElementById(`${value}-content`)
        if (element) {
          const yOffset = -80 // Adjust for header height
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      }, 100)
    }
  }

  // Prepare stable dimensions for content to prevent layout shifts
  const contentStyle = {
    minHeight: mounted ? "400px" : "auto", // Reduced height for mobile
  }

  return (
    <section id="features" className="py-12 px-4 sm:py-16 md:py-24 bg-black relative">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-primary/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-brand-primary-light/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Naše storitve</h2>
          <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto">
            Obsežen nabor storitev, prilagojenih potrebam naših strank
          </p>
        </motion.div>

        <Tabs defaultValue="engineering" value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="flex justify-center mb-6 sm:mb-8 overflow-x-auto pb-3 sm:pb-0 scrollbar-hide">
            <TabsList className="bg-white/5 backdrop-blur-sm border border-white/10 p-1 rounded-xl flex-nowrap">
              {features.map((feature) => (
                <TabsTrigger
                  key={feature.id}
                  value={feature.id}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-primary data-[state=active]:to-brand-primary-light data-[state=active]:text-white rounded-lg p-2 sm:px-3 sm:py-1.5 whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="flex items-center justify-center">{feature.icon}</span>
                    <span className="hidden sm:inline text-sm md:text-base">{feature.title}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Mobile feature title display - only visible on mobile */}
          <div className="sm:hidden text-center mb-4">
            <h3 className="text-lg font-bold">{features.find(f => f.id === activeTab)?.title}</h3>
          </div>

          <div style={contentStyle} className="relative">
            {features.map((feature) => (
              <TabsContent
                key={feature.id}
                value={feature.id}
                className="focus-visible:outline-none focus-visible:ring-0 scroll-mt-20 absolute top-0 left-0 w-full transition-opacity"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Image shown first on mobile and a simpler feature display */}
                    <div className="relative order-first mb-4 md:hidden min-h-[185px]">
                      <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-primary-light rounded-2xl blur-md opacity-70"></div>
                      <div className="relative bg-black/80 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden p-1">
                        <img
                          src={feature.image || "/placeholder.svg"}
                          alt={feature.title}
                          className="w-full h-auto rounded-lg"
                           
                        />
                      </div>
                    </div>
                    
                    <p className="text-white/70 text-sm sm:text-base mb-4 mt-8 sm:mb-6">{feature.description}</p>

                    {/* More simplified list for mobile */}
                    <ul className="space-y-2 sm:space-y-3">
                      {feature.benefits.slice(0, 3).map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm sm:text-base">
                          <div className="h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-gradient-to-r from-brand-primary to-brand-primary-light flex items-center justify-center text-xs font-bold">
                            ✓
                          </div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Desktop image view */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative hidden md:block"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-primary-light rounded-2xl blur-lg opacity-70"></div>
                    <div className="relative bg-black/80 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden p-1 ">
                      <img
                        src={feature.image || "/placeholder.svg"}
                        alt={feature.title} 
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  </motion.div>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  )
}
