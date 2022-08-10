import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from '../../frontend/app/moviesReducer'
import initialState from '../../frontend/initialState'
import ServerApp from '../../frontend/routes/ServerApp'

import setResponse from './setResponse.js'

const renderApp = (req, res) => {
  const store = configureStore({
    reducer: moviesReducer,
    preloadedState: initialState
  })

  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <ServerApp />
      </StaticRouter>
    </Provider>
  )

  const preloadedState = store.getState()
  const app = setResponse(html, preloadedState, req.hashManifest)

  res.send(app)
}

export default renderApp
