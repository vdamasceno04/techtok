/* Script for database tests only */

(async()=>{
    const db = require('./db.js')
    const User = require('../models/user.js')
    const usr = new User()
    usr.setLogin('admn')
    usr.setPassword('123')
    usr.save()
    // console.log(db.checkIfExists('users',{
    //     'login':'admn',
    //     'password':'123'
    // }))
    // await db.deleteRow('users',{column:'login',value:usr.getLogin()})
    // await db.deleteRow('ids',{column:'id',value:usr.getId()})
//     keyboardId = await db.insertProduct({
//         category:'keyboards',
//         brand:'Pichau',
//         model:'P631K',
//         description:'Teclado mecânico',
//         price:400,
//         stock:10,
//         imgPath:'../imgs/keyboard.png',
//         warranty:12
//     })
//     await db.updateCell({table:'keyboards',column:'led',value:'rgb',key:'id',keyVal:keyboardId})
//     console.log(await db.getCell({table:'keyboards',column:'led',key:'id',keyVal:keyboardId}))
//     console.log(await db.getRow({table:'keyboards',key:'id',keyVal:keyboardId}))
//     await db.deleteRow({table:'keyboards',key:'id',keyVal:keyboardId})
//     await db.deleteRow({table:'products',key:'id',keyVal:keyboardId})
//     await db.deleteRow({table:'ids',key:'id',keyVal:keyboardId})
//     console.log(await db.getTable('keyboards'))
//     console.log(await db.getTable('products'))
//     console.log(await db.getTable('ids'))
    // process.exit(0)
})()