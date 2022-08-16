import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, getUserIsLoading } from '../app/userSlice'

import '../assets/styles/components/Login.scss'
import Loader from '../components/Loader'
import googleIcon from '../assets/static/google-icon.png'
import twitterIcon from '../assets/static/twitter-icon.png'

const Login = () => {
  const isLoading = useSelector(getUserIsLoading)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '' })

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const res = await dispatch(loginUser(form))
    if (!res.error) navigate('/')
  }

  return (
    <>
      {isLoading && <Loader />}
      <section className='login'>
        <section className='login__container'>
          <h2>Inicia sesión</h2>
          <form className='login__container--form' onSubmit={handleSubmit}>
            <input
              name='email'
              className='input'
              type='email'
              placeholder='Correo'
              onChange={handleChange}
            />
            <input
              name='password'
              className='input'
              type='password'
              placeholder='Contraseña'
              onChange={handleChange}
            />
            <button type='submit' className='button'>Iniciar sesión</button>
            <div className='login__container--remember-me'>
              <label>
                <input type='checkbox' id='cbox1' value='first_checkbox' />
                Recuérdame
              </label>
              <a href='/'>Olvidé mi contraseña</a>
            </div>
          </form>
          <section className='login__container--social-media'>
            <Link to='/'>
              <img src={googleIcon} /> Inicia sesión con Google
            </Link>
            <Link to='/'>
              <img src={twitterIcon} /> Inicia sesión con Twitter
            </Link>
          </section>
          <p className='login__container--register'>
            No tienes ninguna cuenta <Link to='/register'>Regístrate</Link>
          </p>
        </section>
      </section>
    </>
  )
}

export default Login
