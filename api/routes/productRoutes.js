const express = require('express');
const db = require("../../db/db.js")
const router = express.Router();

router.get('/keyboards', async (req, res) => {
  try{
    const dados = await db.getTable('keyboards');
    res.json(dados);
  } catch(error){res.status(500).json({error: "falha ao acessar db"})}
  });

router.get('/mouses', async (req, res) => {
  try{
    const dados = await db.getTable('mice');
    res.json(dados);
  } catch(error){res.status(500).json({error: "falha ao acessar db"})}
});

router.get('/earphones', async (req, res) => {
  try{
    const dados = await db.getTable('earphones');
    res.json(dados);
  } catch(error){res.status(500).json({error: "falha ao acessar db"})}
});

router.get('/usbflash', async (req, res) => {
  try{
    const dados = await db.getTable('usb_flash_drives');
    res.json(dados);
  } catch(error){res.status(500).json({error: "falha ao acessar db"})}
});

router.get('/speakers', async (req, res) => {
  try{
    const dados = await db.getTable('speakers');
    res.json(dados);
  } catch(error){res.status(500).json({error: "falha ao acessar db"})}
});

module.exports = router;

/*rotas relacionadas
router.get('/users', (req, res) => {});
router.get('/users/:id', (req, res) => {});
router.post('/users', (req, res) => {});*/

