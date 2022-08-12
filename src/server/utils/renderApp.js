import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from '../../frontend/app/moviesReducer'
import App from '../../frontend/routes/App'

import setResponse from './setResponse.js'

const renderApp = (req, res) => {
  const { id, name, email } = req.cookies

  let initialState

  if (id) {
    initialState = {
      user: { id, name, email },
      playing: {},
      myList: [],
      trends: [],
      originals: []
    }
  } else {
    initialState = {
      user: {},
      playing: {},
      myList: [],
      trends: [],
      originals: []
    }
  }

  const store = configureStore({
    reducer: moviesReducer,
    preloadedState: initialState
  })

  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </Provider>
  )

  const preloadedState = store.getState()
  const app = setResponse(html, preloadedState, req.hashManifest)

  res.send(app)
}

export default renderApp
