(async()=>{
    const db = require('./db.js')
    signup = await db.newUser({login:'User12',password:'@pAs/_1%'})
    table = await db.getTable('usuarios')
    console.log(table)
    fone = await db.getProductInfo({category:'fone',id:1})
    console.log(fone)
})()