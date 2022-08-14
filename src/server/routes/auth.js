import express from 'express'
import passport from 'passport'
import boom from '@hapi/boom'
import axios from 'axios'

const { ENV, API_URL } = require('../config')

// Basic strategy
require('../utils/auth/strategies/basic')

function auth (app) {
  const router = express.Router()

  app.use('/auth', router)

  router.post('/sign-in', async function (req, res, next) {
    const { rememberMe } = req.body

    passport.authenticate('basic', (error, data) => {
      const SEVEN_DAYS_IN_SEC = 7 * 24 * 60 * 60 * 1000
      const TWO_HOURS_IN_SEC = 2 * 60 * 60 * 1000

      try {
        if (error || !data) next(boom.unauthorized())

        req.login(data, { session: false }, async (err) => {
          if (err) next(err)

          const { token, ...user } = data

          res.cookie('token', token, {
            httpOnly: !(ENV === 'development'),
            secure: !(ENV === 'development'),
            maxAge: rememberMe ? SEVEN_DAYS_IN_SEC : TWO_HOURS_IN_SEC
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
      console.log(err)
    }
  })
}

export default auth
