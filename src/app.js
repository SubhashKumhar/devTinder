import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})
app.get('/test', (req, res) => {
    res.send('Hello World ftom test route')
  })
  app.get('/dashboard', (req, res) => {
    res.send('Hello World dashboard')
  })

app.listen(3000)