import { getRequestConfig, type RequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

const locales = ['sl', 'en', 'fr'] as const
type Locale = typeof locales[number]

export default getRequestConfig(async ({ locale }): Promise<RequestConfig> => {
  if (!locale || !(locales as readonly string[]).includes(locale)) {
    notFound()
  }

  const validLocale: string = locale

  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default
  }
})