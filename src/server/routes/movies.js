import express from 'express'
import axios from 'axios'

import { API_URL } from '../config'

function movies (app) {
  const router = express.Router()

  app.use('/movies', router)

  router.get('/', async (req, res, next) => {
    const { token } = req.cookies

    try {
      let { data: userMovies } = await axios({
        url: `${API_URL}/api/user-movies`,
        headers: { Authorization: `Bearer ${token}` },
        method: 'get'
      })

      userMovies = userMovies.data

      let { data: movieList } = await axios({
        method: 'get',
        url: `${API_URL}/api/movies`,
        headers: { Authorization: `Bearer ${token}` }
      })

      movieList = movieList.data

      res.status(200).json({ userMovies, movieList })
    } catch (err) {
      next(err)
    }
  })
}

export default movies
