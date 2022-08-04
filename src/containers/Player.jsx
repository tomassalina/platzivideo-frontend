import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { getVideoSource } from '../actions'

import '../assets/styles/components/Player.scss'
import NotFound from './NotFound'

const Player = props => {
  const { id } = useParams()
  const navigate = useNavigate()
  const hasPLaying = Object.keys(props.playing).length > 0

  useEffect(() => {
    props.getVideoSource(id)
  }, [])

  console.log(props.playing)

  return hasPLaying
    ? (
      <div className='Player'>
        <video controls autoPlay>
          <source src={props.playing.source} type='video/mp4' />
        </video>
        <div className='Player-back'>
          <button type='button' onClick={() => navigate(-1)}>
            Regresar
          </button>
        </div>
      </div>
      )
    : (
      <NotFound />
      )
}

const mapStateToProps = state => ({
  playing: state.playing
})

const mapDispatchToProps = {
  getVideoSource
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
