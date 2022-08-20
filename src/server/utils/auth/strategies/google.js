const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const boom = require('@hapi/boom')
const axios = require('axios')
const { API_URL, API_KEY_TOKEN, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('../../../config')

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refresToken, profile, cb) => {
      const { data, status } = await axios({
        url: `${API_URL}/api/auth/sign-provider`,
        method: 'post',
        data: {
          name: profile._json.name || profile.name,
          email: profile._json.email || profile.emails[0].value,
          password: profile._json.sub || profile.id,
          apiKeyToken: API_KEY_TOKEN
        }
      })

      console.log(data)

      if (!data || status !== 200) {
        return cb(boom.unauthorized(), false)
      }

      return cb(null, data)
    }
  )
)
