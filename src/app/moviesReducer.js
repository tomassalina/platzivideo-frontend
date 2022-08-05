import { createSlice } from '@reduxjs/toolkit'
import initialState from '../initialState'

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setFavorite: (state, action) => {
      const exists = state.myList.find(item => item.id === action.payload.id)
      if (exists) return state
      state.myList = [...state.myList, action.payload]
    },
    deleteFavorite: (state, action) => {
      state.myList = state.myList.filter(movie => movie.id !== action.payload)
    },
    loginRequest: (state, action) => {
      state.user = action.payload
    },
    logoutRequest: (state, action) => {
      state.user = action.payload
    },
    registerRequest: (state, action) => {
      state.user = action.payload
    },
    getVideoSource: (state, action) => {
      state.playing =
        state.trends.find(item => item.id === Number(action.payload)) ||
        state.originals.find(item => item.id === Number(action.payload)) ||
        []
    }
  }
})

export const { setFavorite, deleteFavorite, loginRequest, logoutRequest, registerRequest, getVideoSource } = moviesSlice.actions
export default moviesSlice.reducer
