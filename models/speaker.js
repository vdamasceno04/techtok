const Product = require('./product.js')

class Speaker extends Product{
    constructor(){
        super()

        // string
        this.connection = null
        this.channels = null
        this.protection = null

        // int
        this.battery = -1
        this.power = -1
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

    load = async()=>{// load from database
        this.loadProduct()
        const db = require('../db/db.js')
        const [info] = await db.getRow({table:'speakers',key:'id',keyVal:this.id})
        this.connection = info[0]['connection']
        this.channels = info[0]['channels']
        this.protection = info[0]['protection']
        this.battery = info[0]['battery']
        this.power = info[0]['power']
    }

    save = async()=>{// save new product to database
        this.saveProduct('speakers')
        const db = require('../db/db.js')
        await db.insertRows({
            table:'speakers',
            info:{
                'id':this.id,
                'connection':this.connection,
                'channels':this.channels,
                'protection':this.protection,
                'battery':this.battery,
                'power':this.power
            }
        })
    }
}

module.exports = Speaker