import type React from "react"
import type { Metadata } from "next"
import "../styles/globals.css"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "vibes & movies",
  description: "discover movies that match your vibes, really",
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
