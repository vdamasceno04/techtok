require('dotenv').config()
const https = require('https')
const fs = require('fs')
const path = require('path')
const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const staffRoutes = require('./routes/staffRoutes')
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')
const app = express()

app.use(cors())

const options = {
  key: fs.readFileSync(path.join(__dirname, 'security/private.key')),
  cert: fs.readFileSync(path.join(__dirname, 'security/certificate.crt'))
}

const server = https.createServer(options, app)

server.listen(process.env.API_PORT, () => console.log(`Server listening on port ${process.env.API_PORT}`))

app.use(cookieParser())

app.use('/product', productRoutes)
app.use('/staff', staffRoutes)
app.use('/user', userRoutes)
app.use('/login', userRoutes)