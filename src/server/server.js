import express from 'express'
import dotenv from 'dotenv'
import webpack from 'webpack'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'
import { store } from '../frontend/app/store'
import ServerApp from '../frontend/routes/ServerApp'

dotenv.config()

const { ENV, PORT } = process.env
const app = express()

if (ENV === 'development') {
  console.log('Development config')
  const webpackConfig = require('../../webpack.ssr.config')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const compiler = webpack(webpackConfig)
  const serverConfig = { publicPath: '/', serverSideRender: true }

  app.use(webpackDevMiddleware(compiler, serverConfig))
  app.use(webpackHotMiddleware(compiler))
}

const setResponse = (html) => {
  return (`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Platzi Video</title>
        <script defer="defer" src="assets/app.js" type="text/javascript"></script>
        <link rel="stylesheet" href="assets/app.css" type="text/css">
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
    </html>
  `)
}

const renderApp = (req, res) => {
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <ServerApp />
      </StaticRouter>
    </Provider>
  )

  res.send(setResponse(html))
}

app.get('*', renderApp)

app.listen(PORT, (err) => {
  if (err) console.log(err)
  else console.log(`Server running on port ${PORT}`)
})
