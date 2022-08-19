const axios = require('axios')

const getMovies = async (token) => {
  try {
    let { data: userMovies } = await axios({
      url: `${process.env.API_URL}/api/user-movies`,
      headers: { Authorization: `Bearer ${token}` },
      method: 'get'
    })

    userMovies = userMovies.data

    let { data: movieList } = await axios({
      method: 'get',
      url: `${process.env.API_URL}/api/movies`,
      headers: { Authorization: `Bearer ${token}` }
    })

    movieList = movieList.data

    const myList = userMovies.map((userMovie) => {
      const favoriteMovie = movieList.find(movie => movie._id === userMovie.movieId)
      return { ...favoriteMovie, userMovieId: userMovie._id }
    })

    const categories = {
      trends: {
        title: 'Tendencias',
        list: movieList.filter(movie => movie.tags.includes('trends'))
      },
      originals: {
        title: 'Originales de PlatziVideo',
        list: movieList.filter(movie => movie.tags.includes('originals'))
      },
      action: {
        title: 'Acción',
        list: movieList.filter(movie => movie.tags.includes('action'))
      },
      family: {
        title: 'Para ver en familia',
        list: movieList.filter(movie => movie.tags.includes('family'))
      },
      terror: {
        title: 'Terror',
        list: movieList.filter(movie => movie.tags.includes('terror'))
      },
      kids: {
        title: 'Kids',
        list: movieList.filter(movie => movie.tags.includes('kids'))
      }
    }

    return { myList, categories }
  } catch (err) {
    console.log('getMovies error')
  }
}

export default getMovies
