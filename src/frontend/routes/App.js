import { hot } from 'react-hot-loader/root'
import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import ProtectedLayout from '../components/ProtectedLayout'
import Layout from '../components/Layout'
import Home from '../containers/Home'
import Login from '../containers/Login'
import Register from '../containers/Register'
import Player from '../containers/Player'
import NotFound from '../containers/NotFound'

const App = () => {
  useEffect(() => {
    document.getElementById('preloadedState').remove()
  }, [])

  return (
    <Routes>
      <Route element={<ProtectedLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/player/:id' element={<Player />} />
      </Route>
      <Route element={<Layout />}>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default hot(App)
