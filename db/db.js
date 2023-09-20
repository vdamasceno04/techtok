/* Database functions */
/* TODO: 
receber quantidade de campos e um array de maps por parâmetro
para tornar as funções insert, update e delete mais genéricas
remover funções específicas de User e Product daqui
*/

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

const insertRow = async(table,info)=>{
    sql = 'INSERT INTO ??('
    values = [table]
    info.foreach((value,key)=>{
        values.push(key)
    })
    info.foreach((value,key)=>{
        values.push(value)
    })
    for(let i=0; i<info.length-1; i++){
        sql += '??,'
    }
    sql += '??) VALUES ('
    for(let i=0; i<info.length-1; i++){
        sql += '?,'
    }
    sql += '?);'
    try{
        const con = await connectDb()
        await con.query(sql,values)
        await con.release()
    } catch(err) {
        console.error('Row not inserted: ' + err)
    }
}

const checkIfExists = async(table,info)=>{// Verify fields in database
    const sql = 'SELECT * FROM ?? WHERE '
    values = [table]
    data.forEach((value,key)=>{
        values.push(key)
        values.push(value)
    })
    for(let i=0; i<info.length-1){
        sql += '??=? AND '
    }
    sql += '??=?;'
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

module.exports = {
    getTable,
    getRow,
    getCell,
    deleteRow,
    updateCell,
    insertRow,
    checkIfExists
}