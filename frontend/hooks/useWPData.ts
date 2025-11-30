"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/context/LanguageContext"

interface WPImage {
  ID: string
  guid: string
  post_title: string
  post_excerpt: string
  post_content: string
  post_mime_type: string
  [key: string]: any
}

interface WPData {
  id: number
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  slug?: string
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string
    }>
  }
  acf?: any
  // Product-specific fields
  products_title?: string
  short_description?: string
  image?: WPImage
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
        const url = `https://wp.intenia-engineering.si/wp-json/wp/v2/${endpoint}?lang=${selectedLanguage}&_embed`
        console.log("🌍 Language selected:", selectedLanguage)
        console.log("📡 Fetching from URL:", url)

        const response = await fetch(url)
        console.log("📥 Response status:", response.status, response.statusText)

        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }
        const result = await response.json()
        console.log(`✅ Fetched ${result.length} items from ${endpoint}:`, result)
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
