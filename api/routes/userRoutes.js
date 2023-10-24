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

router.post('users/register', async (req, res) =>{
    try{
        info = {id: 4, login: 'rafa', password: 'rafa123', name: 'rafael',
        email: 'rafael@gmail.com', superuser: 0x01};
        req.body = JSON.stringify(info);
        const newUser = req.body;
        const logs = await db.insertRow('users', newUser);
        console.log(logs);
    } catch(error){res.status(500).json({error: "falha ao acessar db"})}
});
module.exports = router;
