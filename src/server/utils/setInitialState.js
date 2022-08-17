import axios from 'axios'

const setInitialState = async ({ token, email, name, id }) => {
  try {
    let { data: userMovies } = await axios({
      url: `${process.env.API_URL}/api/user-movies`,
      headers: { Authorization: `Bearer ${token}` },
      method: 'get'
    })

    userMovies = userMovies.data

    let { data: movieList } = await axios({
      url: `${process.env.API_URL}/api/movies`,
      headers: { Authorization: `Bearer ${token}` },
      method: 'get'
    })

    movieList = movieList.data

    const initialState = {
      user: { email, name, id, loading: false, error: '' },
      movies: {
        playing: {},
        loading: false,
        myList: userMovies.map((userMovie) => {
          const favoriteMovie = movieList.find(
            (movie) => movie._id === userMovie.movieId
          )

          return { ...favoriteMovie, userMovieId: userMovie._id }
        }),
        trends: movieList.filter(movie => movie.tags.includes('trends')),
        originals: movieList.filter(movie => movie.tags.includes('originals')),
        action: movieList.filter(movie => movie.tags.includes('action')),
        family: movieList.filter(movie => movie.tags.includes('family')),
        terror: movieList.filter(movie => movie.tags.includes('terror')),
        kids: movieList.filter(movie => movie.tags.includes('kids'))
      }
    }

    return initialState
  } catch (err) {
    const initialState = {
      user: {
        id: '',
        name: '',
        email: '',
        loading: false,
        error: ''
      },
      movies: {
        playing: {},
        loading: false,
        myList: [],
        trends: [],
        originals: []
      }
    }

    return initialState
  }
}

export default setInitialState
