import { Routes, Route } from 'react-router-dom'

import Layout from '../components/Layout'
import ProtectedLayout from '../components/ProtectedLayout'
import Home from '../containers/Home'
import Login from '../containers/Login'
import Register from '../containers/Register'
import Player from '../containers/Player'
import NotFound from '../containers/NotFound'

const ServerApp = () => (
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

export default ServerApp
