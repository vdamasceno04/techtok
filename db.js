const db = async()=>{
    console.log('Connecting to DB...');
    if(global.con && global.con.state != 'disconnected'){
        console.log('Already connected to DB')
        return global.con
    }
    const mysql = require('mysql2/promise')
    const connection = mysql.createConnection({
      host: 'localhost',
      port: 3306,
      database: 'company',
      user: 'root',
      password: 'admin',
    })
    console.log('Connected to DB')
    global.con = connection
    return con
}

const getTable = async(table)=>{
    const con = await db()
    const[entries] = await con.query('SELECT * FROM ' + table)
    return await entries
}

db()

module.exports = {getTable}