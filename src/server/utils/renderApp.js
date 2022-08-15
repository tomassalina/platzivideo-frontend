import axios from 'axios'
import jwt from 'jsonwebtoken'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import moviesSlice from '../../frontend/app/moviesSlice'
import userSlice from '../../frontend/app/userSlice'
import App from '../../frontend/routes/App'

import setResponse from './setResponse.js'

const renderApp = async (req, res) => {
  let initialState

  const { token } = req.cookies
  const verifyToken = jwt.decode(token) || {
    sub: { email: undefined, name: undefined, id: undefined }
  }

  const email = req.cookies.email || verifyToken.sub.email
  const name = req.cookies.name || verifyToken.sub.name
  const id = req.cookies.id || verifyToken.sub.id

  try {
    let { data: userMovies } = await axios({
      url: `${process.env.API_URL}/api/user-movies`,
      headers: { Authorization: `Bearer ${token}` },
      method: 'get'
    })

    userMovies = userMovies.data

    let { data: movieList } = await axios({
      url: `${process.env.API_URL}/api/movies`,
      headers: { Authorization: `Bearer ${token}` },
      method: 'get'
    })

    movieList = movieList.data

    initialState = {
      user: { email, name, id, loading: false, error: '' },
      movies: {
        playing: {},
        loading: false,
        myList: userMovies.map((userMovie) => {
          const favoriteMovie = movieList.find(
            (movie) => movie._id === userMovie.movieId
          )

          return { ...favoriteMovie, userMovieId: userMovie._id }
        }),
        trends: movieList.filter(
          (movie) => movie.contentRating === 'PG' && movie._id
        ),
        originals: movieList.filter(
          (movie) => movie.contentRating === 'G' && movie._id
        )
      }
    }
  } catch (err) {
    initialState = {
      user: {
        id: '',
        name: '',
        email: '',
        loading: false,
        error: ''
      },
      movies: {
        playing: {},
        loading: false,
        myList: [],
        trends: [],
        originals: []
      }
    }
  }

  const store = configureStore({
    reducer: {
      movies: moviesSlice,
      user: userSlice
    },
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
