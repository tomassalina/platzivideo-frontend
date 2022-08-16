import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import moviesSlice from './app/moviesSlice'
import userSlice from './app/userSlice'

import App from './routes/App'
import { Toaster } from 'react-hot-toast'

const store = configureStore({
  reducer: {
    movies: moviesSlice,
    user: userSlice
  },
  preloadedState: window.__PRELOADED_STATE__
})

delete window.__PRELOADED_STATE__

ReactDOM.hydrateRoot(
  document.getElementById('app'),
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster position='top-center' />
    </BrowserRouter>
  </Provider>
)
