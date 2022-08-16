import React from 'react'
import { useSelector } from 'react-redux'
import { getMyList, getTrends, getOriginals, getMoviesAreLoading } from '../app/moviesSlice'

import '../assets/styles/App.scss'
import Search from '../components/Search'
import Categories from '../components/Categories'
import Carousel from '../components/Carousel'
import CarouselItem from '../components/CarouselItem'
import Loader from '../components/Loader'

const Home = () => {
  const isLoading = useSelector(getMoviesAreLoading)

  const myList = useSelector(getMyList)
  const trends = useSelector(getTrends)
  const originals = useSelector(getOriginals)

  return (
    <>
      {isLoading && <Loader />}
      <Search />
      {myList.length > 0 && (
        <Categories title='Mi lista'>
          <Carousel>
            {myList.map((item) => (
              <CarouselItem key={item.userMovieId} {...item} isList />
            ))}
          </Carousel>
        </Categories>
      )}
      <Categories title='Tendencias'>
        <Carousel>
          {trends.map((item) => (
            <CarouselItem key={item._id} {...item} />
          ))}
        </Carousel>
      </Categories>
      <Categories title='Originales de Platzi Video'>
        <Carousel>
          {originals.map((item) => (
            <CarouselItem key={item._id} {...item} />
          ))}
        </Carousel>
      </Categories>
    </>
  )
}

export default Home
