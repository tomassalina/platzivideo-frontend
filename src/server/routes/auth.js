import express from 'express'
import passport from 'passport'
import boom from '@hapi/boom'
import axios from 'axios'

const { ENV, API_URL } = require('../config')

// Basic strategy
require('../utils/auth/strategies/basic')

// Google OAtuh 2.0 Strategy
require('../utils/auth/strategies/google')

// Twitter Strategy
require('../utils/auth/strategies/twitter')

function auth (app) {
  const router = express.Router()

  app.use('/auth', router)

  // BASIC STRATEGY:

  router.post('/sign-in', async function (req, res, next) {
    const { rememberMe } = req.body

    passport.authenticate('basic', (error, data) => {
      const THREE_DAYS_IN_SEC = 3 * 24 * 60 * 60 * 1000
      const TWO_HOURS_IN_SEC = 2 * 60 * 60 * 1000

      try {
        if (error || !data) {
          return res.status(400).json({
            statusCode: 400,
            message: 'Invalid username or password'
          })
        }

        req.login(data, { session: false }, async err => {
          if (err) next(err)

          const { token, user } = data

          res.cookie('token', token, {
            httpOnly: !(ENV === 'development'),
            secure: !(ENV === 'development'),
            maxAge: rememberMe ? THREE_DAYS_IN_SEC : TWO_HOURS_IN_SEC
          })

          res.status(200).json(user)
        })
      } catch (err) {
        next(err)
      }
    })(req, res, next)
  })

  router.post('/sign-up', async function (req, res, next) {
    const { body: user } = req

    try {
      const userData = await axios({
        url: `${API_URL}/api/auth/sign-up`,
        method: 'post',
        data: {
          name: user.name,
          email: user.email,
          password: user.password
        }
      })

      res.status(201).json({
        name: req.body.name,
        email: req.body.email,
        id: userData.data?.data
      })
    } catch (err) {
      const errData = err.response.data

      if (errData.statusCode === 400) res.status(400).json(errData)
    }
  })

  // GOOGLE OAUTH STRATEGY:

  router.get(
    '/google',
    passport.authenticate('google', {
      scope: ['email', 'profile', 'openid']
    })
  )

  router.get(
    '/google/callback',
    passport.authenticate('google', {
      session: false,
      failureRedirect: '/login'
    }),
    (req, res, next) => {
      if (!req.user) {
        next(boom.unauthorized())
      }

      const { token, ...user } = req.user

      res.cookie('token', token, {
        httpOnly: !(process.env.ENV === 'development'),
        secure: !(process.env.ENV === 'development')
      })

      res.cookie('email', user.user.email)
      res.cookie('name', user.user.name)
      res.cookie('id', user.user.id)

      res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Loading...</title>
        </head>
        <body>
          <script>
            window.location.href = "/";
          </script>
        </body>
      </html>
    `)
    }
  )

  // TWITTER STRATEGY:
  router.get('/twitter', passport.authenticate('twitter'))

  router.get(
    '/twitter/callback',
    passport.authenticate('twitter', {
      session: false,
      failureRedirect: '/login'
    }),
    (req, res, next) => {
      if (!req.user) {
        next(boom.unauthorized())
      }

      const { token, ...user } = req.user

      res.cookie('token', token, {
        httpOnly: !(ENV === 'development'),
        secure: !(ENV === 'development')
      })

      res.cookie('email', user.user.email)
      res.cookie('name', user.user.name)
      res.cookie('id', user.user.id)

      res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Loading</title>
        </head>
        <body>
          <script>
            window.location.href = "/";
          </script>
        </body>
      </html>
    `)
    }
  )
}

export default auth
