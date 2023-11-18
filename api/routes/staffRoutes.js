const express = require('express');
const db = require("../../db/db.js");
const bodyParser = require('body-parser');
const router = express.Router();

router.post('/insert', bodyParser.json(), async (req, res) =>{
    try{
       await db.insertProduct(req.body);
        res.json(res.status(200));
    } catch(error){res.status(500).json({error: "falha ao acessar db"})}
});

module.exports = router;
