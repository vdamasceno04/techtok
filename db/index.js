// Database tests
(async()=>{
    const db = require('./db.js')
    userId = await db.insertUser({login:'User9',password:'@pAs/_1%'})
    userExists = await db.isUserExists({login:'User9',password:'@pAs/_1%'})
    console.log(userExists)
    idTeclado = await db.insertTeclado({
        marca:'Pichau',
        modelo:'P631K',
        conexao:'USB 2.0',
        bateria:null,
        alcance:null,
        layout:'ABNT2',
        switch:'Cherry MX Brown',
        led:'RGB',
        descricao:'Teclado mecânico',
        preco:400,
        estoque:10,
        imagem:'./imgs/teclado.png'
    })
    console.log(idTeclado)
    estoque = await db.getCell({table:'teclados',column:'estoque',id:idTeclado})
    console.log(estoque)
    await db.updateCell({table:'teclados',column:'estoque',value:9,key:'id',keyVal:idTeclado})
    estoque = await db.getCell({table:'teclados',column:'estoque',id:idTeclado})
    console.log(estoque)
    teclado = await db.getRow({table:'teclados',key:'id',keyVal:idTeclado})
    console.log(teclado)
    await db.deleteRow({table:'teclados',key:'id',keyVal:idTeclado})
    teclados = await db.getTable('teclados')
    console.log(teclados)
})()