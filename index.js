(async()=>{
    const db = require('./db.js')
    const products = await db.getTable('products')
    console.log(products)
    const signup = await db.newUser({login:'User1',password:'@pAs/_1%'})
})()