import React from 'react'
import { useLocation } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      <Header isHome={isHome} />
      {children}
      <Footer isHome={isHome} />
    </>
  )
}

export default Layout
