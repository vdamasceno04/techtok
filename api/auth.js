require('dotenv').config()

const jwt = require('jsonwebtoken')

// Secret key for signing and verifying tokens
const SECRET_KEY = process.env.JWT_SECRET

// Function to generate a new access token
function generateAccessToken(userId) {
  // Payload
  const payload = {
    user: userId,
    type: 'access',
  }

  // Sign the token
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '15m' })

  return token
}

// Function to generate a new refresh token
function generateRefreshToken(userId) {
  // Payload
  const payload = {
    user: userId,
    type: 'refresh',
  }

  // Sign the token
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' })

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
