/* Script for database tests only */

(async()=>{
    const db = require('./db.js')
    const userLogin = 'User9'
    userId = await db.insertUser({login:userLogin,password:'@pAs/_1%'})
    console.log(await db.isUserExists({login:userLogin,password:'@pAs/_1%'}))
    await db.deleteRow({table:'users',key:'login',keyVal:userLogin})
    await db.deleteRow({table:'ids',key:'id',keyVal:userId})
    keyboardId = await db.insertProduct({
        category:'keyboards',
        brand:'Pichau',
        model:'P631K',
        description:'Teclado mecânico',
        price:400,
        stock:10,
        imgPath:'../imgs/keyboard.png',
        warranty:12
    })
    await db.updateCell({table:'keyboards',column:'led',value:'rgb',key:'id',keyVal:keyboardId})
    console.log(await db.getCell({table:'keyboards',column:'led',key:'id',keyVal:keyboardId}))
    console.log(await db.getRow({table:'keyboards',key:'id',keyVal:keyboardId}))
    await db.deleteRow({table:'keyboards',key:'id',keyVal:keyboardId})
    await db.deleteRow({table:'products',key:'id',keyVal:keyboardId})
    await db.deleteRow({table:'ids',key:'id',keyVal:keyboardId})
    console.log(await db.getTable('keyboards'))
    console.log(await db.getTable('products'))
    console.log(await db.getTable('ids'))
    process.exit(0)
})()