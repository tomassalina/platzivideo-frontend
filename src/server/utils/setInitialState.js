import getMovies from '../services/getMovies'

const setInitialState = async ({ token, email, name, id }) => {
  try {
    const { myList, categories } = await getMovies(token)

    const initialState = {
      user: { email, name, id, loading: false, error: '' },
      movies: {
        playing: {},
        loading: false,
        myList,
        categories
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
        categories: {
          trends: { title: 'Trends', list: [] },
          originals: { title: 'PlatziVideo originals', list: [] },
          action: { title: 'Action', list: [] },
          family: { title: 'To see with family', list: [] },
          terror: { title: 'Terror', list: [] },
          kids: { title: 'Kids', list: [] }
        }
      }
    }

    return initialState
  }
}

export default setInitialState
