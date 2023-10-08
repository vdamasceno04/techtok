const express = require("express");
const cors = require('cors');
const db = require("../db/db.js")
const app = express();
const port = 3000;
//app ís an Express instance
//express has some methods, including CRUD operations
/*Node.js server will run on port 3000 and respond to
the defined requests*/

app.use(cors());

/*THE FOLLOWING EXAMPLE SENDS "products", which can be
ACCESSED AS A .JSON IN http://localhost:3000/products   */
app.get("/products", (req,res) => {   
   const products = [
     {id: 1, name: "hammer"},
     {id: 2,name: "screwdriver"},
     {id: 3, name: "wrench"}];
  res.json(products);})

app.get('/keyboards', async (req, res) => {
  try{
    const dados = await db.getTable('keyboards');
    res.json(dados);
  } catch(error){res.status(500).json({error: "falha ao acessar db"})}
  });

app.get('/mouses', async (req, res) => {
  try{
    const dados = await db.getTable('mice');
    res.json(dados);
  } catch(error){res.status(500).json({error: "falha ao acessar db"})}
});

app.get('/earphones', async (req, res) => {
  try{
    const dados = await db.getTable('earphones');
    res.json(dados);
  } catch(error){res.status(500).json({error: "falha ao acessar db"})}
});

app.get('/usbflash', async (req, res) => {
  try{
    const dados = await db.getTable('usb_flash_drives');
    res.json(dados);
  } catch(error){res.status(500).json({error: "falha ao acessar db"})}
});

app.get('/speakers', async (req, res) => {
  try{
    const dados = await db.getTable('speakers');
    res.json(dados);
  } catch(error){res.status(500).json({error: "falha ao acessar db"})}
});