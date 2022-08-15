import express from 'express'
import webpack from 'webpack'
import path from 'path'
import helmet from 'helmet'
import passport from 'passport'
import cookieParser from 'cookie-parser'

import getManifest from './utils/getManifest'
import renderApp from './utils/renderApp'

import auth from './routes/auth'
import movies from './routes/movies'
import userMovies from './routes/userMovies'

// config
const { ENV, PORT } = require('./config')
const app = express()

// parsers
app.use(express.json())
app.use(cookieParser())

// session
app.use(passport.initialize())
// app.use(passport.session())

if (ENV === 'development') {
  console.log('Development config in process...')
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

auth(app)
movies(app)
userMovies(app)
app.get('*', renderApp)

app.listen(PORT, (err) => {
  if (err) console.log(err)
  else console.log(`Server running on port ${PORT}`)
})
