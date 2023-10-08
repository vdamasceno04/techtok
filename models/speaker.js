const Product = require('./product.js')

class Speaker extends Product{
    constructor(){
        super()

        // string
        this.source = null
        this.channels = null
        this.audioInput = null

        // int
        this.power = null
        this.battery = null
    }

    // setters
    setSource(source){this.source = source}
    setChannels(channels){this.channels = channels}
    setAudioInput(audioInput){this.audioInput = audioInput}
    setPower(power){this.power = power}
    setBattery(battery){this.battery = battery}

    // getters
    getSource(){return this.source}
    getChannels(){return this.channels}
    getAudioInput(){return this.audioInput}
    getPower(){return this.power}
    getBattery(){return this.battery}

    async load(){// load from database
        const db = require('../db/db.js')
        await this.loadProduct()
        const [info] = await db.getRow('speakers',{'id':this.id})
        this.source = info[0]['source']
        this.channels = info[0]['channels']
        this.audioInput = info[0]['audio_input']
        this.power = info[0]['power']
        this.battery = info[0]['battery']
    }

    async save(){// save new product to database
        const db = require('../db/db.js')
        await this.saveProduct('speakers')
        await db.insertRow(
            'speakers',{
                'id':this.id,
                'source':this.source,
                'channels':this.channels,
                'audio_input':this.audioInput,
                'power':this.power,
                'battery':this.battery
            }
        )
    }

    async drop(){// delete speaker
        const db = require('../db/db.js')
        await db.deleteRow('speakers',{'id':this.id})
        await this.dropProduct()
        this.source = null
        this.channels = null
        this.audioInput = null
        this.power = null
        this.battery = null
    }

    async update(info){// update speaker info={'column':value} in database
        const db = require('../db/db.js')
        await db.updateCell('speakers',{'id':this.id},info)
    }
}

module.exports = Speaker