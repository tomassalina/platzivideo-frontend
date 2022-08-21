import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getVideoSource, getPlaying, getMoviesAreLoading } from '../app/moviesSlice'

import '../assets/styles/components/Player.scss'
import Loader from '../components/Loader'
import NotFound from './NotFound'

const Player = () => {
  const dispatch = useDispatch()
  const playing = useSelector(getPlaying)
  const isLoading = useSelector(getMoviesAreLoading)
  const hasPlaying = Object.keys(playing).length > 0

  const { id } = useParams()

  useEffect(() => {
    dispatch(getVideoSource(id))
  }, [])

  return (
    <>
      {isLoading && (
        <Loader />
      )}

      {hasPlaying
        ? (
          <div className='Player'>
            <video controls autoPlay>
              <source src={playing} type='video/mp4' />
            </video>
            <div className='Player-back'>
              <Link className='Player-link' to='/'>
                Regresar
              </Link>
            </div>
          </div>
          )
        : (
          <NotFound />
          )}
    </>
  )
}

export default Player
