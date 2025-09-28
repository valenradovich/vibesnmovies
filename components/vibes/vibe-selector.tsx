"use client"

import { useState, useRef, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { ArrowUp, Mic, Sparkles } from "lucide-react"
import { getMovieRecommendations } from "@/lib/ai/actions"
import { MovieResults } from "@/components/movies/movie-results"
import "./macintosh-vibe-selector.css"

interface Movie {
  title: string
  year: number
  description: string
}

interface VibeSelectorProps {
  currentVibe?: string | null
  onVibeSelect?: (vibe: string) => void
}

const VibingLoader = () => {
  return (
    <div className="vibing-loader">
      <div className="vibing-wave">
        <div className="wave-bar"></div>
        <div className="wave-bar"></div>
        <div className="wave-bar"></div>
        <div className="wave-bar"></div>
        <div className="wave-bar"></div>
        <div className="wave-bar"></div>
        <div className="wave-bar"></div>
        <div className="wave-bar"></div>
        <div className="wave-bar"></div>
        <div className="wave-bar"></div>
      </div>
    </div>
  )
}

export function VibeSelector({ onVibeSelect }: VibeSelectorProps) {
  const [vibe, setVibe] = useState("")
  const [loading, setLoading] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [movies, setMovies] = useState<Movie[]>([])
  const { toast } = useToast()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const monitorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isMaximized && monitorRef.current) {
      const scrollToCenter = () => {
        const element = monitorRef.current
        if (element) {
          const elementRect = element.getBoundingClientRect()
          const elementTop = elementRect.top + window.pageYOffset
          const elementHeight = elementRect.height
          const windowHeight = window.innerHeight
          
          // calculate the scroll position to center the element
          const scrollTo = elementTop - (windowHeight - elementHeight) / 2
          
          window.scrollTo({
            top: Math.max(0, scrollTo),
            behavior: 'smooth'
          })
        }
      }

      // delay to allow the expansion animation to complete
      const timer = setTimeout(scrollToCenter, 300)
      return () => clearTimeout(timer)
    }
  }, [isMaximized])

  const handleVibeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!vibe.trim()) {
      toast({
        title: "express yourself",
        description: "please tell us how you're feeling today to get movie recommendations",
        variant: "destructive",
      })
      return
    }

    onVibeSelect?.(vibe)
    setLoading(true)

    try {
      const result = await getMovieRecommendations(vibe)
      setMovies(result.movies.movies)
      setIsMaximized(true)
    } catch (error: any) {
      console.error("Failed to get movie recommendations:", error)
      toast({
        title: "Error",
        description: "Failed to get movie recommendations. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleClearResults = () => {
    setIsMaximized(false)
    setMovies([])
    setVibe("")
    setLoading(false)
  }

  const handleScreenClick = () => {
    if (!isMaximized) {
      textareaRef.current?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      // trigger form submission by calling the submit handler directly
      const form = e.currentTarget.closest('form')
      if (form) {
        const event = new Event('submit', { bubbles: true, cancelable: true })
        form.dispatchEvent(event)
      }
    }
  }

  return (
    <div ref={monitorRef} className={`macintosh-monitor ${isMaximized ? "maximized" : ""} relative`}>
      <form onSubmit={handleVibeSubmit}>
        <div className={`macintosh-screen ${isMaximized ? "maximized" : ""}`} onClick={handleScreenClick}>
          {isMaximized ? (
            <MovieResults movies={movies} onClear={handleClearResults} userVibe={vibe} />
          ) : loading ? (
            <VibingLoader />
          ) : (
            <div className="macintosh-content">
              <h2 className="macintosh-header">what's your vibe today?</h2>
              <textarea
                ref={textareaRef}
                id="vibe-input"
                className="macintosh-textarea"
                placeholder="Express yourself like you're talking to a friend..."
                value={vibe}
                onChange={(e) => setVibe(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                rows={5}
              />
              <div className="macintosh-actions">
                <button type="submit" disabled={loading} className="macintosh-icon-button" aria-label="Send vibe">
                  {loading ? "..." : <ArrowUp size={24} />}
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
