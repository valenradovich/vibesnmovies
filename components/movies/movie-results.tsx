import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clapperboard, X } from "lucide-react"

interface Movie {
  title: string
  year: number
  description: string
}

interface MovieResultsProps {
  movies: Movie[]
  onClear: () => void
  userVibe?: string
}

export function MovieResults({ movies, onClear, userVibe }: MovieResultsProps) {
  const handleMovieClick = (movieTitle: string) => {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(movieTitle)}`
    window.open(searchUrl, '_blank')
  }

  return (
    <div className="w-full h-full overflow-y-auto p-4 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Clapperboard className="w-6 h-6" />
          for you :)
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onClear} type="button">
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {movies.map((movie, index) => (
          <Card 
            key={index} 
            className="cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => handleMovieClick("movie " + movie.title + " " + movie.year)}
          >
            <CardHeader>
              <CardTitle>{movie.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Calendar className="w-4 w-4" />
                <span>{movie.year}</span>
              </div>
              <p className="text-xs">{movie.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 