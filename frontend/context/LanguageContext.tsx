"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Language = "sl" | "en" | "fr"

interface LanguageContextType {
  selectedLanguage: Language
  setSelectedLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = "intenia-language"

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("sl")
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null
    if (stored && ["sl", "en", "fr"].includes(stored)) {
      setSelectedLanguage(stored)
    }
    setIsHydrated(true)
  }, [])

  const handleLanguageChange = (lang: Language) => {
    setSelectedLanguage(lang)
    localStorage.setItem(STORAGE_KEY, lang)
  }

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage: handleLanguageChange }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}