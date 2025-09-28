"use client"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { VibeSelector } from "@/components/vibes/vibe-selector"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-6">
        <div>
          <div className="text-center mb-20 mt-32">
            <h1
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl"
              style={{ lineHeight: "1" }}
            >
              Tell us your vibes, <br /> we'll find movies for you.
            </h1>
          </div>
          <VibeSelector />
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
