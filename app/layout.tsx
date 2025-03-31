import type React from "react"
import "@/app/globals.css"
import { Playfair_Display, Cormorant } from "next/font/google"
import { Navigation } from "@/components/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import RegisterSW from "./register-sw"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-cormorant",
})

export const metadata = {
  title: "Soecha | Candide Essis SOSSOU - Écrivaine",
  description:
    "Site officiel de Soecha (Candide Essis SOSSOU) - Chef projet digital, Psychologue du travail et Écrivaine",
  manifest: "/manifest.json",
  themeColor: "#003366",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Soecha",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${playfair.variable} ${cormorant.variable}`}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      <body className="font-cormorant bg-primary text-gold">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navigation />
          <main>{children}</main>
          <RegisterSW />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'