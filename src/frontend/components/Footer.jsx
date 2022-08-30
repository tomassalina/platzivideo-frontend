import React from 'react'

import '../assets/styles/components/Footer.scss'
import classNames from 'classnames'

const Footer = ({ isHome }) => {
  const footerClass = classNames('footer', {
    isHome
  })

  return (
    <footer className={footerClass}>
      <a href='/'>Terms of use</a>
      <a href='/'>Privacy</a>
      <a href='/'>Help center</a>
    </footer>
  )
}

export default Footer
