const express = require('express');
const db = require("../../db/db.js")
const router = express.Router();

router.get('/users', async (req, res) => {
  try{
    const dados = await db.getTable('users');
    res.json(dados);
  } catch(error){res.status(500).json({error: "falha ao acessar db"})}
});

//username as a parameter in the route
router.get('/users:username', async (req, res) => {
    try{
      const dados = await db.getRow('users', 'login', req.params.username);
      console.log('dados =');
      console.log(dados);
      res.json(dados);
    } catch(error){res.status(500).json({error: "falha ao acessar db"})}
  });

router.post('/register', async (req, res) =>{
    console.log("arrived register")
    try{
        info = {id: 4, login: 'rafa', password: 'rafa123', name: 'rafael',
        email: 'rafael@gmail.com', superuser: 0x01};
        req.body = JSON.stringify(info);
        const newUser = info;
        console.log('reqbody: ' + req.body)
        await db.insertRow('users', newUser);
        res.json(info)
    } catch(error){res.status(500).json({error: "falha ao acessar db"})}
});

module.exports = router;
