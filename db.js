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
    //       console.error('Database connection failed: ' + err.stack)
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
    return await con.query('SELECT * FROM ' + table)
}

const newUser = async(user)=>{
    const con = await db()
    const sql = 'INSERT INTO usuarios (login,senha) VALUES (?,?)'
    const values = [user.login,user.password]
    await con.query(sql,values)
}

const getUser = async(user)=>{
    const con = await db()
    const sql = 'SELECT id FROM usuarios WHERE (login=?,senha=?)'
    values = [user.login,user.password]
    if(await con.query(sql,values) != null)
        return true
    return false
}

// const newProduct = async(product)=>{
//     const con = await db()
//     const sql = 'INSERT INTO ' + type + '(login,password) VALUES (?,?)'
//     const values = [product.a, product.b]
//     await con.query(sql,values)
// }

const getProductInfo = async(product)=>{
    const con = await db()
    return await con.query('SELECT * FROM ' + product.category + ' WHERE id=' + product.id)
}

module.exports = {getTable,newUser,getUser,getProductInfo}