const Product = require('./Product.js')

class Earphone extends Product{
    constructor(){
        super()

        // string
        this.connection = null
        this.channels = null

        // int
        this.battery = null
        
        // boolean
        this.mic = null
        this.waterproof = null
    }

    // setters
    setConnection(connection){this.connection = connection}
    setChannels(channels){this.channels = channels}
    setBattery(battery){this.battery = battery}
    setMic(mic){this.mic = mic}
    setWaterproof(waterproof){this.waterproof = waterproof}

    // getters
    getConnection(){return this.connection}
    getChannels(){return this.channels}
    getBattery(){return this.battery}
    getMic(){return this.mic}
    getWaterproof(){return this.waterproof}

    load = async()=>{// load from database
        await this.loadProduct()
        const [info] = await db.getRow('earphones',{'id':this.id})
        this.connection = info[0]['connection']
        this.channels = info[0]['channels']
        this.battery = info[0]['battery']
        this.mic = info[0]['microphone']
        this.waterproof = info[0]['waterproof']
    }

    save = async()=>{// save new product to database
        await this.saveProduct('earphones')
        await db.insertRow(
            'earphones',{
                'id':this.id,
                'connection':this.connection,
                'channels':this.channels,
                'battery':this.battery,
                'microphone':this.mic,
                'waterproof':this.waterproof
            }
        )
    }

    async drop(){// delete earphone
        const db = require('../db/db.js')
        await db.deleteRow('earphones',{'id':this.id})
        await this.dropProduct()
        this.connection = null
        this.channels = null
        this.battery = null
        this.mic = null
        this.waterproof = null
    }

    async update(info){// update earphone info={'column':value} in database
        const db = require('../db/db.js')
        await db.updateCell('earphones',{'id':this.id},info)
    }
}

module.exports = Earphone