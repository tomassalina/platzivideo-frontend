import { useState, useMemo } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const useSearchMovies = () => {
  const [query, setQuery] = useState('')
  const [filteredMovies, setFilteredMovies] = useState([])

  useMemo(async () => {
    if (query === '') return setFilteredMovies([])

    const getFilterededMovies = axios.get(`/movies/search?query=${query}`)

    try {
      const { data: filteredMovies } = await toast.promise(getFilterededMovies, {
        loading: 'Cargando...',
        success: 'Busqueda exitosa',
        error: 'Algo salió mal'
      })
      setFilteredMovies(filteredMovies.movies)
    } catch (err) {
      setFilteredMovies([])
    }
  }, [query])

  return { setQuery, filteredMovies }
}

export default useSearchMovies
