"use client"

import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    info: "",
    terms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)


  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 192)}px`
    }
  }, [formData.info])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Ime in priimek je obvezen podatek"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email naslov je obvezen podatek"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Neveljaven email naslov"
    }
    if (!formData.terms) {
      newErrors.terms = "Potrebno je privoliti v obdelavo osebnih podatkov"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)


  }

  return (
    <section id="kontakt" className="pt-4 pb-20 px-3 sm:px-0 sm:py-16 md:py-12 bg-black relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-radial from-brand-primary/20 via-transparent to-transparent opacity-30"></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-repeat opacity-10"></div>
      </div>

      <div className="container mx-auto px-0 sm:px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className=""
        >
          <div className="mt-16 lg:mt-4">
            <div className="mx-auto w-full relative">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-primary-light rounded-[29px] blur-lg opacity-70"></div>
                <div className="relative bg-white rounded-[29px] rounded-br-none px-6 pt-10 pb-10 sm:pb-16 md:px-8 lg:px-8 lg:py-24">

                  <div className="container mx-0 px-0 sm:mx-auto sm:px-4 block items-center lg:flex">

                    <div className="w-full lg:w-1/3 mb-10 lg:mb-0">
                      <p className="relative pl-5 mb-2 text-base lg:mb-5 lg:text-lg inline-flex items-center">
                        <span className="absolute w-1.5 h-1.5 bg-brand-primary rounded-full left-0 top-1/2 -translate-y-1/2"></span>
                        <span className="text-black">Kontakt</span>
                      </p>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-black">
                        Kontaktni obrazec
                      </h2>
                      <h4 className="text-black hidden lg:block text-lg">
                        Z veseljem odgovorimo in se pogovorimo o morebitnem sodelovanju.
                      </h4>
                    </div>


                    <div className="w-full lg:w-2/3 lg:pl-4 xl:pl-8 2xl:pl-20">
                      <form onSubmit={handleSubmit} className="inquiry-submit">

                        <div className="grid gap-x-8 gap-y-10 mb-10 lg:gap-y-16 lg:grid-cols-2 lg:mb-16">

                          <div className="relative text-lg font-semibold">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder=" "
                              className="block py-3 px-0 w-full text-black bg-transparent border-0 border-b border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                            />
                            <label
                              htmlFor="name"
                              className={`absolute text-base lg:text-lg duration-300 pointer-events-none transform top-3 origin-[0] ${formData.name
                                ? "scale-75 -translate-y-7 text-black"
                                : "scale-100 translate-y-0 text-gray-400 peer-focus:scale-75 peer-focus:-translate-y-7 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                                }`}
                            >
                              Ime in priimek
                            </label>
                            {errors.name && (
                              <p className="mt-4 text-red-500 text-sm font-normal">{errors.name}</p>
                            )}
                          </div>


                          <div className="relative text-lg font-semibold">
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder=" "
                              className="block py-3 px-0 w-full text-black bg-transparent border-0 border-b border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                            />
                            <label
                              htmlFor="email"
                              className={`absolute text-base lg:text-lg duration-300 pointer-events-none transform top-3 origin-[0] ${formData.email
                                ? "scale-75 -translate-y-7 text-black"
                                : "scale-100 translate-y-0 text-gray-400 peer-focus:scale-75 peer-focus:-translate-y-7 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                                }`}
                            >
                              Email naslov
                            </label>
                            {errors.email && (
                              <p className="mt-4 text-red-500 text-sm font-normal">{errors.email}</p>
                            )}
                          </div>
                        </div>

                        {/* Project Info Textarea */}
                        <div className="grid gap-x-8 gap-y-16 mb-8 lg:mb-16">
                          <div className="relative text-lg font-semibold">
                            <textarea
                              ref={textareaRef}
                              name="info"
                              id="info"
                              value={formData.info}
                              onChange={handleChange}
                              placeholder=" "
                              rows={1}
                              className="block py-3 px-0 w-full text-black bg-transparent border-0 border-b border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-black peer max-h-48 min-h-[39.25px] lg:min-h-[52px] resize-y overflow-hidden"
                            />
                            <label
                              htmlFor="info"
                              className={`absolute text-base lg:text-lg duration-300 pointer-events-none transform top-3 origin-[0] ${formData.info
                                ? "scale-75 -translate-y-7 text-black"
                                : "scale-100 translate-y-0 text-gray-400 peer-focus:scale-75 peer-focus:-translate-y-7 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                                }`}
                            >
                              Informacije o projektu
                            </label>
                          </div>
                        </div>

                        {/* Checkbox and Submit Button Row */}
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-0 mt-8 lg:mt-16">
                          {/* Privacy Checkbox */}
                          <div className="inline-flex items-start mr-0 sm:mr-5">
                            <label className="relative flex items-center rounded-full cursor-pointer" htmlFor="ContactTerms">
                              <input
                                type="checkbox"
                                id="ContactTerms"
                                name="terms"
                                checked={formData.terms}
                                onChange={handleChange}
                                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-[7px] border border-gray-400 before:absolute before:top-1/2 before:left-1/2 before:block before:h-10 before:w-10 before:-translate-y-1/2 before:-translate-x-1/2 before:rounded-full before:bg-black before:opacity-0 before:transition-opacity checked:border-black checked:bg-black checked:before:bg-black hover:before:opacity-10 duration-100"
                              />
                              <span className="absolute text-white opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3.5 w-3.5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  stroke="currentColor"
                                  strokeWidth="1"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            </label>
                            <label
                              className=" text-xs text-gray-400 cursor-pointer select-none pl-3 leading-relaxed"
                              htmlFor="ContactTerms"
                            >
                              Vaše osebne podatke bomo obdelovali za namene obravnave povpraševanja. Več o obdelavi osebnih podatkov si preberite v{" "}
                              <a href="/stran/politika-zasebnosti" className="underline hover:text-black">
                                Politiki zasebnosti
                              </a>
                              .
                            </label>
                          </div>
                          {errors.terms && (
                            <p className="text-red-500 text-sm font-normal lg:hidden">{errors.terms}</p>
                          )}

                          {/* Submit Button */}
                          <div className="relative group inline-flex items-center font-semibold text-white hidden lg:block">
                            <svg width="0" height="0" className="absolute hidden" colorInterpolationFilters="sRGB">
                              <defs>
                                <filter id="buttonFilter">
                                  <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                                  <feColorMatrix
                                    in="blur"
                                    mode="matrix"
                                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                                    result="buttonFilter"
                                  />
                                  <feComposite in="SourceGraphic" in2="buttonFilter" operator="atop" />
                                  <feBlend in="SourceGraphic" in2="buttonFilter" />
                                </filter>
                              </defs>
                            </svg>
                            <button

                              type="submit"
                              disabled={isSubmitting}
                              className="inline-flex relative group outline-none focus:outline-none disabled:opacity-50"
                              style={{ filter: "url(#buttonFilter)" }}
                            >
                              <div className="w-auto inline-flex items-center relative leading-tight overflow-hidden rounded-full bg-black py-2.5 px-16">
                                <div className="relative inline-flex top-px flex-shrink-0">
                                  <div>{isSubmitting ? "Pošiljanje..." : "Pošlji"}</div>
                                </div>
                              </div>
                              <div className="bg-black flex-shrink-0 overflow-hidden flex items-center justify-center -ml-1 rounded-full transform transition-transform w-10 h-10 lg:group-hover:translate-x-3 lg:group-hover:rotate-45">
                                <svg
                                  className="w-3 h-3 fill-current text-white"
                                  width="23"
                                  height="23"
                                  viewBox="0 0 23 23"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M17.27 6.37a1 1 0 0 0-1.004-1.003h-9.9a1.004 1.004 0 1 0 0 2.008l7.49-.007-8.196 8.195a1 1 0 1 0 1.414 1.415l8.195-8.196-.007 7.488a1 1 0 0 0 1.004 1.005 1 1 0 0 0 1.004-1.005v-9.9z" />
                                </svg>
                              </div>
                            </button>
                          </div>
                        </div>

                        {errors.terms && (
                          <p className="mt-4 text-red-500 text-sm font-normal hidden lg:block">{errors.terms}</p>
                        )}

                        {isSuccess && (
                          <p className="mt-4 text-green-600 text-sm font-normal">
                            Povpraševanje je bilo uspešno oddano!
                          </p>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-24 flex justify-end items-start relative -top-px">
                <div className="flex-1 h-full relative right-0 top-px">
                  <div className="rounded-tr-[29px] w-full h-full absolute bg-black z-[1]"></div>
                  <div className="absolute w-12 h-12 -right-px -top-px bg-white z-0"></div>
                </div>
                <div className="h-full w-3/4 bg-white rounded-b-[29px] flex items-center justify-end pb-10 px-6">
                  <div className="relative group inline-flex items-center font-nexa-bold text-white | lg:hidden || mobile-hover">
                    <svg width="0" height="0" className="absolute hidden" colorInterpolationFilters="sRGB">
                      <defs>
                        <filter id="buttonFilter">
                          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="buttonFilter" />
                          <feComposite in="SourceGraphic" in2="buttonFilter" operator="atop" />
                          <feBlend in="SourceGraphic" in2="buttonFilter" />
                        </filter>
                      </defs>
                    </svg>
                    <button

                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex relative group outline-none focus:outline-none"
                      style={{ filter: "url(#buttonFilter)" }}
                    >
                      <div className="w-auto inline-flex items-center relative leading-tight overflow-hidden rounded-full bg-black py-2.5 px-10 sm:px-12 lg:px-16">
                        <div className="relative inline-flex top-px flex-shrink-0">
                          <div>{isSubmitting ? "Pošiljanje..." : "Pošlji"}</div>
                        </div>
                      </div>
                      <div className="bg-black flex-shrink-0 overflow-hidden flex items-center justify-center -ml-1 rounded-full transform transition-transform w-10 h-10 sm:w-10 sm:h-10 lg:group-hover:translate-x-3 lg:group-hover:rotate-45">
                        <svg
                          className="w-3 h-3 fill-current text-white"
                          width="23"
                          height="23"
                          viewBox="0 0 23 23"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.27 6.37a1 1 0 0 0-1.004-1.003h-9.9a1.004 1.004 0 1 0 0 2.008l7.49-.007-8.196 8.195a1 1 0 1 0 1.414 1.415l8.195-8.196-.007 7.488a1 1 0 0 0 1.004 1.005 1 1 0 0 0 1.004-1.005v-9.9z" />
                        </svg>
                      </div>
                    </button>
                    <div className="w-10 h-10 sm:w-10 sm:h-10 absolute top-0 right-0 flex items-center justify-center transition-transform transform lg:group-hover:translate-x-3 lg:group-hover:rotate-45 pointer-events-none js-button-arrow">
                      <div className="relative overflow-hidden">
                        <div className="relative top-0 left-0 transition-transform transform js-button-arrow-icon-primary">
                          <svg className="w-3 h-3 fill-current" width="23" height="23" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.27 6.37a1 1 0 0 0-1.004-1.003h-9.9a1.004 1.004 0 1 0 0 2.008l7.49-.007-8.196 8.195a1 1 0 1 0 1.414 1.415l8.195-8.196-.007 7.488a1 1 0 0 0 1.004 1.005 1 1 0 0 0 1.004-1.005v-9.9z" />
                          </svg>
                        </div>
                        <div className="absolute top-0 left-0 transition-transform transform translate-y-full -translate-x-full js-button-arrow-icon-secondary">
                          <svg className="w-3 h-3 fill-current" width="23" height="23" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.27 6.37a1 1 0 0 0-1.004-1.003h-9.9a1.004 1.004 0 1 0 0 2.008l7.49-.007-8.196 8.195a1 1 0 1 0 1.414 1.415l8.195-8.196-.007 7.488a1 1 0 0 0 1.004 1.005 1 1 0 0 0 1.004-1.005v-9.9z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
