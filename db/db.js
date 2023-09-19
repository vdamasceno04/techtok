/* Database functions */

let connectionPool

const createConnectionPool = async()=>{
    const mysql = require('mysql2/promise')
    return mysql.createPool({// Pool to allow multiple simultaneous database users
        host: 'localhost',
        port: 3306,
        database: 'company',
        user: 'root',
        password: 'admin',
        connectionLimit: 10,// max users
        connectTimeout: 10000,// ms
        idleTimeout: 180000,// ms
        waitForConnections: false,// wait till connected to db?
        queueLimit: 5,// max awaiting connections
    })
}

const getConnection = async(pool)=>{
    return pool.getConnection()// Connect to database
}

const db = async()=>{// Connect to database
    try{
        if(global.connection && global.connection.state != 'disconnected'){
            return global.connection
        }
        if (!connectionPool){
            connectionPool = await createConnectionPool()
        }
        global.connection = await getConnection(connectionPool)
        console.log('Connected to database')
        return global.connection
    } catch(err) {
        console.error('Database connection failed: ' + err)
        return null
    }
}

const getTable = async(table)=>{// Return a table from database
    const sql = 'SELECT * FROM ??;'
    const values = [table]
    try{
        const con = await db()
        const [data] = await con.query(sql,values)
        return data
    } catch(err) {
        console.error('Table not found: ' + err)
        return null
    }
}

const getRow = async(info)=>{// Return a row from database
    const sql = 'SELECT * FROM ?? WHERE ??=?;'
    const values = [info.table,info.key,info.keyVal]
    try{
        const con = await db()
        const [data] = await con.query(sql,values)
        return data
    } catch(err) {
        console.error('Row not found: ' + err)
        return null
    }
}

const getCell = async(info)=>{// Return a cell from database
    const sql = 'SELECT ?? FROM ?? WHERE ??=?;'
    const values = [info.column,info.table,info.key,info.keyVal]
    try{
        const con = await db()
        const [data] = await con.query(sql,values)
        return data[0][info.column]
    } catch(err) {
        console.error('Cell not found: ' + err)
        return null
    }
}

const deleteRow = async(info)=>{// Delete a row from database
    const sql = 'DELETE FROM ?? WHERE ??=?;'
    const values = [info.table,info.key,info.keyVal]
    try{
        const con = await db()
        await con.query(sql,values)
    } catch(err) {
        console.error('Row not found: ' + err)
        return null
    }
}

const updateCell = async(info)=>{// Update a cell in database
    const sql = 'UPDATE ?? SET ??=? WHERE ??=?;'
    const values = [info.table,info.column,info.value,info.key,info.keyVal]
    try{
        const con = await db()
        await con.query(sql,values)
    } catch(err) {
        console.error('Cell not found: ' + err)
        return null
    }
}

const insertUser = async(user)=>{// Add an user to database
    const sql = 'INSERT INTO usuarios(login,senha) VALUES (?,?);'
    const values = [user.login,user.password]
    try{
        const con = await db()
        await con.query(sql,values)
        const [aux] = await con.query('SELECT LAST_INSERT_ID() AS lastId;')
        id = aux[0].lastId
        console.log(`User ${user.login} inserted into database with ID = ${id}`)
        return id
    } catch(err) {
        console.error('User not inserted: ' + err)
        return null
    }
}

const isUserExists = async(user)=>{// Verify an user from database
    const sql = 'SELECT id FROM usuarios WHERE login=? AND senha=?;'
    const values = [user.login,user.password]
    try{
        const con = await db()
        const [data] = await con.query(sql,values)
        return data.length > 0// True if user exists and password is correct
    } catch(err) {
        console.error('User not found: ' + err)
        return false
    }
}

const insertCaixaDeSom = async(product)=>{// Insert "caixa de som" into database
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
    try{
        const con = await db()
        await con.query(sql,values)
        const [aux] = await con.query('SELECT LAST_INSERT_ID() AS lastId;')
        const id = aux[0]['lastId']
        console.log(`Caixa de som ${product.marca} ${product.modelo} inserted into database with ID = ${id}`)
        return id
    } catch(err) {
        console.error('Caixa de som not inserted: ' + err)
        return null
    }
}

const insertFoneDeOuvido = async(product)=>{// Insert "fone de ouvido" into database
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
    try{
        const con = await db()
        await con.query(sql,values)
        const [aux] = await con.query('SELECT LAST_INSERT_ID() AS lastId;')
        const id = aux[0]['lastId']
        console.log(`Fone de ouvido ${product.marca} ${product.modelo} inserted into database with ID = ${id}`)
        return id
    } catch(err) {
        console.error('Fone de ouvido not inserted: ' + err)
        return null
    }
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
    try{
        const con = await db()
        await con.query(sql,values)
        const [aux] = await con.query('SELECT LAST_INSERT_ID() AS lastId;')
        const id = aux[0]['lastId']
        console.log(`Mouse ${product.marca} ${product.modelo} inserted into database with ID = ${id}`)
        return id
    } catch(err) {
        console.error('Mouse not inserted: ' + err)
        return null
    }
}

const insertPenDrive = async(product)=>{// Insert "pen drive" into database
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
    try{
        const con = await db()
        await con.query(sql,values)
        const [aux] = await con.query('SELECT LAST_INSERT_ID() AS lastId;')
        const id = aux[0]['lastId']
        console.log(`Pen drive ${product.marca} ${product.modelo} inserted into database with ID = ${id}`)
        return id
    } catch(err) {
        console.error('Mouse not inserted: ' + err)
        return null
    }
}

const insertTeclado = async(product)=>{// Insert "teclado" into database
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
    try{
        const con = await db()
        await con.query(sql,values)
        const [aux] = await con.query('SELECT LAST_INSERT_ID() AS lastId;')
        const id = aux[0]['lastId']
        console.log(`Teclado ${product.marca} ${product.modelo} inserted into database with ID = ${id}`)
        return id
    } catch(err) {
        console.error('Teclado not inserted: ' + err)
        return null
    }
}

module.exports = {
    getTable,
    getRow,
    getCell,
    deleteRow,
    updateCell,
    insertUser,
    isUserExists,
    insertCaixaDeSom,
    insertFoneDeOuvido,
    insertMouse,
    insertPenDrive,
    insertTeclado
}