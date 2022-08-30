import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerUser } from '../app/userSlice'

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

  const handleSubmit = async (event) => {
    event.preventDefault()
    const res = await dispatch(registerUser(form))
    if (!res.error) navigate('/login')
  }

  return (
    <section className='register'>
      <section className='register__container'>
        <h2>Signup </h2>
        <form className='register__container--form' onSubmit={handleSubmit}>
          <input
            name='name'
            className='input'
            type='text'
            placeholder='Full name'
            onChange={handleChange}
          />
          <input
            name='email'
            className='input'
            type='text'
            placeholder='Email'
            onChange={handleChange}
          />
          <input
            name='password'
            className='input'
            type='password'
            placeholder='Password'
            onChange={handleChange}
          />
          <button type='submit' className='button'>Sign up</button>
        </form>
        <Link className='register__container--login' to='/login'>
          Sign in
        </Link>
      </section>
    </section>
  )
}

export default Register
