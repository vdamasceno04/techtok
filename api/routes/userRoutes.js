const express = require('express');
const db = require("../../db/db.js");
const bodyParser = require('body-parser');
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
      console.log('dados =' + dados);
      res.json(dados);
    } catch(error){res.status(500).json({error: "falha ao acessar db"})}
  });

router.post('/register', bodyParser.json(), async (req, res) =>{
    try{
        await db.insertRow('users', req.body);
        res.json(res.status(200));
    } catch(error){res.status(500).json({error: "falha ao acessar db"})}
});

module.exports = router;
