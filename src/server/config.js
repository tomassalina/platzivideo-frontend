const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  ENV: process.env.ENV || 'development',
  PORT: process.env.PORT || 3000,
  API_URL: process.env.API_URL,
  API_KEY_TOKEN: process.env.API_KEY_TOKEN,
  SESSION_SECRET: process.env.SESSION_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET
}
