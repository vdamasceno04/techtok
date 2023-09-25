class Model{
    constructor(){
        // int
        this.id = -1
    }

    static db = require('../db/db.js')

    // setters
    setId(id){this.id = id}

    // getters
    getId(){return this.id}

    async generateId(type){// generate id
        if(this.id < 0){
            this.id = await this.db.insertRow(
                'ids',{
                    'type':type
                }
            )
        }
    }

    async update(info){// update info in database
        await this.db.updateCell({
            table:info.table,
            column:info.column,
            value:info.value,
            key:'id',
            keyVal:this.id
        })
    }
}

module.exports = Model