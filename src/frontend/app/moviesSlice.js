import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-hot-toast'

export const getMovies = createAsyncThunk(
  'movies/getMovies',
  async () => {
    try {
      const { data: movies } = await axios.get('/movies')
      return { myList: movies.myList, categories: movies.categories }
    } catch (err) {
      return err.message
    }
  }
)

export const getVideoSource = createAsyncThunk(
  'movies/getVideoSource',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`/movies/${id}`)
      return data.movie?.source
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const setFavorite = createAsyncThunk(
  'movies/setFavorite',
  async (movie) => {
    try {
      const { data: userMovieId } = await axios.post('/user-movies', { movieId: movie._id })

      toast.success('Agregada correctamente a tu lista')

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
      state.categories = {
        trends: { title: 'Tendencias', list: [] },
        originals: { title: 'Originales de PlatziVideo', list: [] },
        action: { title: 'Acción', list: [] },
        family: { title: 'Para ver en familia', list: [] },
        terror: { title: 'Terror', list: [] },
        kids: { title: 'Kids', list: [] }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.loading = true
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        const { myList, categories } = action.payload
        state.myList = myList
        state.categories = categories
        state.loading = false
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.loading = true
        state.error = action.payload
      })

      .addCase(getVideoSource.fulfilled, (state, action) => {
        state.playing = action.payload
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
export const getCategories = (state) => state.movies.categories
export const getPlaying = (state) => state.movies.playing
export const getMoviesAreLoading = (state) => state.movies.loading

export const { clearMovies } = moviesSlice.actions

export default moviesSlice.reducer