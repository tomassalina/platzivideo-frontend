import jwt from 'jsonwebtoken'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import moviesSlice from '../../frontend/app/moviesSlice'
import userSlice from '../../frontend/app/userSlice'
import App from '../../frontend/routes/App'
import { Toaster } from 'react-hot-toast'

import setInitialState from './setInitialState'
import setResponse from './setResponse.js'

const renderApp = async (req, res) => {
  const { token } = req.cookies
  const verifyToken = jwt.decode(token) || {
    sub: { email: undefined, name: undefined, id: undefined }
  }

  const email = req.cookies.email || verifyToken.sub.email
  const name = req.cookies.name || verifyToken.sub.name
  const id = req.cookies.id || verifyToken.sub.id

  const initialState = await setInitialState({ token, email, name, id })

  const store = configureStore({
    reducer: {
      movies: moviesSlice,
      user: userSlice
    },
    preloadedState: initialState
  })

  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <App />
        <Toaster position='top-center' />
      </StaticRouter>
    </Provider>
  )

  const preloadedState = store.getState()
  const app = setResponse(html, preloadedState, req.hashManifest)

  res.send(app)
}

export default renderApp
