import express from 'express'

const app = express()
const port = 3001

app.get('*', (req, res) => {
  res.json({ hello: 'express' })
})

app.listen(port, (err) => {
  if (err) console.log(err)
  else console.log(`Server running on port ${port}`)
})
