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
        this.id = await db.insertRow({
            'ids',{
                'type':type
            }
        })
    }

    const update = async(info)=>{// update info in database
        const db = require('../db/db.js')
        await db.updateCell({
            table:info.table,
            column:info.column,
            value:info.value,
            key:'id',
            keyVal:this.id
        })
    }
}

module.exports = Model;