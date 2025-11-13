import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ModernHeader from "@/components/header"
import ModernFooter from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

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
        url: "/image.png",
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
      <body className={`${inter.className} bg-black text-white`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ModernHeader />
          <main>{children}</main>
          <ModernFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}