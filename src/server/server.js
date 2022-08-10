import express from 'express'
import dotenv from 'dotenv'
import webpack from 'webpack'
import path from 'path'
import helmet from 'helmet'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from '../frontend/app/moviesReducer'
import initialState from '../frontend/initialState'
import ServerApp from '../frontend/routes/ServerApp'
import getManifest from './utils/getManifest'
import setResponse from './utils/setResponse'

import passport from 'passport'
import cookieParser from 'cookie-parser'

import auth from './routes/auth'

dotenv.config()

const { ENV, PORT } = process.env
const app = express()

// parsers
app.use(express.json())
app.use(cookieParser())

// session
app.use(passport.initialize())
// app.use(passport.session())

if (ENV === 'development') {
  console.log('Development config')
  const webpackConfig = require('../../webpack.config.dev')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const compiler = webpack(webpackConfig)
  const serverConfig = { publicPath: '/', serverSideRender: true }

  app.use(webpackDevMiddleware(compiler, serverConfig))
  app.use(webpackHotMiddleware(compiler))
} else {
  app.use((req, res, next) => {
    if (!req.hashManifest) req.hashManifest = getManifest()
    next()
  })
  app.use(express.static(path.join(__dirname, '/public')))
  app.use(helmet())
  app.use(helmet.permittedCrossDomainPolicies())
  app.disable('x-powered-by')
}

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

  res.send(setResponse(html, preloadedState, req.hashManifest))
}

auth(app)
app.get('*', renderApp)

app.listen(PORT, (err) => {
  if (err) console.log(err)
  else console.log(`Server running on port ${PORT}`)
})
