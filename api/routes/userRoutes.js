const express = require('express')
const db = require("../../db/db.js")
const bodyParser = require('body-parser')
const router = express.Router()
const User = require('../../models/User.js')

router.get('/users', async (req, res) => {
  try{
    const dados = await db.getTable('users')
    res.json(dados)
  } catch(error) {
    res.status(500).json({error: "falha ao acessar db"})
  }
})

//username as a parameter in the route
router.get('/users:username', async (req, res) => {
    try{
      const dados = await db.getRow('users', 'login', req.params.username)
      console.log('dados =')
      console.log(dados)
      res.json(dados)
    } catch(error) {
      res.status(500).json({error: "falha ao acessar db"})
    }
  })

router.post('/register', bodyParser.json(), async (req, res) =>{
    const { login, password, name, email, superuser } = req.body
    const user = new User(login, password, name, email, superuser)
    try{
      await user.saveUser()
      res.json(res.status(200))
    } catch(error) {
      res.status(500).json({error: "falha ao acessar db"})
    }
  })

module.exports = router
