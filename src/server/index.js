require('ignore-styles')

require('@babel/register')({
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic'
      }
    ]
  ]
})

require('asset-require-hook')({
  extensions: ['png', 'jpg', 'gif', 'mp4'],
  name: '/assets/images/[name].[ext]'
})

require('./server')
