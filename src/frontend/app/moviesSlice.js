import { createSlice } from '@reduxjs/toolkit'

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {},
  reducers: {
    setFavorite: (state, action) => {
      state.myList = [...state.myList, action.payload]
    },
    deleteFavorite: (state, action) => {
      state.myList = state.myList.filter(movie => movie.userMovieId !== action.payload)
    },
    getVideoSource: (state, action) => {
      state.playing =
        state.trends.find(item => item._id === action.payload) ||
        state.originals.find(item => item._id === action.payload) ||
        {}
    }
  }
})

export const getMyList = (state) => state.movies.myList
export const getTrends = (state) => state.movies.trends
export const getOriginals = (state) => state.movies.originals
export const getPlaying = (state) => state.movies.playing

export const { setFavorite, deleteFavorite, getVideoSource } = moviesSlice.actions

export default moviesSlice.reducer
