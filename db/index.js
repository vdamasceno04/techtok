// Database tests
(async()=>{
    const db = require('./db.js')
    // const userId = await db.insertUser({login:'User7',password:'@pAs/_1%'})
    const idTeclado = db.insertTeclado({
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
    estoque = await db.getCell({table:'teclados',column:'estoque',id:1})
    // console.log(estoque)
    teclado = await db.getRow({table:'teclados',id:1})
    // console.log(teclado)
    teclados = await db.getTable('teclados')
    // console.log(teclados)
})()