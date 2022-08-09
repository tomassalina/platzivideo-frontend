import { useState, useMemo } from 'react'

const useSearchMovies = (movies) => {
  const [query, setQuery] = useState('')
  const [filteredMovies, setFilteredMovies] = useState([])

  useMemo(() => {
    if (query === '') return setFilteredMovies([])

    const result = movies.filter(movie => {
      return (
        movie.title.toLowerCase().includes(query.toLowerCase())
      )
    })

    setFilteredMovies(result)
  }, [movies, query])

  return { query, setQuery, filteredMovies }
}

export default useSearchMovies
