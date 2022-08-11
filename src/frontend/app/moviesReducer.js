import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const registerUser = createAsyncThunk(
  'movies/registerUser',
  async (user) => {
    try {
      const response = await axios.post('/auth/sign-up', user)
      return response.data
    } catch (err) {
      return err.message
    }
  }
)

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {},
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
    getVideoSource: (state, action) => {
      state.playing =
        state.trends.find(item => item.id === Number(action.payload)) ||
        state.originals.find(item => item.id === Number(action.payload)) ||
        []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload
    })
  }
})

export const { setFavorite, deleteFavorite, loginRequest, logoutRequest, getVideoSource } = moviesSlice.actions

export default moviesSlice.reducer
