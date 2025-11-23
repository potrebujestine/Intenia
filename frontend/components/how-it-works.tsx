"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Target, Network, Lightbulb, Leaf, Shield } from "lucide-react";
import Image from "next/image";

export default function AboutUs() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const aboutUsFacts = [
    {
      icon: Users,
      title: "Več kot 10 let izkušenj",
      description: "Intenia d.o.o. → danes Intenia Engineering d.o.o.",
    },
    {
      icon: Network,
      title: "Tesno sodelovanje",
      description: "Z večjimi industrijskimi partnerji v EU",
    },
    {
      icon: Users,
      title: "4 zaposleni",
      description: "+ mreža zunanjih konstrukterjev in kooperantov",
    },
    {
      icon: Target,
      title: "Naš cilj",
      description: "Prevzem presežnih kapacitet, dolgoročna partnerstva in kakovostna izvedba",
    },
  ];

  const values = [
    {
      icon: Lightbulb,
      title: "Utility",
      slTitle: "Uporabnost",
      description: "Delivering practical and effective solutions that provide real value to our clients.",
      slDescription: "Zagotavljamo praktične in učinkovite rešitve, ki prinašajo resnično vrednost našim strankam.",
    },
    {
      icon: Target,
      title: "Rationality",
      slTitle: "Racionalnost",
      description: "Ensuring logical and efficient project approaches for optimal resource utilization.",
      slDescription: "Zagotavljamo logične in učinkovite pristope k projektom za optimalno izkoriščanje virov.",
    },
    {
      icon: Leaf,
      title: "Environmental Friendliness",
      slTitle: "Okolju prijaznost",
      description: "Prioritizing sustainable and eco-friendly practices to minimize environmental impact.",
      slDescription: "Prednost dajemo trajnostnim in okolju prijaznim praksam za zmanjšanje vpliva na okolje.",
    },
    {
      icon: Shield,
      title: "Safety",
      slTitle: "Varnost",
      description: "Maintaining high safety standards in all operations to ensure the well-being of our team and clients.",
      slDescription: "Ohranjamo visoke varnostne standarde v vseh operacijah za zagotovitev dobrega počutja naše ekipe in strank.",
    },
  ];

  // Progress animation
  useEffect(() => {
    const duration = 4000;
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
    if (progress >= 100) {
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
            <div className="w-full relative lg:w-1/4">
              <div
                className="relative w-full flex overflow-hidden bg-black/90 backdrop-blur-sm border border-white/10 rounded-[15px] aspect-[4/5] lg:aspect-[3/4] lg:rounded-[29px] cursor-pointer"
                onClick={() => {
                  setCurrentSlide((prev) => (prev + 1) % aboutUsFacts.length);
                  setProgress(0);
                }}
              >
                {/* Logo and Company Name */}
                <div className="absolute top-3 left-6 flex items-center justify-start gap-3 z-20">
                  <div className="w-10 h-10 rounded-full bg-black border border-white/20 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/images/logos/intenia-logo.png"
                      alt="Intenia Logo"
                      width={24}
                      height={24}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-bold text-white/90 text-sm lg:text-base">Intenia Engineering</p>
                </div>

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

                {/* Slides Container */}
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
                          duration: 0.6,
                          ease: [0.4, 0, 0.2, 1] // Custom cubic-bezier for smoother animation
                        }}
                        className={`absolute top-0 left-0 w-full h-full flex justify-center items-center px-6 sm:px-10 ${index === currentSlide ? "z-10" : "z-0 pointer-events-none"
                          }`}
                      >
                        <div className="w-full text-center">
                          <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                            {fact.title}
                          </h4>
                          {fact.description && (
                            <p className="text-base sm:text-lg md:text-xl text-white/70 mt-4 max-w-md mx-auto">
                              {fact.description}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Side - Text Content */}
            <div className="w-full lg:w-3/5 ">
              <div className="relative">
                {/* Decorative Icons */}
                {/*  <div className="relative flex items-center gap-3 mb-6">
                  <div className="w-20 h-20 rounded-full border-[1.5px] border-white/50 relative z-20 bg-gradient-to-r from-brand-primary to-brand-primary-light flex items-center justify-center">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <div className="w-20 h-20 rounded-full border-[1.5px] border-white/50 absolute top-0 left-12 bg-gradient-to-r from-brand-primary-light to-brand-primary flex items-center justify-center">
                    <Network className="w-10 h-10 text-white" />
                  </div>
                </div> */}

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
                  O nas
                </h2>

                <p className="text-sm sm:text-base md:text-lg text-white/60 mb-8 lg:mb-12">
                  Intenia Engineering d.o.o., s sedežem v Medvodah, Slovenija, se odlično odziva pri zagotavljanju inženirskih, konzultacijskih, proizvodnih in posredovalnih storitev. Naša misija je zagotavljati inovativne rešitve, ki presegajo pričakovanja strank, hkrati pa dajemo prednost trajnosti, varnosti in učinkovitosti.
                </p>

                {/* Service Tags */}
                <div className="w-fit">
                  <div className="inline-flex flex-wrap gap-3 mt-6 lg:mt-10">
                    <div className="font-bold text-sm sm:text-base text-nowrap rounded-full px-4 py-2 border border-white/50 text-white">
                      Inženirstvo
                    </div>
                    <div className="font-bold text-sm sm:text-base text-nowrap rounded-full px-4 py-2 border border-white/50 text-white">
                      Proizvodnja
                    </div>
                    <div className="font-bold text-sm sm:text-base text-nowrap rounded-full px-4 py-2 border border-white/50 text-white">
                      Konzultacije
                    </div>
                    <div className="font-bold text-sm sm:text-base text-nowrap rounded-full px-4 py-2 border border-white/50 text-white">
                      Posredovanje
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Our Values Section */}
        <motion.div
          id="nase-vrednote"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 lg:mt-40 scroll-mt-24"
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
              Naše vrednote
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-3xl mx-auto">
              Pri Intenia spoštujemo štiri temeljne vrednote, ki zagotavljajo, da zagotavljamo praktične, učinkovite, okolju prijazne in varne rešitve, ki izboljšujejo zadovoljstvo strank in konkurenčnost.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Values List - Full Width */}
      <div className="relative w-screen left-1/2 -translate-x-1/2">
        <div className="w-full">
          <div className="mt-16 w-full">
            {values.map((value, index) => {
              const Icon = value.icon;
              const isFirst = index === 0;

              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden block w-full border-b ${isFirst ? 'border-t' : ''} border-white/20`}
                >
                  {/* Title Section */}
                  <div className="will-change-transform text-center w-full px-4 overflow-hidden transition-transform ease-in-out duration-500 lg:group-hover:-translate-y-full">
                    <h3 className="py-8 lg:py-12 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal hover:opacity-75 active:opacity-75 lg:hover:opacity-100 lg:active:opacity-100 text-white">
                      {value.slTitle}
                    </h3>

                    {/* Mobile Arrow Button */}
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

                  {/* Hover Content with Marquee */}
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
      </div>
    </section>
  );
}
