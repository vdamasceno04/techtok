// Importing required modules
const express = require('express') // Express.js library for building web applications
const db = require("../../db/db.js") // Database module for interacting with the database
const router = express.Router() // Router object to define routes
const User = require('../../models/User.js') // User model
const { generateAccessToken, generateRefreshToken, verifyToken, authenticateToken } = require('../middleware/auth.js') // Authentication functions

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
  const user = new User(login, password)

  try {
    // Validate the login and password
    const isLoginValid = await user.validateLogin(login)
    console.log(isLoginValid ? 'Login valid.' : 'Login invalid.')
    const isPasswordValid = await user.validatePassword(password)
    console.log(isPasswordValid ? 'Password valid.' : 'Password invalid.')
    // If the login and password are valid, generate access and refresh tokens
    if (isLoginValid && isPasswordValid) {
      await user.load()

      console.log('User named ' + user.getName() + ' requested login tokens.')

      const accessToken = generateAccessToken(user)
      const refreshToken = generateRefreshToken(user)

      // Check if the tokens were successfully generated
      if (accessToken && refreshToken) {
        const refreshTokenCookieOptions = {
          httpOnly: true,
          secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
          sameSite: 'lax'
        }

        // Set the refreshToken as a cookie
        res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions)
        // Send the accessToken as a JSON response
        res.status(200).json({ accessToken })
      } else {
        res.status(500).json({ errorType: 'Error generating tokens.' })
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

// Route to delete refreshToken
router.post('/delete-refresh-token', authenticateToken, (req, res) => {
  // Clear the refreshToken cookie
  res.cookie('refreshToken', '', { expires: new Date(0) })
  // Send a success message
  res.status(200).json({ message: 'Refresh token deleted successfully.' })
})

// Route to verify refreshToken
router.post('/verify-refresh-token', authenticateToken, async (req, res) => {
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
