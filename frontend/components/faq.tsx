"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FaqSection() {
  const faqs = [
    {
      question: "Kako deluje brezplačna preizkušnja?",
      answer:
        "Naša brezplačna preizkušnja vam omogoča polni dostop do vseh funkcij za 14 dni brez potrebe po kreditni kartici. Kadarkoli med ali po preizkušnji se lahko nadgradite na plačljiv načrt.",
    },
    {
      question: "Ali ponujate popuste za startupe ali neprofitne organizacije?",
      answer:
        "Da, ponujamo posebne cene za startupe, neprofitne organizacije in izobraževalne ustanove. Za več informacij kontaktirajte našo prodajno ekipo.",
    },
    {
      question: "Ali lahko pozneje spremenim svoj načrt?",
      answer:
        "Absolutno! Kadarkoli se lahko nadgradite, znižate ali spremenite svoj načrt. Spremembe vaše naročnine bodo sorazmerno obračunane za preostanek vašega obračunskega cikla.",
    },
    {
      question: "Kakšno podporo ponujate?",
      answer:
        "Ponujamo e-poštno podporo za vse stranke, z prioritetno podporo in namenskim upraviteljem računov za Enterprise načrte. Naša ekipa za podporo je na voljo 24/7 za pomoč pri vseh vprašanjih ali težavah.",
    },
    {
      question: "Ali so moji podatki varni?",
      answer:
        "Varnost je naša glavna prednost. Uporabljamo šifriranje po industrijskih standardih, redne varnostne revizije in stroge kontrole dostopa, da zagotovimo, da so vaši podatki vedno zaščiteni. Vsi podatki so shranjeni v podatkovnih centrih, skladnih s standardom SOC 2.",
    },
    {
      question: "Ali lahko izvozim svoje podatke?",
      answer:
        "Da, svoje podatke lahko kadarkoli izvozite v različnih formatih, vključno s CSV, JSON in PDF. Verjamemo, da so vaši podatki vaši, in omogočamo enostaven izvoz, če je potrebno.",
    },
  ]

  return (
    <section className="py-4 sm:py-20 md:py-24 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-brand-primary-light/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-brand-primary/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Pogosto zastavljena vprašanja</h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Imate vprašanja? Tu smo, da pomagamo. Če svojega vprašanja ne najdete tukaj, nas kontaktirajte.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <AccordionItem 
                  value={`item-${index}`}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden"
                >
                  <AccordionTrigger className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-lg font-medium hover:no-underline hover:bg-white/5 text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-white/70">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-8 sm:mt-10 md:mt-12"
        >
          <p className="text-sm sm:text-base text-white/70">
            Še vedno imate vprašanja? {" "}
            <a href="#contact" className="text-brand-primary-light hover:text-brand-primary underline underline-offset-2">
              Kontaktirajte našo ekipo za podporo
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
