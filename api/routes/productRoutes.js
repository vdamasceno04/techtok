const express = require('express')
const db = require("../../db/db.js")
const router = express.Router()
const path = require('path')
const Product = require('../../models/Product.js')
const Earphone = require('../../models/Earphone.js')
const Keyboard = require('../../models/Keyboard.js')
const Mouse = require('../../models/Mouse.js')
const Speaker = require('../../models/Speaker.js')
const UsbFlashDrive = require('../../models/UsbFlashDrive.js')

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

// Route to get product by ID
router.get('/products', async (req, res) => {
  if (req.query.id && req.query.category) {
    try {
      let product;
      const category = req.query.category;
      if(category === 'earphones')
        product = new Earphones()
      else if(category === 'keyboards')
        product = new Keyboard()
      else if(category === 'mouses')
        product = new Mouse()
      else if(category === 'speakers')
        product = new Speaker()
      else if(category === 'usb_flash_drives')
        product = new UsbFlashDrive()
      else
        throw new Error('Invalid product category')
      product.setId(req.query.id)
      await product.load()
      res.json(product.toJson())
    } catch(error) {
      res.status(500).json({error: "Failed to access database"})
    }
  } else {
    try {
      const dados = await db.getTable('products')
      res.json(dados)
    } catch(error) {
      res.status(500).json({error: "Failed to access database"})
    }
  }
})

module.exports = router
