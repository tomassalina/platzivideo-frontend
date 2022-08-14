import express from 'express'
import boom from '@hapi/boom'
import axios from 'axios'

import { API_URL } from '../config'

function userMovies (app) {
  const router = express.Router()

  app.use('/user-movies', router)

  router.post('/', async (req, res, next) => {
    try {
      const { body: userMovie } = req
      const { token } = req.cookies

      const { data, status } = await axios({
        url: `${API_URL}/api/user-movies`,
        headers: { Authorization: `Bearer ${token}` },
        method: 'post',
        data: userMovie
      })

      if (status !== 201) {
        return next(boom.badImplementation())
      }

      res.status(201).json(data)
    } catch (err) {
      next(err)
    }
  })

  router.delete('/:userMovieId', async function (req, res, next) {
    try {
      const { userMovieId } = req.params
      const { token } = req.cookies

      const { data, status } = await axios({
        url: `${API_URL}/api/user-movies/${userMovieId}`,
        headers: { Authorization: `Bearer ${token}` },
        method: 'delete'
      })

      if (status !== 200) {
        return next(boom.badImplementation())
      }

      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  })
}

export default userMovies
