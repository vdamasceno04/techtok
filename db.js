const db = async()=>{
    console.log('Connecting to DB...');
    if(global.con && global.con.state != 'disconnected'){
        console.log('Already connected to database')
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
    // connection.connect(err =>{
    //     if(err){
    //       console.error(`Database connection failed: ${err.stack}`)
    //       return
    //     }
    //     else{
            console.log('Connected to database')
            global.con = connection
            return con
    //     }
    // })
}

const getTable = async(table)=>{
    const con = await db()
    return await con.query(`SELECT * FROM ${table}`)
}

const addUser = async(user)=>{
    const con = await db()
    const sql = 'INSERT INTO usuarios(login,senha) VALUES (?,?)'
    const values = [user.login,user.password]
    await con.query(sql,values)
}

const isValidUser = async(user)=>{
    const con = await db()
    const sql = 'SELECT id FROM usuarios WHERE (login=?,senha=?)'
    values = [user.login,user.password]
    if(await con.query(sql,values) != null)
        return true
    return false
}

const getRow = async(info)=>{
    const con = await db()
    return await con.query(`SELECT * FROM ${info.table} WHERE id=${info.id}`)
}

const getCell = async(info)=>{
    const con = await db()
    return await con.query(`SELECT ${info.column} FROM ${info.table} WHERE id=${info.id}`)
}

// const addTeclado = async(product)=>{
//     const con = await db()
//     const sql = `INSERT INTO teclados(
//                  marca,
//                  modelo,

//                  ) VALUES (?,?,?,?,?)`
//     const values = [product.a, product.b]
//     await con.query(sql,values)
// }

module.exports = {
    getTable,
    getRow,
    getCell,
    addUser,
    isValidUser,
    addTeclado,
    addMouse,
    addPenDrive,
    addFoneDeOuvido,
    addCaixaDeSom
}