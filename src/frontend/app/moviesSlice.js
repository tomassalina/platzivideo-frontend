import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

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
