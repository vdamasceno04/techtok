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
    }
}

const insertUser = async(user)=>{// Add an user to database
    const sql = 'INSERT INTO users(login,password) VALUES (?,?);'
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
        return -1
    }
}

const isUserExists = async(user)=>{// Verify an user from database
    const sql = 'SELECT id FROM users WHERE login=? AND password=?;'
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

const insertProduct = async(product)=>{// Insert product into database
    const sql = `INSERT INTO products(
            category,
            brand,
            model,
            stock,
            price,
            image_path,
            description,
            warranty
        ) VALUES (?,?,?,?,?,?,?,?);`
    const values = [
        product.category,
        product.brand,
        product.model,
        product.stock,
        product.price,
        product.imgpath,
        product.description,
        product.warranty
    ]
    const sql2 = 'SELECT LAST_INSERT_ID() AS lastId;'
    const sql3 = 'INSERT INTO ??(id) VALUES (?);'
    try{
        const con = await db()
        await con.query(sql,values)
        const [aux] = await con.query(sql2)
        const id = aux[0]['lastId']
        const values3 = [product.category,id]
        await con.query(sql3,values3)
        console.log(`${product.brand} ${product.model} inserted into database with ID = ${id}`)
        return id
    } catch(err) {
        console.error('Product not inserted: ' + err)
        return -1
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
    insertProduct
}