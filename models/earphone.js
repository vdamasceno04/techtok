const Product = require('./product.js')

class Earphone extends Product{
    constructor(){
        super()

        // string
        this.channels = null
        this.connection = null

        // int
        this.battery = -1
        this.power = -1
        
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
        this.loadProduct()
        const db = require('../db/db.js')
        const [info] = await db.getRow({table:'earphones',key:'id',keyVal:this.id})
        this.channels = info[0]['channels']
        this.connection = info[0]['connection']
        this.battery = info[0]['battery']
        this.power = info[0]['power']
        this.mic = info[0]['microphone']
    }

    save = async()=>{// save new product to database
        this.saveProduct('earphones')
        const db = require('../db/db.js')
        await db.insertRow({
            'earphones',{
                'id':this.id,
                'channels':this.channels,
                'connection':this.connection,
                'battery':this.battery,
                'power':this.power,
                'microphone':this.mic
            }
        })
    }
}

module.exports = Earphone