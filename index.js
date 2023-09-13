(async()=>{
    const db = require('./db.js')
    signUp = await db.addUser({login:'User1',password:'@pAs/_1%'})
    table = await db.getTable('usuarios')
    console.log(table)
    fonesDeOuvido = await db.getRow({table:'fones_de_ouvido',id:1})
    console.log(fonesDeOuvido)
    penDrives = await db.getCell({table:'pen_drives',column:'estoque',id:1})
    console.log(penDrives)
})()