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

  const [form, setForm] = useState({ email: '', password: '', rememberMe: false })

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
          <h2>Log in</h2>
          <form className='login__container--form' onSubmit={handleSubmit}>
            <input
              name='email'
              className='input'
              type='email'
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
            <button type='submit' className='button'>Log in</button>
            <div className='login__container--remember-me'>
              <label>
                <input
                  name='rememberMe'
                  type='checkbox'
                  checked={form.rememberMe}
                  onChange={() => setForm((prevForm) => {
                    return { ...prevForm, rememberMe: !form.rememberMe }
                  })}
                />
                Remember me
              </label>
              <a href='/'>Forgot password?</a>
            </div>
          </form>
          <section className='login__container--social-media'>
            <a href='/auth/google'>
              <img src={googleIcon} /> Log in with Google
            </a>
            <a href='/auth/twitter/'>
              <img src={twitterIcon} /> Log in with Twitter
            </a>
          </section>
          <p className='login__container--register'>
            Don't have an account? <Link to='/register'>Sign up</Link>
          </p>
        </section>
      </section>
    </>
  )
}

export default Login
