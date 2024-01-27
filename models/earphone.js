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

    toJson(){
        const productJson = productToJson()
        const earphoneJson = {
            'connection':this.connection,
            'channels':this.channels,
            'battery':this.battery,
            'microphone':this.mic,
            'waterproof':this.waterproof
        }
        return Object.assign(productJson, earphoneJson)
    }

    /**
     * Load the earphone information from the database.
     *
     * @return {Promise<void>} A promise that resolves once the earphone information is loaded.
     */
    async load(){
        await this.loadProduct()
        const [info] = await db.getRow('earphones',{'id':this.id})
        console.log(info)
        this.connection = info['connection']
        this.channels = info['channels']
        this.battery = info['battery']
        this.mic = info['microphone']
        this.waterproof = info['waterproof']
    }
    
    /**
     * Save new earphone to database.
     *
     * @return {Promise<void>} - Promise that resolves when the save operation is complete
     */
    async save(){
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

    /**
     * Deletes the earphone from the database.
     *
     * @return {Promise<void>} Promise that resolves when the earphone is deleted.
     */
    async drop(){
        const db = require('../db/db.js')
        await db.deleteRow('earphones',{'id':this.id})
        await this.dropProduct()
        this.connection = null
        this.channels = null
        this.battery = null
        this.mic = null
        this.waterproof = null
    }

    /**
     * Updates the earphone information in the database.
     *
     * @param {Object} info - The updated earphone information in the form of {'column': value}.
     * @return {Promise} - A promise that resolves when the earphone information is successfully updated.
     */
    async update(info){
        const db = require('../db/db.js')
        await db.updateCell('earphones',{'id':this.id},info)
    }
}

module.exports = Earphone