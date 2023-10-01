function getCategory(url){
    param = new URLSearchParams(url)
    cat = param.get('cat') //should match db table name
    console.log(cat)
}

async function printTable(url){
    console.log("vai")
    const db = require('./db/db.js')
    tablename = getCategory(url)
    //const table = db.getTable(tablename)
    await console.log(db.getTable(tablename))
}