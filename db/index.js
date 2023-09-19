/* Script for database tests only */

(async()=>{
    const db = require('./db.js')
    userId = await db.insertUser({login:'User9',password:'@pAs/_1%'})
    userExists = await db.isUserExists({login:'User9',password:'@pAs/_1%'})
    console.log(userExists)
    await db.deleteRow({table:'users',key:'id',keyVal:userId})
    idTeclado = await db.insertProduct({
        category:'keyboards',
        brand:'Pichau',
        model:'P631K',
        description:'Teclado mecânico',
        price:400,
        stock:10,
        imgpath:'../imgs/keyboard.png',
        warranty:12
    })
    await db.updateCell({table:'keyboards',column:'led',value:'rgb',key:'id',keyVal:idTeclado})
    console.log(await db.getCell({table:'keyboards',column:'led',key:'id',keyVal:idTeclado}))
    console.log(await db.getRow({table:'keyboards',key:'id',keyVal:idTeclado}))
    await db.deleteRow({table:'keyboards',key:'id',keyVal:idTeclado})
    await db.deleteRow({table:'products',key:'id',keyVal:idTeclado})
    console.log(await db.getTable('keyboards'))
    console.log(await db.getTable('products'))
})()