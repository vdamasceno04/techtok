const express = require('express')
const db = require("../../db/db.js")
const bodyParser = require('body-parser')
const router = express.Router()
const User = require('../../models/User.js')
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../security/auth')

router.get('/users', async (req, res) => {
  try{
    const dados = await db.getTable('users')
    res.json(dados)
  } catch(error) {
    res.status(500).json({error: "falha ao acessar db"})
  }
})

//username as a parameter in the route
// router.get('/users:username', async (req, res) => {
//     try{
//       const dados = await db.getRow('users', 'login', req.params.username)
//       console.log('dados =')
//       console.log(dados)
//       res.json(dados)
//     } catch(error) {
//       res.status(500).json({error: "falha ao acessar db"})
//     }
//   })

router.post('/login', bodyParser.json(), async (req, res) => {
  const { login, password } = req.body
  const usr = new User(login, password)

  try {
    const isLoginValid = await usr.validateLogin(login)
    const isPasswordValid = await usr.validatePassword(password)

    if (isLoginValid && isPasswordValid) {
      usr.load()

      // Generate an access token with a shorter expiration time
      const accessToken = generateAccessToken(usr.getId())

      // Generate a refresh token with a longer expiration time
      const refreshToken = generateRefreshToken(usr.getId())

      // Set secure and SameSite attributes for the access token cookie
      const accessTokenCookieOptions = {
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
        sameSite: 'lax'
      }

      // Set the access token cookie
      res.cookie('accessToken', accessToken, accessTokenCookieOptions)

      // Return the access token and refresh token as JSON response
      res.status(200).json({ accessToken, refreshToken })
    } else {
      let errorType
      if (!isLoginValid) {
        errorType = 'login'
      } else if (!isPasswordValid) {
        errorType = 'password'
      }
      res.status(401).json({ errorType })
    }
  } catch (error) {
    res.status(500).json({ errorType: error.message })
  }
})

router.post('/register', bodyParser.json(), async (req, res) =>{
    const { login, password, name, email, superuser } = req.body
    const user = new User(login, password, name, email, superuser)
    try{
      await user.save()
      res.json(res.status(200))
    } catch(error) {
      res.status(500).json({error: "falha ao acessar db"})
    }
  })

module.exports = router
