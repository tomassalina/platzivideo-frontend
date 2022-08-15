import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getMovies = createAsyncThunk(
  'movies/getMovies',
  async () => {
    try {
      const { data: movies } = await axios.get('/movies')
      return { movieList: movies.movieList, userMovies: movies.userMovies }
    } catch (err) {
      return err.message
    }
  }
)

export const setFavorite = createAsyncThunk(
  'movies/setFavorite',
  async (movie) => {
    try {
      const { data: userMovieId } = await axios.post('/user-movies', { movieId: movie._id })
      return { ...movie, userMovieId: userMovieId.data }
    } catch (err) {
      return err.message
    }
  }
)

export const deleteFavorite = createAsyncThunk(
  'movies/deleteFavorite',
  async (userMovieId) => {
    try {
      await axios.delete(`/user-movies/${userMovieId}`)
      return userMovieId
    } catch (err) {
      return err.message
    }
  }
)

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {},
  reducers: {
    clearMovies: (state, action) => {
      state.myList = []
      state.trends = []
      state.originals = []
    },
    getVideoSource: (state, action) => {
      state.playing =
        state.trends.find(item => item._id === action.payload) ||
        state.originals.find(item => item._id === action.payload) ||
        {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.loading = true
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        const { movieList, userMovies } = action.payload

        state.myList = userMovies.map((userMovie) => {
          const favoriteMovie = movieList.find(
            (movie) => movie._id === userMovie.movieId
          )

          return { ...favoriteMovie, userMovieId: userMovie._id }
        })
        state.trends = movieList.filter(
          (movie) => movie.contentRating === 'PG' && movie._id
        )
        state.originals = movieList.filter(
          (movie) => movie.contentRating === 'G' && movie._id
        )
        state.loading = false
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.loading = true
        state.error = action.payload
      })
      .addCase(setFavorite.pending, (state, action) => {
        state.loading = true
      })
      .addCase(setFavorite.fulfilled, (state, action) => {
        state.myList = [...state.myList, action.payload]
        state.loading = false
      })
      .addCase(deleteFavorite.pending, (state, action) => {
        state.loading = true
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.myList = state.myList.filter(movie => movie.userMovieId !== action.payload)
        state.loading = false
      })
  }
})

export const getMyList = (state) => state.movies.myList
export const getTrends = (state) => state.movies.trends
export const getOriginals = (state) => state.movies.originals
export const getPlaying = (state) => state.movies.playing

export const { getVideoSource, clearMovies } = moviesSlice.actions

export default moviesSlice.reducer
