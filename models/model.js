class Model{
    constructor(){
        // int
        this.id = null
    }

    // setters
    setId(id){this.id = id}

    // getters
    getId(){return this.id}

    idToJson(){
        return {
            'id':this.id
        }
    }

    /**
     * Generate an ID for the specified type.
     *
     * @param {String} type - The name of table to generate an ID for ('products' or 'users').
     * @return {Promise} The generated ID.
     */
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

    /**
     * Deletes the ID associated with this object.
     *
     * @return {Promise<void>} A promise that resolves when the ID is successfully deleted.
     */
    async dropId(){// delete id
        const db = require('../db/db.js')
        await db.deleteRow('ids',{'id':this.id})
        this.id = null
    }
}

module.exports = Model