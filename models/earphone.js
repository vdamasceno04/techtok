const Product = require('./Product.js')

class Earphone extends Product{
    constructor(){
        super()

        // string
        this.channels = null
        this.connection = null

        // int
        this.battery = null
        this.power = null
        
        // boolean
        this.mic = false
    }

    // setters
    setChannels(channels){this.channels = channels}
    setConnection(connection){this.connection = connection}
    setBattery(battery){this.battery = battery}
    setPower(power){this.power = power}
    setMic(mic){this.mic = mic}

    // getters
    getChannels(){return this.channels}
    getConnection(){return this.connection}
    getBattery(){return this.battery}
    getPower(){return this.power}
    getMic(){return this.mic}

    load = async()=>{// load from database
        await this.loadProduct()
        const [info] = await db.getRow('earphones',{'id':this.id})
        this.channels = info[0]['channels']
        this.connection = info[0]['connection']
        this.battery = info[0]['battery']
        this.power = info[0]['power']
        this.mic = info[0]['microphone']
    }

    save = async()=>{// save new product to database
        await this.saveProduct('earphones')
        await db.insertRow(
            'earphones',{
                'id':this.id,
                'channels':this.channels,
                'connection':this.connection,
                'battery':this.battery,
                'power':this.power,
                'microphone':this.mic
            }
        )
    }

    async drop(){// delete earphone
        const db = require('../db/db.js')
        await db.deleteRow('earphones',{'id':this.id})
        await this.dropProduct()
        this.channels = null
        this.connection = null
        this.battery = null
        this.power = null
        this.mic = false
    }

    async update(info){// update earphone info={'column':value} in database
        const db = require('../db/db.js')
        await db.updateCell('earphones',{'id':this.id},info)
    }
}

module.exports = Earphone