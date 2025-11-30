"use client"

import { NextIntlClientProvider } from 'next-intl'
import { useLanguage } from '@/context/LanguageContext'
import { ReactNode, useEffect, useState } from 'react'

export function IntlProvider({ children }: { children: ReactNode }) {
  const { selectedLanguage } = useLanguage()
  const [messages, setMessages] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    import(`@/messages/${selectedLanguage}.json`)
      .then((mod) => {
        setMessages(mod.default)
        setIsLoading(false)
      })
      .catch(() => {
        import(`@/messages/sl.json`)
          .then((mod) => {
            setMessages(mod.default)
            setIsLoading(false)
          })
          .catch(() => {
            setMessages({})
            setIsLoading(false)
          })
      })
  }, [selectedLanguage])

  if (isLoading || !messages) {
    return null
  }

  return (
    <NextIntlClientProvider locale={selectedLanguage} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}