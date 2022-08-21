import axios from 'axios'

const destroySession = async () => {
  document.cookie = 'id='
  document.cookie = 'name='
  document.cookie = 'email='
  document.cookie = 'token='

  return await axios.delete('/auth/logout')
}

export default destroySession
