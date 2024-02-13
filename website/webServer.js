require('dotenv').config();

const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');
const localtunnel = require('localtunnel');
const killPort = require('kill-port');
const cors = require('cors')

async function startServer() {
  try {
    const webPort = process.env.CLIENT_PORT
    // Check if port is already in use before starting the server
    await killPort(webPort)

    const certificatePath = path.join(__dirname, '..', 'security', 'server.crt');
    const privateKeyPath = path.join(__dirname, '..', 'security', 'server.key');
    const caPath = path.join(__dirname, '..', 'security', 'rootCA.crt');

    const options = {
      cert: fs.readFileSync(certificatePath),
      key: fs.readFileSync(privateKeyPath)
    }

    // Use Express for error handling and routing
    const app = express()

    // Handle the path '/' differently
    app.get('/', (req, res) => {
      const filePath = path.join(__dirname, 'initialPage.html')

      if (!fs.existsSync(filePath)) {
        return res.status(404).send('Web html file not found')
      }

      res.sendFile(filePath)
    })

    // Handle other paths using Express' static file serving middleware
    app.use(express.static(__dirname))
    const allowedOrigins = ['https://techtok.loca.lt', 'http://localhost:8443', 'http://localhost:3306']

    app.use(cors({
      origin: allowedOrigins
    }))
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Credentials", "true")
      next()
    })
    app.use((req, res, next) => {
      console.log(`Web request sent: ${req.method} ${req.url}`)
      next()
    })

    app.use((req, res, next) => {
      // Check if the requested file exists
      const filePath = path.join(__dirname, req.path)

      if (!fs.existsSync(filePath)) {
        return res.status(404).send('Web file not found')
      }

      next();
    })

    // Create and start the HTTPS server
    const server = https.createServer(options, app)
    server.listen(webPort, () => {
      console.log(`Web running on port ${webPort}`)
    })

    server.on('error', (error) => {
      console.error('Web error:', error)
    })

    // Set up localtunnel
    const tunnel = await localtunnel({
        port: webPort,
        subdomain: 'techtok',
        local_https: true,
        local_cert:certificatePath,
        local_key:privateKeyPath,
        local_ca:caPath
    })

    console.log(`TechTok is available on the internet at the following URL: ${tunnel.url}`)
    tunnel.on('error', () => {
        console.error('TechTok is no longer accessible from the internet, error.')
      })
    tunnel.on('close', () => {
      console.error('TechTok is no longer accessible from the internet, closed.')
    })
  } catch (error) {
    console.error('Error during web setup:', error)
  }
}

startServer()
