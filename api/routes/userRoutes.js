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

module.exports = router;
