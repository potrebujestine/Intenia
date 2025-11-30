import type { Metadata } from "next"
import { Rajdhani } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/context/LanguageContext"
import { IntlProvider } from "@/components/NextIntlProvider"
import ModernHeader from "@/components/header"
import ModernFooter from "@/components/footer"

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
})

export const metadata: Metadata = {
  title: "Intenia Engineering",
  description: "Inženirska odličnost - Inovativnost in kakovost",
  icons: {
    icon: "/images/icons/favicon.svg",
    shortcut: "/images/icons/favicon.svg",
    apple: "/images/icons/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  generator: "Intenia Engineering",
  openGraph: {
    title: "Intenia Engineering",
    description: "Inženirska odličnost - Inovativnost in kakovost",
    images: [
      {
        url: "/temp.png",
        width: 1200,
        height: 630,
        alt: "Intenia Engineering",
      },
    ],
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sl" suppressHydrationWarning>
      <head>
        {/* Add any other head tags if needed, metadata object handles common ones */}
      </head>
      <body className={`${rajdhani.className} bg-black text-white`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <IntlProvider>
              <ModernHeader />
              <main>{children}</main>
              <ModernFooter />
            </IntlProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}