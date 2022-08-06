import React from 'react'

import '../assets/styles/components/Footer.scss'
import classNames from 'classnames'

const Footer = ({ isHome }) => {
  const footerClass = classNames('footer', {
    isHome
  })

  return (
    <footer className={footerClass}>
      <a href='/'>Terminos de uso</a>
      <a href='/'>Declaración de privacidad</a>
      <a href='/'>Centro de ayuda</a>
    </footer>
  )
}

export default Footer
