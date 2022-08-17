import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getVideoSource, getPlaying } from '../app/moviesSlice'

import '../assets/styles/components/Player.scss'
import NotFound from './NotFound'

const Player = () => {
  const dispatch = useDispatch()
  const playing = useSelector(getPlaying)
  const { id } = useParams()

  const hasPlaying = Object.keys(playing).length > 0

  useEffect(() => {
    dispatch(getVideoSource(id))
  }, [])

  return hasPlaying
    ? (
      <div className='Player'>
        <video controls autoPlay>
          <source src='https://st-platzivideo.up.railway.app/assets/images/demo.min.mp4' type='video/mp4' />
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
      )
}

export default Player
