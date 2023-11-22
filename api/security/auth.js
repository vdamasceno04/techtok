require('dotenv').config()
const jwt = require('jsonwebtoken')

// Secret key for signing and verifying tokens
const JWT_SECRET = process.env.JWT_SECRET
const JWT_LONG_EXPIRES_IN = process.env.JWT_LONG_EXPIRES_IN
const JWT_SHORT_EXPIRES_IN = process.env.JWT_SHORT_EXPIRES_IN

/**
 * Generates an access token for the given user ID.
 *
 * @param {int} userId - The ID of the user.
 * @return {String} The generated access token.
 */
function generateAccessToken(userId) {
  const payload = { id: userId }
  const options = { expiresIn: JWT_SHORT_EXPIRES_IN }
  return jwt.sign(payload, JWT_SECRET, options)
}

/**
 * Generates a refresh token for the given user ID.
 *
 * @param {String} userId - The ID of the user.
 * @return {String} The generated refresh token.
 */
function generateRefreshToken(userId) {
  const payload = { id: userId }
  const options = { expiresIn: JWT_LONG_EXPIRES_IN }
  return jwt.sign(payload, JWT_SECRET, options)
}

/**
 * Verify a refresh token.
 *
 * @param {String} refreshToken - The refresh token to verify.
 * @return {Object} The decoded refresh token if it is valid.
 * @throws {Error} If the refresh token is invalid.
 */
function verifyRefreshToken(refreshToken) {
  try {
    return jwt.verify(refreshToken, JWT_SECRET)
  } catch (error) {
    throw new Error('Invalid refresh token')
  }
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
}