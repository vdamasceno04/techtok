const express = require("express");
const cors = require('cors');
const db = require("../db/db.js")
const app = express();
const port = 3000;


app.use(cors());

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/products", (req,res) => {
   const products = [
     {
       id: 1,
       name: "hammer",
     },
     {
       id: 2,
       name: "screwdriver",
     },
     {
       id: 3,
       name: "wrench",
     }
   ];
   console.log("caiu na rota")
  res.json(products);
})

app.get('/dados', async (req, res) => {
    // Aqui, você pode buscar os dados de alguma fonte, como um banco de dados
    try{
      const dados = await db.getTable('keyboards'); // Substitua com sua própria lógica
      res.json(dados);
    } catch(error){res.status(500).json({error: "falha ao acessar db"})}
  });


app.listen(port, () => console.log(`Example app listening on port ${port}!`));