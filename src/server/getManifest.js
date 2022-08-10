const fs = require('fs')
const path = require('path')

const getManifest = () => {
  try {
    const manifest = path.resolve(__dirname, 'public/manifest.json')
    return JSON.parse(fs.readFileSync(manifest))
  } catch (err) {
    console.log(err)
  }
}

export default getManifest
