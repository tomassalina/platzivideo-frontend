import React, { useRef } from 'react'

import '../assets/styles/components/Search.scss'
import useSearchMovies from '../hooks/useSearchMovies'
import Categories from './Categories'
import Carousel from './Carousel'
import CarouselItem from './CarouselItem'

const Search = () => {
  const { setQuery, filteredMovies } = useSearchMovies()
  const formInput = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const query = formInput.current.value
    setQuery(query)
  }

  return (
    <>
      <section className='main'>
        <h2 className='main__title'>¿What do you want to see today?</h2>
        <form className='main__form' onSubmit={handleSubmit}>
          <input
            type='text'
            className='input'
            ref={formInput}
            placeholder='Filter by movies...'
          />
          <button className='main__search-button' type='submit'>Search</button>
        </form>
      </section>
      {
        filteredMovies.length > 0 && (
          <Categories title='Search Results'>
            <Carousel>
              {filteredMovies.map((item) => (
                <CarouselItem key={item.title} {...item} />
              ))}
            </Carousel>
          </Categories>
        )
      }
    </>
  )
}

export default Search
