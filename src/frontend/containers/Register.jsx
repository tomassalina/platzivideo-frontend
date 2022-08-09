import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerRequest } from '../app/moviesReducer'

import '../assets/styles/components/Register.scss'

const Register = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [form, setForm] = useState({
    email: '',
    name: '',
    password: ''
  })

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(registerRequest(form))
    navigate('/')
  }

  return (
    <section className='register'>
      <section className='register__container'>
        <h2>Regístrate</h2>
        <form className='register__container--form' onSubmit={handleSubmit}>
          <input
            name='name'
            className='input'
            type='text'
            placeholder='Nombre'
            onChange={handleChange}
          />
          <input
            name='email'
            className='input'
            type='text'
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
          <button className='button'>Registrarme</button>
        </form>
        <Link className='register__container--login' to='/login'>
          Iniciar sesión
        </Link>
      </section>
    </section>
  )
}

export default Register
