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
        connectionLimit: 10,// Max simultaneous users connected
        connectTimeout: 10000,// ms
        idleTimeout: 180000,// ms
        waitForConnections: false,// Wait till connected to db?
        queueLimit: 5,// Max simultaneous users awaiting connection
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
    console.log('getTable')
    const sql = `SELECT * FROM ??;`
    const values = [table]
    console.log(sql)
    console.log(values)
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

const getRow = async(table, col, info)=>{// Return a row from database
    console.log('getRow')
    const sql = `SELECT * FROM ?? WHERE ??=?;`
    const values = [table, col, info]
    console.log(sql)
    console.log(values)
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

const getCell = async(table,match,info)=>{// Return a cell from database
    console.log('getCell')
    const sql = `SELECT ?? FROM ?? WHERE ??=?;`
    const values = [info,table,Object.keys(match)[0],Object.values(match)[0]]
    console.log(sql)
    console.log(values)
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

const deleteRow = async(table,match)=>{// Delete a row from database
    console.log('deleteRow')
    const sql = `DELETE FROM ?? WHERE ??=?;`
    const values = [table,Object.keys(match)[0],Object.values(match)[0]]
    console.log(sql)
    console.log(values)
    try{
        const con = await connectDb()
        await con.query(sql,values)
        await con.release()
        return true
    } catch(err) {
        console.error('Row not found: ' + err)
        return false
    }
}

const updateCell = async(table,match,info)=>{// Update cells in database
    console.log('updateCell')
    const entries = Object.entries(info)
    let values = [table]
    let sql = `UPDATE ?? SET `
    for(let i=0; i<Object.keys(info).length-1; i++){
        sql += `??=?, `
    }
    sql += `??=? WHERE ??=?;`
    for(const [key, value] of entries){
        values.push(key)
        values.push(value)
    }
    values.push(Object.keys(match)[0])
    values.push(Object.values(match)[0])
    console.log(sql)
    console.log(values)
    try{
        const con = await connectDb()
        await con.query(sql,values)
        await con.release()
        return true
    } catch(err) {
        console.error('Cell not found: ' + err)
        return false
    }
}

const insertRow = async(table,info)=>{
    console.log('insertRow')
    const entries = Object.entries(info)
    let values = [table]
    let sql = `INSERT INTO ??(`
    for(let i=0; i<Object.keys(info).length-1; i++){
        sql += `??,`
    }
    sql += `??) VALUES (`
    for(let i=0; i<Object.keys(info).length-1; i++){
        sql += `?,`
    }
    sql += `?);`
    for(const [key, value] of entries){
        values.push(key)
    }
    for(const [key, value] of entries){
        values.push(value)
    }
    console.log(sql)
    console.log(values)
    try{
        const con = await connectDb()
        await con.query(sql,values)
        const [aux] = await con.query(`SELECT LAST_INSERT_ID() AS lastId;`)
        await con.release()
        return aux[0]['lastId']
    } catch(err) {
        console.error('Row not inserted: ' + err)
        return null
    }
}

const checkIfExists = async(table,info)=>{// Verify fields in database
    console.log('checkIfExists')
    const entries = Object.entries(info)
    let values = [table]
    let sql = `SELECT * FROM ?? WHERE `
    for(let i=0; i<Object.keys(info).length-1; i++){
        sql += `??=? AND `
    }
    sql += `??=?;`
    for(const [key, value] of entries){
        values.push(key)
        values.push(value)
    }
    console.log(sql)
    console.log(values)
    try{
        const con = await connectDb()
        const [data] = await con.query(sql,values)
        await con.release()
        return data.length > 0// True if user exists and password is correct
    } catch(err) {
        console.error('Info not found: ' + err)
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