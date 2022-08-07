import { Routes, Route } from 'react-router-dom'

import Layout from '../components/Layout'
import Home from '../containers/Home'
import Login from '../containers/Login'
import Register from '../containers/Register'
import Player from '../containers/Player'
import NotFound from '../containers/NotFound'

const ServerApp = () => (
  <Layout>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/player/:id' element={<Player />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </Layout>
)

export default ServerApp
