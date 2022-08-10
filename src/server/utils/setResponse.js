const createScripts = ({ mainBuild, commonBuild, vendorsBuild }) => {
  if (commonBuild && vendorsBuild) {
    return (`
      <script src="${commonBuild}" type="text/javascript"></script>
      <script src="${vendorsBuild}" type="text/javascript"></script>
      <script src="${mainBuild}" type="text/javascript"></script>
    `)
  }

  return (`<script src="${mainBuild}" type="text/javascript"></script>`)
}

const setResponse = (html, preloadedState, manifest) => {
  const mainStyle = manifest ? manifest['main.css'] : '/assets/app.css'
  const mainBuild = manifest ? manifest['main.js'] : '/assets/app.js'
  const commonBuild = manifest ? manifest['commons.js'] : false
  const vendorsBuild = manifest ? manifest['vendors.js'] : false

  return (`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Platzi Video</title>
        <link rel="stylesheet" href="${mainStyle}" type="text/css">
        </head>
        <body>
        <div id="app">${html}</div>
        <script id="preloadedState">
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        ${createScripts({ mainBuild, commonBuild, vendorsBuild })}
      </body>
    </html>
  `)
}

export default setResponse
