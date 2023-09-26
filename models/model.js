class Model{
    constructor(){
        // int
        this.id = null
    }

    // setters
    setId(id){this.id = id}

    // getters
    getId(){return this.id}

    async generateId(type){// generate id
        const db = require('../db/db.js')
        if(this.id == null){
            this.id = await db.insertRow(
                'ids',{
                    'type':type
                }
            )
        }
    }

    async dropId(){// delete id
        const db = require('../db/db.js')
        await db.deleteRow('ids',{'id':this.id})
        this.id = null
    }
}

module.exports = Model