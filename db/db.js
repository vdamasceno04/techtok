/* Database functions */
require('dotenv').config()

let connectionPool

/**
 * Creates a connection pool to allow multiple simultaneous database users.
 *
 * @return {Promise<Pool>} A Promise that resolves to a Pool object representing the connection pool.
 */
const createConnectionPool = async()=>{
    const mysql = require('mysql2/promise')
    return mysql.createPool({// Pool to allow multiple simultaneous database users
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        connectionLimit: process.env.DB_CONNECTION_LIMIT,// Max simultaneous users connected
        connectTimeout: process.env.DB_CONNECT_TIMEOUT,// ms
        idleTimeout: process.env.DB_IDLE_TIMEOUT,// ms
        waitForConnections: process.env.DB_WAIT_FOR_CONNECTIONS,// Wait till connected to db?
        queueLimit: process.env.DB_QUEUE_LIMIT,// Max simultaneous users awaiting connection
    })
}

/**
 * Connects to the database.
 *
 * @param {Object} pool - The database connection pool.
 * @return {Promise<Object>} - A promise that resolves to a database connection.
 */
const getConnection = async(pool)=>{
    return pool.getConnection()// Connect to database
}

/**
 * Connects to the database.
 *
 * @return {Promise<Connection>} The connection to the database.
 */
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

/**
 * Returns a table from the database.
 *
 * @param {string} table - The name of the table to retrieve.
 * @return {Promise<Array>} - A promise that resolves to an array representing the table data.
 */
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

/**
 * Return a row from the database.
 *
 * @param {string} table - The name of the table.
 * @param {string} col - The name of the column.
 * @param {any} info - The value of the column to search for.
 * @return {Promise<any>} The data of the row if found, otherwise null.
 */
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

/**
 * Return a cell from database.
 *
 * @param {string} table - the name of the table to search
 * @param {object} match - an object containing the column name and the value to match
 * @param {object} info - an object containing the column name to return
 * @return {Promise<any>} the value of the cell
 */
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

/**
 * Delete a row from the database.
 *
 * @param {string} table - The name of the table.
 * @param {object} match - An object containing the column and value to match.
 * @return {boolean} - Returns true if the row is deleted successfully, otherwise false.
 */
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

/**
 * Update cells in database.
 *
 * @param {string} table - The table name.
 * @param {object} match - An object containing the match conditions.
 * @param {object} info - An object containing the new cell values.
 * @return {boolean} Returns true if the cells were successfully updated, false otherwise.
 */
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

/**
 * Inserts a new row into the specified table with the provided information.
 *
 * @param {string} table - The name of the table to insert the row into.
 * @param {object} info - An object containing the information for the new row.
 * @return {number} The ID of the newly inserted row, or `null` if the row was not inserted.
 */
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

const insertProduct = async(info)=>{
    console.log('insertProduct')
    const entries = Object.entries(info) //req received
    const prodEntries = entries.slice(0, 8) //info to product table
    const specEntries = entries.slice(8) //info to specific category table
    var valuesP =[]
    var valuesS =[]

    let sqlP = `INSERT INTO products(category,
         brand, model, stock, price, description, image_path, warranty) VALUES(`
    sqlP += `?,?,?,?,?,?,?,?);`
    
    let sqlS = `INSERT INTO ??(id,`
    for(let i=0; i<specEntries.length-1; i++)
        sqlS += `??,`
    sqlS += `??) VALUES (LAST_INSERT_ID(),`
    for(let i=0; i<specEntries.length-1; i++)
        sqlS += `?,`
    sqlS += `?);`

    for(i=0; i<8; i++)
        valuesP.push(prodEntries[i][1])
    valuesS.push(prodEntries[0][1])
    for(i=0; i<specEntries.length; i++)
        valuesS.push(specEntries[i][0])
    for(i=0; i<specEntries.length; i++)
        valuesS.push(specEntries[i][1])

    console.log('prod= ', prodEntries)
    console.log('spec = ', specEntries)
    console.log('sqlP=   ' + sqlP)
    console.log('P=  ' + valuesP)
    console.log('sqlS=   ' + sqlS)
    console.log('S=   ' + valuesS)
    
    try{
        const con = await connectDb()
        con.beginTransaction(function(err){if(err){throw err;}})
        await con.query(sqlP,valuesP)
        await con.query(sqlS,valuesS)
        con.commit(function(err){
            if(err){return con.rollback(function(){throw err;})}}) 
    } catch(err) {
        console.error('Row not inserted: ' + err)
        return null
    }
}

/**
 * Verify fields in database.
 *
 * @param {string} table - the table to check in the database
 * @param {object} info - the fields to verify in the table
 * @return {boolean} true if the fields exist in the database, false otherwise
 */
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
    checkIfExists,
    insertProduct
}