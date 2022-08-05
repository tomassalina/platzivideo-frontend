import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import '../assets/styles/components/Search.scss'
import useSearchMovies from '../hooks/useSearchMovies'
import Categories from './Categories'
import Carousel from './Carousel'
import CarouselItem from './CarouselItem'

const Search = () => {
  const { trends, originals } = useSelector(store => {
    return { trends: store.trends, originals: store.originals }
  })
  const [movies, setMovies] = useState([])
  const { query, setQuery, filteredMovies } = useSearchMovies(movies)

  useEffect(() => {
    setMovies([...trends, ...originals])
  }, [trends, originals])

  return (
    <>
      <section className='main'>
        <h2 className='main__title'>¿Qué quieres ver hoy?</h2>
        <input className='input' value={query} onChange={(e) => setQuery(e.target.value)} type='text' placeholder='Buscar...' />
      </section>
      {
        filteredMovies.length > 0 && (
          <Categories title='Search Results'>
            <Carousel>
              {filteredMovies.map((item) => (
                <CarouselItem key={item.id} {...item} />
              ))}
            </Carousel>
          </Categories>
        )
      }
    </>
  )
}

export default Search
