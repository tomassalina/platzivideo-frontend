import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from './app/moviesReducer'

import App from './routes/App'

const store = configureStore({
  reducer: moviesReducer,
  preloadedState: window.__PRELOADED_STATE__
})

delete window.__PRELOADED_STATE__

ReactDOM.hydrateRoot(
  document.getElementById('app'),
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
