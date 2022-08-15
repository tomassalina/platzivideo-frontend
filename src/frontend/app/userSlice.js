import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user) => {
    try {
      const response = await axios.post('/auth/sign-up', user)
      return response.data
    } catch (err) {
      return err.message
    }
  }
)

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }) => {
    try {
      const { data } = await axios({
        url: '/auth/sign-in',
        method: 'post',
        auth: {
          username: email,
          password
        }
      })

      document.cookie = `id=${data.user?.id}`
      document.cookie = `name=${data.user?.name}`
      document.cookie = `email=${data.user?.email}`

      return data.user
    } catch (err) {
      return err.message
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    logoutRequest: (state, action) => {
      state = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state = { ...action.payload, loading: false, error: '' }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(loginUser.pending, (state, action) => {
        state = state.user.loading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state = { ...action.payload, loading: false, error: '' }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const getUser = (state) => state.user

export const { logoutRequest } = userSlice.actions

export default userSlice.reducer
