const passport = require('passport')
const { Strategy: TwitterStrategy } = require('passport-twitter')
const axios = require('axios')
const boom = require('@hapi/boom')
const { get } = require('lodash')

const { API_URL, API_KEY_TOKEN, TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET } = require('../../../config')

passport.use(
  new TwitterStrategy(
    {
      consumerKey: TWITTER_CONSUMER_KEY,
      consumerSecret: TWITTER_CONSUMER_SECRET,
      callbackURL: '/auth/twitter/callback',
      includeEmail: true
    },
    async (token, tokenSecret, profile, cb) => {
      const { data, status } = await axios({
        url: `${API_URL}/api/auth/sign-provider`,
        method: 'post',
        data: {
          name: profile.displayName,
          email: get(
            profile,
            'emails.0.value',
            `${profile.username}@twitter.com`
          ),
          password: profile.id,
          apiKeyToken: API_KEY_TOKEN
        }
      })

      if (!data || status !== 200) {
        return cb(boom.unauthorized(), false)
      }

      cb(null, data)
    }
  )
)
