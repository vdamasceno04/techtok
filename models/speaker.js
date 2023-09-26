const Product = require('./product.js')

class Speaker extends Product{
    constructor(){
        super()

        // string
        this.connection = null
        this.channels = null
        this.protection = null

        // int
        this.battery = null
        this.power = null
    }

    // setters
    setConnection(connection){this.connection = connection}
    setChannels(channels){this.channels = channels}
    setProtection(protection){this.protection = protection}
    setBattery(battery){this.battery = battery}
    setPower(power){this.power = power}

    // getters
    getConnection(){return this.connection}
    getChannels(){return this.channels}
    getProtection(){return this.protection}
    getBattery(){return this.battery}
    getPower(){return this.power}

    async load(){// load from database
        const db = require('../db/db.js')
        await this.loadProduct()
        const [info] = await db.getRow('speakers',{'id':this.id})
        this.connection = info[0]['connection']
        this.channels = info[0]['channels']
        this.protection = info[0]['protection']
        this.battery = info[0]['battery']
        this.power = info[0]['power']
    }

    async save(){// save new product to database
        const db = require('../db/db.js')
        await this.saveProduct('speakers')
        await db.insertRow(
            'speakers',{
                'id':this.id,
                'connection':this.connection,
                'channels':this.channels,
                'protection':this.protection,
                'battery':this.battery,
                'power':this.power
            }
        )
    }

    async drop(){// delete speaker
        const db = require('../db/db.js')
        await db.deleteRow('speakers',{'id':this.id})
        await this.dropProduct()
        this.connection = null
        this.channels = null
        this.protection = null
        this.battery = null
        this.power = null
    }

    async update(info){// update speaker info={'column':value} in database
        const db = require('../db/db.js')
        await db.updateCell('speakers',{'id':this.id},info)
    }
}

module.exports = Speaker