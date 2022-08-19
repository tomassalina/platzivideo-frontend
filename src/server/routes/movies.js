import express from 'express'
import axios from 'axios'

import { API_URL } from '../config'
import getMovies from '../services/getMovies'

function movies (app) {
  const router = express.Router()

  app.use('/movies', router)

  router.get('/', async (req, res, next) => {
    const { token } = req.cookies

    try {
      const { myList, categories } = await getMovies(token)

      res.status(200).json({ myList, categories })
    } catch (err) {
      next(err)
    }
  })

  router.get('/search', async (req, res, next) => {
    const { token } = req.cookies
    const { query } = req.query || ''

    try {
      const { data: movies } = await axios({
        method: 'get',
        url: `${API_URL}/api/movies?query=${query}`,
        headers: { Authorization: `Bearer ${token}` }
      })

      res.status(200).json({ movies: movies.data })
    } catch (err) {
      const { status, data } = err.response

      res.status(status).json(data)
    }
  })

  router.get('/:id', async (req, res, next) => {
    const { token } = req.cookies
    const { id } = req.params

    try {
      const { data: movie } = await axios({
        method: 'get',
        url: `${API_URL}/api/movies/${id}`,
        headers: { Authorization: `Bearer ${token}` }
      })

      res.status(200).json({ movie: movie.data })
    } catch (err) {
      const { status, data } = err.response

      res.status(status).json(data)
    }
  })
}

export default movies
