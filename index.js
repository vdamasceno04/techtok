(async()=>{
    const db = require('./db.js')
    const products = await db.getTable('products')
    console.log(products)
})()