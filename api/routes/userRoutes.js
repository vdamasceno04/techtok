// Importing required modules
const express = require('express') // Express.js library for building web applications
const db = require("../../db/db.js") // Database module for interacting with the database
const router = express.Router() // Router object to define routes
const User = require('../../models/User.js') // User model
const { generateAccessToken, generateRefreshToken, verifyToken } = require('../auth') // Authentication functions

// Middleware for parsing JSON and urlencoded data
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

// Route to get all users
router.get('/users', async (req, res) => {
  try {
    // Fetch all users from the database
    const dados = await db.getTable('users')
    // Send the users as a JSON response
    res.json(dados)
  } catch(error) {
    // Send an error message if something goes wrong
    res.status(500).json({error: "Failed to access database."})
  }
})

// Route to get a user by username
router.get('/users/:username', async (req, res) => {
  try {
    // Fetch a user from the database by username
    const dados = await db.getRow('users', 'login', req.params.username)
    // Send the user as a JSON response
    res.json(dados)
  } catch(error) {
    // Send an error message if something goes wrong
    res.status(500).json({error: "Failed to access database."})
  }
})

// Route to log in a user
router.post('/login', async (req, res) => {
  // Extract login and password from the request body
  const { login, password } = req.body
  // Create a new User object
  const usr = new User(login, password)

  try {
    // Validate the login and password
    const isLoginValid = await usr.validateLogin(login)
    console.log(isLoginValid ? 'Login valid.' : 'Login invalid.')
    const isPasswordValid = await usr.validatePassword(password)
    console.log(isPasswordValid ? 'Password valid.' : 'Password invalid.')
    // If the login and password are valid, generate access and refresh tokens
    if (isLoginValid && isPasswordValid) {
      await usr.load()

      console.log('User named ' + usr.getName() + ' requested login tokens.')

      const accessToken = generateAccessToken(usr)
      const refreshToken = generateRefreshToken(usr.getId(), usr.getLogin(), usr.getSuperuser())

      // Check if the tokens were successfully generated
      if (accessToken && refreshToken) {
        const accessTokenCookieOptions = {
          httpOnly: true,
          secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
          sameSite: 'lax'
        }

        // Set the access token as a cookie
        res.cookie('accessToken', accessToken, accessTokenCookieOptions)
        // Send the access and refresh tokens as a JSON response
        res.status(200).json({ accessToken, refreshToken })
      } else {
        res.status(500).json({ errorType: 'Error generating access tokens.' })
      }
    } else {
      // If the login or password is invalid, send an error message
      let errorType = !isLoginValid ? 'login' : 'password'
      res.status(401).json({ errorType: errorType })
    }
  } catch (error) {
    // Send an error message if something goes wrong
    res.status(501).json({ errorType: error.message })
  }
})

// Route to register a new user
router.post('/register', async (req, res) => {
  // Extract user data from the request body
  const { login, password, name, email, superuser } = req.body
  // Create a new User object
  const user = new User(login, password, name, email, superuser)

  try {
    // Save the new user to the database
    await user.save()
    // Send a success message
    res.status(200).json({ message: "User registered successfully." })
  } catch(error) {
    // Send an error message if something goes wrong
    res.status(500).json({error: "Failed to access database."})
  }
})

router.post('/verify-refresh-token', async (req, res) => {
  const refreshToken = req.cookies.refreshToken
  if (refreshToken) {
      // Verify the refreshToken
      const userData = verifyToken(refreshToken, 'refresh')

      if (userData) {
          // If the refreshToken is valid, send the user data as a JSON response
          res.status(200).json({ hasRefreshToken: true, login: userData.login, superuser: userData.superuser })
      } else {
          // If the refreshToken is not valid, send an error message
          res.status(401).json({ hasRefreshToken: false })
      }
  } else {
      // If refreshToken does not exist, send an error message
      res.status(401).json({ hasRefreshToken: false })
  }
})

// Export the router object
module.exports = router
