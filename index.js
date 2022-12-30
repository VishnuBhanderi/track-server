require('./src/models/User')
require('./src/models/Track')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./src/routes/authRoutes')
const trackRoutes = require('./src/routes/trackRoutes')
const requireAuth = require('./src/middelwares/requireAuth')

const app = express()

app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)

const mongoUri =
  'mongodb+srv://vishnubhanderi0210:Vishnu4915@cluster0.d9o0rt1.mongodb.net/?retryWrites=true&w=majority'
mongoose.set('strictQuery', false)

mongoose.connect(mongoUri)

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance')
})
mongoose.connection.on('error', err => {
  console.error('Error connecting to Mongo', err)
})

app.get('/', requireAuth, (req, res) => {
  res.send(`Your E-mail is ${req.user.email}`)
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
