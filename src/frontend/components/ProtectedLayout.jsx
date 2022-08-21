import { Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUser } from '../app/userSlice'
import Header from './Header'
import Footer from './Footer'
import Login from '../containers/Login'

const ProtectedLayout = () => {
  const user = useSelector(getUser)
  const hasUser = user.id && user.email && user.name
  const location = useLocation()

  if (!hasUser) {
    return (
      <>
        <Header />
        <Login />
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header isHome={location.pathname === '/'} />
      <Outlet />
      <Footer isHome={location.pathname === '/'} />
    </>
  )
}

export default ProtectedLayout
