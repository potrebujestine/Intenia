import { getLocale } from "next-intl/server"
import { getWPData, getWPSection } from "@/lib/wp-ssr"
import AboutUsClient from "./about-us-client";

const revalidate = 3600;

export default async function AboutUsServer() {
  const locale = await getLocale()
  const [aboutUsFacts, aboutUsSections, aboutUsPrinciples] = await Promise.all([
    getWPData("about-us-carousel", { locale, revalidate }),
    getWPData("about-us-section", { locale, revalidate }),
    getWPData("principles", { locale, revalidate }),
  ])
  return <AboutUsClient facts={aboutUsFacts} sections={aboutUsSections} principles={aboutUsPrinciples} />
}