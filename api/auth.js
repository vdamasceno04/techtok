require('dotenv').config()

const jwt = require('jsonwebtoken')
const User = require('./models/User') // Require the User model

// Secret key for signing and verifying tokens
const SECRET_KEY = process.env.JWT_SECRET_KEY

// Expiration times for the tokens
const SHORT_EXPIRES_IN = process.env.JWT_SHORT_EXPIRES_IN
const LONG_EXPIRES_IN = process.env.JWT_LONG_EXPIRES_IN

// Function to generate a new access token
function generateAccessToken(user) {
  // Payload
  const payload = {
    user: user.id,
    login: user.login,
    superuser: user.superuser,
    type: 'access',
  }

  let token

  try {
    // Sign the token
    token = jwt.sign(payload, SECRET_KEY, { expiresIn: SHORT_EXPIRES_IN })
    console.log('Generated access token:', token)
  } catch (err) {
    console.log('Error generating access token:', err)
  }

  return token
}

// Function to generate a new refresh token
function generateRefreshToken(user) {
  // Payload
  const payload = {
    user: user.id,
    login: user.login,
    superuser: user.superuser,
    type: 'refresh',
  }

  let token

  try {
    // Sign the token
    token = jwt.sign(payload, SECRET_KEY, { expiresIn: LONG_EXPIRES_IN })
    console.log('Generated refresh token:', token)
  } catch (err) {
    console.log('Error generating refresh token:', err)
  }

  return token
}

// Function to verify a token
function verifyToken(token, type) {
  let userData

  try {
    // Verify the token
    userData = jwt.verify(token, SECRET_KEY)

    // Check the token type
    if (userData.type !== type) {
      userData = null
    }
  } catch (err) {
    console.log('Token verification failed:', err)
  }

  return userData
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
}
