/* Database functions */

const db = async()=>{// Connect to database
    if(global.con && global.con.state != 'disconnected')
        return global.con
    const mysql = require('mysql2/promise')
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        database: 'company',
        user: 'root',
        password: 'admin',
    })
    connection.catch(err=>{
        if(err){
            console.error(`Database connection failed: ${err}`)
            return
        }
    })
    console.log('Connected to database')
    global.con = connection
    return con
}

const getTable = async(table)=>{// Return a table from database
    const con = await db()
    return await con.query(`SELECT * FROM ${table};`)
}

const getRow = async(info)=>{// Return a row from database
    const con = await db()
    return await con.query(`SELECT * FROM ${info.table} WHERE id=${info.id};`)
}

const getCell = async(info)=>{// Return a cell from database
    const con = await db()
    return await con.query(`SELECT ${info.column} FROM ${info.table} WHERE id=${info.id};`)
}

const deleteRow = async(info)=>{// Update a row in database
    const con = await db()
    await con.query(`DELETE FROM ${info.table} WHERE id=${info.id};`)
}

const updateCell = async(info)=>{// Update a cell in database
    const con = await db()
    await con.query(`UPDATE ${info.table} SET ${info.column}=${info.value} WHERE id=${info.id};`)
}

const insertUser = async(user)=>{// Add an user to database
    const con = await db()
    await con.query(`INSERT INTO usuarios(login,senha) VALUES (${user.login},${user.password});`)
    const aux = await con.query('SELECT LAST_INSERT_ID() AS lastId;')
    const id = JSON.parse(JSON.stringify(aux[0]))[0].lastId
    console.log(`User ${user.login} inserted into database with ID = ${id}`)
    return id
}

const isValidUser = async(user)=>{// Verify an user from database
    const con = await db()
    if(await con.query(`SELECT id FROM usuarios WHERE (login=${user.login},senha=${user.password});`) != null)
        return true
    return false
}

const insertCaixaDeSom = async(product)=>{// Insert "caixa de som" into database
    const con = await db()
    const sql = `INSERT INTO caixas_de_som(
        marca,
        modelo,
        bateria,
        conexao,
        potencia,
        protecao,
        led,
        descricao,
        preco,
        estoque,
        imagem
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?);`
    const values = [
        product.marca,
        product.modelo,
        product.bateria,
        product.conexao,
        product.potencia,
        product.protecao,
        product.led,
        product.descricao,
        product.preco,
        product.estoque,
        product.imagem
    ]
    await con.query(sql,values)
    const aux = await con.query('SELECT LAST_INSERT_ID() AS lastId;')
    const id = JSON.parse(JSON.stringify(aux[0]))[0].lastId
    console.log(`Caixa de som ${product.marca} ${product.modelo} inserted into database with ID = ${id}`)
    return id
}

const insertFoneDeOuvido = async(product)=>{// Insert "teclado" into database
    const con = await db()
    const sql = `INSERT INTO fones_de_ouvido(
        marca,
        modelo,
        conexao,
        bateria,
        tipo,
        audio,
        led,
        descricao,
        preco,
        estoque,
        imagem
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?);`
    const values = [
        product.marca,
        product.modelo,
        product.conexao,
        product.bateria,
        product.tipo,
        product.audio,
        product.led,
        product.descricao,
        product.preco,
        product.estoque,
        product.imagem
    ]
    await con.query(sql,values)
    const aux = await con.query('SELECT LAST_INSERT_ID() AS lastId;')
    const id = JSON.parse(JSON.stringify(aux[0]))[0].lastId
    console.log(`Fone de ouvido ${product.marca} ${product.modelo} inserted into database with ID = ${id}`)
    return id
}

const insertMouse = async(product)=>{// Insert "mouse" into database
    const con = await db()
    const sql = `INSERT INTO mouses(
        marca,
        modelo,
        botoes,
        conexao,
        bateria,
        dpi,
        led,
        descricao,
        preco,
        estoque,
        imagem
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?);`
    const values = [
        product.marca,
        product.modelo,
        product.botoes,
        product.conexao,
        product.bateria,
        product.dpi,
        product.led,
        product.descricao,
        product.preco,
        product.estoque,
        product.imagem
    ]
    await con.query(sql,values)
    const aux = await con.query('SELECT LAST_INSERT_ID() AS lastId;')
    const id = JSON.parse(JSON.stringify(aux[0]))[0].lastId
    console.log(`Mouse ${product.marca} ${product.modelo} inserted into database with ID = ${id}`)
    return id
}

const insertPenDrive = async(product)=>{// Insert "pen drive" into database
    const con = await db()
    const sql = `INSERT INTO pen_drives(
        marca,
        modelo,
        capacidade,
        conexao,
        leitura,
        escrita,
        descricao,
        preco,
        estoque,
        imagem
    ) VALUES (?,?,?,?,?,?,?,?,?,?);`
    const values = [
        product.marca,
        product.modelo,
        product.capacidade,
        product.conexao,
        product.leitura,
        product.escrita,
        product.descricao,
        product.preco,
        product.estoque,
        product.imagem
    ]
    await con.query(sql,values)
    const aux = await con.query('SELECT LAST_INSERT_ID() AS lastId;')
    const id = JSON.parse(JSON.stringify(aux[0]))[0].lastId
    console.log(`Pen drive ${product.marca} ${product.modelo} inserted into database with ID = ${id}`)
    return id
}

const insertTeclado = async(product)=>{// Insert "teclado" into database
    const con = await db()
    const sql = `INSERT INTO teclados(
        marca,
        modelo,
        conexao,
        bateria,
        alcance,
        layout,
        switch,
        led,
        descricao,
        preco,
        estoque,
        imagem
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);`
    const values = [
        product.marca,
        product.modelo,
        product.conexao,
        product.bateria,
        product.alcance,
        product.layout,
        product.switch,
        product.led,
        product.descricao,
        product.preco,
        product.estoque,
        product.imagem
    ]
    await con.query(sql,values)
    const aux = await con.query('SELECT LAST_INSERT_ID() AS lastId;')
    const id = JSON.parse(JSON.stringify(aux[0]))[0].lastId
    console.log(`Teclado ${product.marca} ${product.modelo} inserted into database with ID = ${id}`)
    return id
}

module.exports = {
    getTable,
    getRow,
    getCell,
    deleteRow,
    updateCell,
    insertUser,
    isValidUser,
    insertCaixaDeSom,
    insertFoneDeOuvido,
    insertMouse,
    insertPenDrive,
    insertTeclado
}