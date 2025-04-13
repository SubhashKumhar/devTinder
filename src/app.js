import express from 'express'

const app = express()

app.get('/test', (req, res) => {
  console.log('req:', req?.query) // {userId:12}
  res.send(`Hello World ftom test route: ${JSON.stringify(req?.query)}`)
})
app.get('/dashboard/:userId/:name/:password', (req, res) => {
  console.log('req:', req?.params) // {userId:12, name:'Subhash',password:'Password@123'}
  res.send(`Hello World dashboard: ${JSON.stringify(req?.params)}`)
})
app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000)