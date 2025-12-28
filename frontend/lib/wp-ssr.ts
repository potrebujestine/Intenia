export const revalidate = 3600

interface WPDataOptions {
  locale: string
  revalidate?: number
}

export async function getWPData(
  endpoint: string,
  options: WPDataOptions
): Promise<any[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const url = `${baseUrl}/api/wp/${endpoint}?lang=${options.locale}`

    const response = await fetch(url, {
      next: { revalidate: options.revalidate || revalidate }
    })

    if (!response.ok) {
      return []
    }

    const data = await response.json()
    return Array.isArray(data) ? data : []
  } catch (error) {
    return []
  }
}

export async function getWPSection(
  endpoint: string,
  options: WPDataOptions
): Promise<any | null> {
  const data = await getWPData(endpoint, options)
  return data?.[0] || null
}