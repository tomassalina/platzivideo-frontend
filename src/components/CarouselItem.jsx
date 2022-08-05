import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setFavorite, deleteFavorite } from '../app/moviesReducer'

import '../assets/styles/components/CarouselItem.scss'
import playIcon from '../assets/static/play-icon.png'
import plusIcon from '../assets/static/plus-icon.png'
import removeIcon from '../assets/static/remove-icon.png'
import { Link } from 'react-router-dom'

const CarouselItem = props => {
  const { id, title, cover, year, contentRating, duration, isList } = props
  const dispatch = useDispatch()

  const handleSetFavorite = () => {
    dispatch(setFavorite({
      id,
      title,
      cover,
      year,
      contentRating,
      duration
    }))
  }

  const handleDeleteFavorite = itemId => {
    dispatch(deleteFavorite(itemId))
  }

  return (
    <div tabIndex='0' className='carousel-item'>
      <img className='carousel-item__img' src={cover} alt={title} />
      <div className='carousel-item__details'>
        <div>
          <Link to={`/player/${id}`}>
            <img
              className='carousel-item__details--img'
              src={playIcon}
              alt='Play Icon'
            />
          </Link>

          {isList
            ? (
              <button type='button' className='carousel-item__details--button' onClick={() => handleDeleteFavorite(id)}>
                <img
                  className='carousel-item__details--img'
                  src={removeIcon}
                  alt='Remove Icon'
                />
              </button>
              )
            : (
              <button type='button' className='carousel-item__details--button' onClick={handleSetFavorite}>
                <img
                  className='carousel-item__details--img'
                  src={plusIcon}
                  alt='Plus Icon'
                />
              </button>
              )}
        </div>
        <p className='carousel-item__details--title'>{title}</p>
        <p className='carousel-item__details--subtitle'>
          {`${year} ${contentRating} ${duration} minutos`}
        </p>
      </div>
    </div>
  )
}

CarouselItem.propTypes = {
  cover: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number
}

export default CarouselItem
