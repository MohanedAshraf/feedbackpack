const express = require('express')
const mongoose = require('mongoose')
require('./models/User')
require('./services/passport')
const {mongoURI} = require('./config/keys')


const connectDB = async () => {
    const conn = await mongoose.connect(mongoURI)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
}
connectDB()

const app = express()

require('./routes/auth')(app)


const PORT = process.env.PORT || 5000;
app.listen(PORT)