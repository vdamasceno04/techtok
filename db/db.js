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

const connectDb = async()=>{// Connect to database
    try{
        if(global.connection && global.connection.state != 'disconnected'){
            return global.connection
        }
        if (!connectionPool){
            connectionPool = await createConnectionPool()
        }
        global.connection = await getConnection(connectionPool)
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
        const con = await connectDb()
        const [data] = await con.query(sql,values)
        await con.release()
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
        const con = await connectDb()
        const [data] = await con.query(sql,values)
        await con.release()
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
        const con = await connectDb()
        const [data] = await con.query(sql,values)
        await con.release()
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
        const con = await connectDb()
        await con.query(sql,values)
        await con.release()
    } catch(err) {
        console.error('Row not found: ' + err)
    }
}

const updateCell = async(info)=>{// Update a cell in database
    const sql = 'UPDATE ?? SET ??=? WHERE ??=?;'
    const values = [info.table,info.column,info.value,info.key,info.keyVal]
    try{
        const con = await connectDb()
        await con.query(sql,values)
        await con.release()
    } catch(err) {
        console.error('Cell not found: ' + err)
    }
}

const insertUser = async(user)=>{// Add an user to database
    const sql0 = `INSERT INTO ids(type) VALUES ('user');`
    const sql1 = 'SELECT LAST_INSERT_ID() AS lastId;'
    const sql2 = 'INSERT INTO users(id,login,password) VALUES (?,?,?);'
    try{
        const con = await connectDb()
        await con.query(sql0)
        const [aux] = await con.query(sql1)
        id = aux[0].lastId
        const values2 = [id,user.login,user.password]
        await con.query(sql2,values2)
        await con.release()
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
        const con = await connectDb()
        const [data] = await con.query(sql,values)
        await con.release()
        return data.length > 0// True if user exists and password is correct
    } catch(err) {
        console.error('User not found: ' + err)
        return false
    }
}

const insertProduct = async(product)=>{// Insert product into database
    const sql0 = `INSERT INTO ids(type) VALUES ('product');`
    const sql1 = 'SELECT LAST_INSERT_ID() AS lastId;'
    const sql2 = `INSERT INTO products(
        id,
        category,
        brand,
        model,
        stock,
        price,
        image_path,
        description,
        warranty,
        material,
        size
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?);`
    const sql3 = 'INSERT INTO ??(id) VALUES (?);'
    try{
        const con = await connectDb()
        await con.query(sql0)
        const [aux] = await con.query(sql1)
        const id = aux[0]['lastId']
        const values2 = [
            id,
            product.category,
            product.brand,
            product.model,
            product.stock,
            product.price,
            product.imgPath,
            product.description,
            product.warranty,
            product.material,
            product.size
        ]
        await con.query(sql2,values2)
        const values3 = [product.category,id]
        await con.query(sql3,values3)
        await con.release()
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