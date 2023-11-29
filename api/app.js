require('dotenv').config()

const cors = require('cors')
const express = require('express')
const https = require('https')
const fs = require('fs')
const path = require('path')

// Import routes
const productRoutes = require('./routes/productRoutes')
const staffRoutes = require('./routes/staffRoutes')
const userRoutes = require('./routes/userRoutes')

// Create an Express application
const app = express()

// SSL options
const optionSSL = {
  key: fs.readFileSync(path.join(__dirname, '..', 'security', 'server.key')),
  cert: fs.readFileSync(path.join(__dirname, '..', 'security', 'server.crt'))
}

app.use(cors({
  origin: ['https://techtok.loca.lt', 'http://localhost:8443', 'http://localhost:3306'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true")
  next()
})
app.use(express.static('public'))

// Routes
app.use(productRoutes)
app.use(staffRoutes)
app.use(userRoutes)

// Start the server
https.createServer(optionSSL, app).listen(process.env.API_PORT, () => {
  console.log(`Server running on port ${process.env.API_PORT}`)
})
