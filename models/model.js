class Model{
    constructor(){
        // int
        this.id = -1
    }

    // setters
    setId(id){this.id = id}

    // getters
    getId(){return this.id}

    const generateId(type){// generate id
        this.id = await db.insertRows({
            'table':'ids',
            'type':type
        })
    }

    const update = async(table,key,info)=>{// update info in database
        const db = require('../db/db.js')
        await db.updateCells({
            qty:info.length,
            table:table,
            key:key.keyColumn,
            keyVal:key.keyVal,
            info
        })
    }
}

module.exports = Model;