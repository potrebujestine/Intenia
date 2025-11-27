"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/context/LanguageContext"

interface WPData {
  id: number
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string
    }>
  }
  acf?: any
  [key: string]: any
}

export function useWPData(endpoint: string) {
  const { selectedLanguage } = useLanguage()
  const [data, setData] = useState<WPData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `https://wp.intenia-engineering.si/wp-json/wp/v2/${endpoint}?lang=${selectedLanguage}&_embed`
        )
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [endpoint, selectedLanguage])

  return { data, loading, error }
}
