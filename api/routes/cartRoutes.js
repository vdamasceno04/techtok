const express = require('express');
const db = require("../../db/db.js");
const bodyParser = require('body-parser');
const router = express.Router();

router.get('/get/:userId/:prodId', async (req, res) =>{
    try{
        req.body = {customer_id: req.params.userId, product_id: req.params.prodId};
        const data = await db.getRow2Condition('carts', req.body);
        res.json(data);
    }   catch(error){res.status(500).json({error: "falha ao acessar db"})}
});

router.post('/insert', bodyParser.json(), async (req, res) =>{
    try{
       await db.insertRow('carts', req.body);
        res.json(res.status(200));
    } catch(error){res.status(500).json({error: "falha ao acessar db"})}
});

router.put('/update', bodyParser.json(), async (req, res) =>{
    try{
        info = {quantity: req.body.quantity};
        match = {id: req.body.id};
        console.log('match = ' + match)
       await db.updateCell('carts', match, info)
        res.json(res.status(200));
    } catch(error){res.status(500).json({error: "falha ao acessar db"})}
});

router.delete('/', bodyParser.json(), async (req, res) =>{
    try{
       await db.deleteRow2Condition('carts', req.body);
        res.json(res.status(200));
    } catch(error){res.status(500).json({error: "falha ao acessar db"})}
});

module.exports = router;
