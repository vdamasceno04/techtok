const express = require('express');
const db = require("../../db/db.js")
const router = express.Router();

router.get('/products', async (req, res) => {
  try{
    const dados = await db.getTable('products');
    res.json(dados);
  } catch(error){res.status(500).json({error: "falha ao acessar db"})}
  });

router.get('/products/keyboards', async (req, res) => {
  try{
    const dados = await db.getRow('products', {'category':'keyboards'});
    res.json(dados);
  } catch(error){res.status(500).json({error: "falha ao acessar db"})}
  });

router.get('/keyboards', async (req, res) => {
  try{
    const dados = await db.getTable('keyboards');
    res.json(dados);
  } catch(error){res.status(500).json({error: "falha ao acessar db"})}
  });

router.get('/products/mouses', async (req, res) => {
try{
  const dados = await db.getRow('products', {'category':'mice'});
  res.json(dados);
} catch(error){res.status(500).json({error: "falha ao acessar db"})}
});

router.get('/mouses', async (req, res) => {
  try{
    const dados = await db.getTable('mice');
    res.json(dados);
  } catch(error){res.status(500).json({error: "falha ao acessar db"})}
});

router.get('/products/earphones', async (req, res) => {
try{
  const dados = await db.getRow('products', {'category':'earphones'});
  res.json(dados);
} catch(error){res.status(500).json({error: "falha ao acessar db"})}
});

router.get('/earphones', async (req, res) => {
  try{
    const dados = await db.getTable('earphones');
    res.json(dados);
  } catch(error){res.status(500).json({error: "falha ao acessar db"})}
});

router.get('/products/usbflash', async (req, res) => {
try{
  const dados = await db.getRow('products', {'category':'usb_flash_drives'});
  res.json(dados);
} catch(error){res.status(500).json({error: "falha ao acessar db"})}
});

router.get('/usbflash', async (req, res) => {
  try{
    const dados = await db.getTable('usb_flash_drives');
    res.json(dados);
  } catch(error){res.status(500).json({error: "falha ao acessar db"})}
});

router.get('/products/speakers', async (req, res) => {
try{
  const dados = await db.getRow('products', {'category':'speakers'});
  res.json(dados);
} catch(error){res.status(500).json({error: "falha ao acessar db"})}
});

router.get('/speakers', async (req, res) => {
  try{
    const dados = await db.getTable('speakers');
    res.json(dados);
  } catch(error){res.status(500).json({error: "falha ao acessar db"})}
});

const path = require('path')// Make sure to include the 'path' module.

router.get('/:filename',(req,res)=>{
  const filePath = path.join(__dirname, '../../imgs', req.params.filename)// Construct the absolute path to the image file.
  res.sendFile(filePath,(err)=>{// Send the image file to the client.
    if(err){
      console.error(err)
      res.status(404).send('File not found')
    }
  })
})

module.exports = router;

/*rotas relacionadas
router.get('/users', (req, res) => {});
router.get('/users/:id', (req, res) => {});
router.post('/users', (req, res) => {});*/

