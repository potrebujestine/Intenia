import { getLocale } from "next-intl/server"
import { getWPData, getWPSection } from "@/lib/wp-ssr"
import ServicesClient from "@/components/services-client"

export const revalidate = 3600

export default async function ServicesServer() {
  const locale = await getLocale()
  const [services, servicesSection] = await Promise.all([
    getWPData("services", { locale, revalidate }),
    getWPSection("services-section", { locale, revalidate }),
  ])
  return <ServicesClient services={services} section={servicesSection} />
}