"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Target, Network, Lightbulb, Leaf, Shield } from "lucide-react";
import Image from "next/image";
import { useWPData } from "@/hooks/useWPData";

export default function AboutUs() {
  const { data: aboutUsFacts, loading, error } = useWPData("about-us-carousel")
  const { data: aboutUsSections, loading: sectionsLoading } = useWPData("about-us-section")
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const extractImageUrl = (htmlString: string): string | null => {
    if (!htmlString) return null;
    const match = htmlString.match(/src="([^"]+)"/);
    return match ? match[1] : null;
  };

  const sortedSections = [...aboutUsSections].sort((a, b) => {
    const orderA = Number(a.order) || 0;
    const orderB = Number(b.order) || 0;
    return orderA - orderB;
  });

  const firstSection = sortedSections.find((section) => Number(section.order) === 1);
  const otherSections = sortedSections.filter((section) => Number(section.order) !== 1);



  const icons = [Lightbulb, Target, Leaf, Shield, Users, Network]



  // Progress animation
  useEffect(() => {
    const duration = 2500;
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(newProgress);

      if (newProgress < 100) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [currentSlide]);

  useEffect(() => {
    if (aboutUsFacts.length > 0 && progress >= 100) {
      setCurrentSlide((prev) => (prev + 1) % aboutUsFacts.length);
      setProgress(0);
    }
  }, [progress, aboutUsFacts.length]);

  // Reset progress when slide changes
  useEffect(() => {
    setProgress(0);
  }, [currentSlide]);

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-black relative overflow-x-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-primary/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-brand-primary-light/10 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-repeat opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
        {/* About Us Section */}
        <motion.div
          id="o-nas"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 lg:mt-8 scroll-mt-8"
        >
          <div className="flex flex-col-reverse justify-between items-start gap-12 lg:flex-row lg:gap-0">
            {/* Left Side - Slider */}
            <div className="w-full relative lg:w-1/3">
              <div
                className="relative w-full flex overflow-hidden bg-black/90 backdrop-blur-sm border border-white/10 rounded-[15px] aspect-[4/5] lg:aspect-[3/4] lg:rounded-[29px] cursor-pointer"
                onClick={() => {
                  setCurrentSlide((prev) => (prev + 1) % aboutUsFacts.length);
                  setProgress(0);
                }}
              >
                {/* Slide Indicators */}
                <div className="z-20 w-full flex justify-evenly gap-2 absolute bottom-8 left-0 px-8 pointer-events-none">
                  {aboutUsFacts.map((_, index) => (
                    <div
                      key={index}
                      className="h-0.5 flex-1 relative overflow-hidden bg-white/30"
                    >
                      {index === currentSlide && (
                        <motion.div
                          className="absolute top-0 left-0 h-full bg-brand-primary-light"
                          initial={{ width: "0%" }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.16, ease: "linear" }}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="absolute top-0 left-0 w-full h-full rounded-[29px]">
                  {aboutUsFacts.map((fact, index) => {
                    return (
                      <motion.div
                        key={index}
                        initial={false}
                        animate={{
                          opacity: index === currentSlide ? 1 : 0,
                          x: index === currentSlide ? 0 : index < currentSlide ? -50 : 50,
                          scale: index === currentSlide ? 1 : 0.95,
                        }}
                        transition={{
                          duration: 0.4,
                          ease: [0.4, 0, 0.2, 1]
                        }}
                        className={`absolute top-0 left-0 w-full h-full flex justify-center items-center px-6 sm:px-10 ${index === currentSlide ? "z-10" : "z-0 pointer-events-none"
                          }`}
                      >
                        <div className="w-full text-center">
                          <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                            {fact.short_text}
                          </h4>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-3/5 ">
              <div className="relative">
                {!sectionsLoading && firstSection && Number(firstSection.order) === 1 ? (
                  <>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-6 text-white">
                      {firstSection.heading || firstSection.title?.rendered || "O nas"}
                    </h2>
                    <div
                      className="text-sm sm:text-base md:text-lg text-white/60 mb-8 lg:mb-12"
                      dangerouslySetInnerHTML={{ __html: firstSection.description || firstSection.content?.rendered || "" }}
                    />
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-6 text-white">
                      O nas
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-white/60 mb-8 lg:mb-12">
                      Inteniaaa, ki je bazirana v Sloveniji je od leta 2013 rasla kot zanesljiv industrijski partner. V tem času smo si zgradili močno mrežo preverjenih kooperantov in partnerjev, s katerimi dolgoročno sodelujemo in jim zaupamo pri izvedbi projektov. Danes to izkušnjo nadgrajujemo kot Intenia Engineering d.o.o.. Reorganizacija, posodobljeni procesi in pomlajena ekipa so nas usmerili v novo fazo. Združujemo naučeno iz preteklosti in energijo nove generacije. Naš cilj je preprost: dostaviti rešitve, ki merljivo izboljšajo procese, so varne in trajnostne ter ostanejo skladni z evropskimi standardi. (intenia v intenia engineering)
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* New Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 lg:mt-32"
        >
          {otherSections.length > 0 ? (
            otherSections.map((section, index) => {
              const imageHtml = typeof section.image === 'string' ? section.image : "";
              const imageUrl = extractImageUrl(imageHtml);
              const isReversed = index % 2 === 1;
              const isLast = index === otherSections.length - 1;

              return (
                <div
                  key={section.id}
                  className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-20 ${isLast ? "pb-20" : "mb-20 lg:mb-32"}`}
                >
                  <div className="w-full lg:w-1/2">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
                      {section.heading || section.title?.rendered || ""}
                    </h3>
                    <div
                      className="text-base sm:text-lg text-white/70 [&>p]:mb-6 [&>p:last-child]:mb-0"
                      dangerouslySetInnerHTML={{ __html: section.description || section.content?.rendered || "" }}
                    />
                    {Number(section.order) === 4 && (
                      <a href="#kontakt" className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 duration-200 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white h-12 px-8 text-base rounded-full group mt-6">
                        Kontaktirajte nas
                      </a>
                    )}
                  </div>
                  <div className="w-full lg:w-1/2">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={section.heading || section.title?.rendered || ""}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/30">
                          No image
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <>
            </>
          )}
          <div className="mb-20 lg:mb-32">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-12 text-center">Naša načela</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors p-16">
                <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-brand-primary" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">Praktična vrednost</h4>
                <p className="text-white/70">
                  Našo kulturo vodijo jasno definirana načela. Rešitve morajo biti praktično uporabne in naročniku prinesti konkretno vrednost – bodisi v obliki višje zanesljivosti, manjših izpadov, nižjih stroškov ali lažjega vzdrževanja.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors p-16">
                <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-brand-primary" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">Racionalnost in varnost</h4>
                <p className="text-white/70">
                  Pri zasnovi smo racionalni. Namesto nepotrebnega kompliciranja iščemo tehnično utemeljeno, izvedljivo pot. Varnost obravnavamo kot osnovni pogoj. Upoštevamo veljavne direktive in standarde ter skrbimo, da so rešitve prijazne do uporabnikov.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors p-16">
                <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center mb-6">
                  <Leaf className="w-6 h-6 text-brand-primary" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">Trajnost in dolgoročnost</h4>
                <p className="text-white/70">
                  Trajnost vključujemo v izbiro materialov, v zasnovo konstrukcije in v način izdelave. Cilj je robustna in servisabilna oprema, ki ostane konkurenčna tudi dolgoročno. Ta merila držijo projekt v ravnotežju med kakovostjo, rokom in stroškom.
                </p>
              </div>
            </div>
          </div>


        </motion.div>
      </div>
      {/*   <div className="relative w-screen left-1/2 -translate-x-1/2">
        <div className="w-full">
          <div className="mt-16 w-full">
            {values.map((value: any, index: number) => {
              const Icon = value.icon;
              const isFirst = index === 0;

              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden block w-full border-b ${isFirst ? 'border-t' : ''} border-white/20`}
                >
                  <div className="will-change-transform text-center w-full px-4 overflow-hidden transition-transform ease-in-out duration-500 lg:group-hover:-translate-y-full">
                    <h3 className="py-8 lg:py-12 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal hover:opacity-75 active:opacity-75 lg:hover:opacity-100 lg:active:opacity-100 text-white">
                      {value.slTitle}
                    </h3>
                    <div className="absolute transform -translate-y-1/2 top-1/2 right-10 w-10 h-10 inline-flex items-center font-semibold text-white lg:hidden">
                      <button
                        type="button"
                        className="inline-flex relative w-full h-full outline-none focus:outline-none pointer-events-none"
                      >
                        <div className="bg-white/10 flex-shrink-0 overflow-hidden flex items-center justify-center rounded-full transform transition-transform w-full h-full"></div>
                      </button>
                      <div className="w-6 h-6 absolute top-2 right-2 flex items-center justify-center transition-transform transform pointer-events-none">
                        <div className="relative overflow-hidden">
                          <div className="relative top-0 left-0 transition-transform transform lg:group-hover:translate-x-full lg:group-hover:-translate-y-full">
                            <svg
                              className="w-6 h-6 fill-current text-white"
                              width="23"
                              height="23"
                              viewBox="0 0 23 23"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M17.27 6.37a1 1 0 0 0-1.004-1.003h-9.9a1.004 1.004 0 1 0 0 2.008l7.49-.007-8.196 8.195a1 1 0 1 0 1.414 1.415l8.195-8.196-.007 7.488a1 1 0 0 0 1.004 1.005 1 1 0 0 0 1.004-1.005v-9.9z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full bg-white text-black translate-y-[101%] ease-in-out duration-500 will-change-transform flex items-center transition-transform lg:group-hover:translate-y-0 overflow-hidden">
                    <div className="flex items-center will-change-transform animate-marquee2 whitespace-nowrap">
                      {[...Array(6)].map((_, i) => (
                        <React.Fragment key={i}>
                          <span className="px-6 flex-shrink-0 inline-flex items-center">
                            <div className="w-24 h-24 min-w-24 rounded-full bg-gradient-to-r from-brand-primary to-brand-primary-light flex items-center justify-center">
                              <Icon className="w-12 h-12 text-white" />
                            </div>
                          </span>
                          <span className="px-6 inline-flex items-center">
                            <h2 className="text-nowrap whitespace-nowrap text-3xl lg:text-4xl font-bold">
                              {value.slTitle}
                            </h2>
                          </span>
                          <span className="px-6 inline-flex items-center">
                            <svg
                              viewBox="0 0 72 72"
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-20 h-20"
                            >
                              <g transform="translate(1 1)" fill="none" fillRule="evenodd">
                                <circle
                                  stroke="#1D1F23"
                                  strokeWidth="2"
                                  cx="35"
                                  cy="35"
                                  r="35"
                                />
                                <path
                                  d="M48.428 24.308a2.115 2.115 0 0 0-.661-1.537 2.308 2.308 0 0 0-1.605-.633H23.826c-1.251 0-2.265.971-2.265 2.17 0 1.198 1.014 2.17 2.265 2.17l16.896-.016L22.23 44.171a2.097 2.097 0 0 0 0 3.056c.88.844 2.31.844 3.19 0l18.492-17.71-.016 16.182c-.003.576.235 1.13.66 1.537a2.308 2.308 0 0 0 1.605.632 2.308 2.308 0 0 0 1.605-.632c.425-.408.663-.961.66-1.537V24.308z"
                                  fill="#000"
                                  fillRule="nonzero"
                                />
                              </g>
                            </svg>
                          </span>
                          <span className="px-6 inline-flex items-center">
                            <h2 className="text-nowrap whitespace-nowrap text-3xl lg:text-4xl font-bold">
                              {value.slTitle}
                            </h2>
                          </span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div> */}
    </section>
  );
}
