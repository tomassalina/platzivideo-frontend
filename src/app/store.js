import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from './moviesReducer'

export const store = configureStore({
  reducer: moviesReducer
})
