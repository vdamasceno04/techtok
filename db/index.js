// Code for databse tests
(async()=>{
    const db = require('./db.js')
    signUp = await db.addUser({login:'User6',password:'@pAs/_1%'})
    table = await db.getTable('usuarios')
    console.log(table)
    db.addTeclado({
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
    teclados = await db.getRow({table:'teclados',id:1})
    console.log(teclados)
    estoque = await db.getCell({table:'teclados',column:'estoque',id:1})
    console.log(estoque)
})()