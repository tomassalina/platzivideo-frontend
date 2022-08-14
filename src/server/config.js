const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  ENV: process.env.ENV || 'development',
  PORT: process.env.PORT || 3000,
  API_URL: process.env.API_URL,
  API_KEY_TOKEN: process.env.API_KEY_TOKEN
}
