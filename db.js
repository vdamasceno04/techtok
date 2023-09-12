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
    const[entries] = await con.query('SELECT * FROM ' + table)
    return await entries
}

const newUser = async(user)=>{
    const con = await db()
    const insert = 'INSERT INTO users (login,password) VALUES (?,?)'
    const values = [user.login,user.password]
    await con.query(insert,values)
}

// const newProduct = async(type,product)=>{
//     const con = await db()
//     const insert = 'INSERT INTO ' + type + '(login,password) VALUES (?,?)'
//     const values = [product.a, product.b]
//     await con.query(insert,values)
// }

// const getProductInfo = async(type,id,info)=>{
//     const con = await db()
//     const insert = 'INSERT INTO ' + type + '(login,password) VALUES (?,?)'
//     const values = [product.a, product.b]
//     await con.query(insert,values)
// }

db()

module.exports = {getTable,newUser}