import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { LocaleProvider } from "@/lib/i18n" // Import LocaleProvider

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nori Farm Integration Prototype",
  description: "Proof-of-concept for mapping virtual crops to real products",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LocaleProvider>{children}</LocaleProvider>
        <Toaster />
      </body>
    </html>
  )
}
