import React from 'react'
import { useSelector } from 'react-redux'
import { getMyList, getTrends, getOriginals, getAction, getMoviesAreLoading, getFamily, getTerror, getKids } from '../app/moviesSlice'

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
  const action = useSelector(getAction)
  const family = useSelector(getFamily)
  const terror = useSelector(getTerror)
  const kids = useSelector(getKids)

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
      <Categories title='Acción'>
        <Carousel>
          {action.map((item) => (
            <CarouselItem key={item._id} {...item} />
          ))}
        </Carousel>
      </Categories>
      <Categories title='Para ver en familia'>
        <Carousel>
          {family.map((item) => (
            <CarouselItem key={item._id} {...item} />
          ))}
        </Carousel>
      </Categories>
      <Categories title='Terror'>
        <Carousel>
          {terror.map((item) => (
            <CarouselItem key={item._id} {...item} />
          ))}
        </Carousel>
      </Categories>
      <Categories title='Kids'>
        <Carousel>
          {kids.map((item) => (
            <CarouselItem key={item._id} {...item} />
          ))}
        </Carousel>
      </Categories>
    </>
  )
}

export default Home
