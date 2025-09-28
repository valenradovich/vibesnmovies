"use client"

import Link from "next/link"
import Image from "next/image"

export function Navbar() {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <nav className="bg-white/80 backdrop-blur-md rounded-full border border-gray-200/50 shadow-lg">
        <div className="px-6 py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="font-bold flex items-center gap-2 text-xs text-gray-900">
              <Image src="/logo.png" alt="vibesnmovies Logo" width={32} height={32} />
              vibes & movies
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
