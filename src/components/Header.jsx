import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import gravatar from '../utils/gravatar'
import { logoutRequest } from '../app/moviesReducer'

import '../assets/styles/components/Header.scss'
import logo from '../assets/static/logo-platzi-video-BW2.png'
import userIcon from '../assets/static/user-icon.png'

const Header = (props) => {
  const { isHome } = props
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const hasUser = Object.keys(user).length > 0

  const handleClick = (event) => {
    dispatch(logoutRequest({}))
  }

  return (
    <header className='header'>
      <Link to='/'>
        <img className='header__img' src={logo} alt='Platzi Video' />
      </Link>
      {isHome &&
        (
          <button type='button' className='header__menu'>
            <div className='header__menu--profile'>
              {hasUser
                ? (
                  <img src={gravatar(user.email)} alt={user.name} />
                  )
                : (
                  <img src={userIcon} alt='Gravatar User' />
                  )}
              <p>Perfil</p>
            </div>
            <ul>
              {hasUser
                ? (
                  <>
                    <li>
                      <Link to='/'>{user.name}</Link>
                    </li>
                    <li>
                      <button onClick={handleClick}>Cerrar Sesión</button>
                    </li>
                  </>
                  )
                : (
                  <li>
                    <Link to='/login'>Iniciar Sesión</Link>
                  </li>
                  )}
            </ul>
          </button>
        )}
    </header>
  )
}

export default Header
