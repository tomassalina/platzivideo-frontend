import { useState, useMemo } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const useSearchMovies = () => {
  const [query, setQuery] = useState('')
  const [filteredMovies, setFilteredMovies] = useState([])

  useMemo(async () => {
    if (query === '') return setFilteredMovies([])

    const getFilteredMovies = axios.get(`/movies/search?query=${query}`)

    try {
      const { data: filteredMovies } = await toast.promise(getFilteredMovies, {
        loading: 'Loading...',
        success: 'Successful search',
        error: 'Something went wrong'
      })
      setFilteredMovies(filteredMovies.movies)
    } catch (err) {
      setFilteredMovies([])
    }
  }, [query])

  return { setQuery, filteredMovies }
}

export default useSearchMovies
