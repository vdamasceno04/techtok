const express = require('express')
const db = require("../../db/db.js")
const router = express.Router()
const path = require('path')

// Route to get all products
router.get('/products', async (req, res) => {
  try {
    const dados = await db.getTable('products')
    res.json(dados)
  } catch(error) {
    res.status(500).json({error: "Failed to access database"})
  }
})

// Route to get products by category
router.get('/products/:category', async (req, res) => {
  try {
    const dados = await db.getRow('products', 'category', req.params.category)
    res.json(dados)
  } catch(error) {
    res.status(500).json({error: "Failed to access database"})
  }
})

// Route to get product image
router.get('/images/:filename', (req, res) => {
  const filePath = path.join(__dirname, '../../imgs', req.params.filename)
  res.sendFile(filePath, (err) => {
    if(err) {
      console.error(err)
      res.status(404).send('File not found')
    }
  })
})

module.exports = router
