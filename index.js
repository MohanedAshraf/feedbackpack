const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const passport = require('passport')
const cookieSession = require('cookie-session')
const { mongoURI, cookieKey } = require('./config/keys')
const connectDB = async () => {
  const conn = await mongoose.connect(mongoURI)
  console.log(`MongoDB Connected: ${conn.connection.host}`)
}

connectDB()
require('./models/User')
require('./services/passport')

const app = express()

app.use(express.json())
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey]
  })
)
app.use(passport.initialize())
app.use(passport.session())

require('./routes/auth')(app)
require('./routes/billing')(app)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (_, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}
const PORT = process.env.PORT || 5000
app.listen(PORT, (err) => {
  if (err) console.log(err)
  else console.log('Server is Running on Port:', PORT)
})
