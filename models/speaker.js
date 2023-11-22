const Product = require('./Product.js')

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

    /**
     * Load the speaker information from the database.
     *
     * @return {Promise<void>} A promise that resolves once the speaker information is loaded.
     */
    async load(){
        const db = require('../db/db.js')
        await this.loadProduct()
        const [info] = await db.getRow('speakers',{'id':this.id})
        this.source = info[0]['source']
        this.channels = info[0]['channels']
        this.audioInput = info[0]['audio_input']
        this.power = info[0]['power']
        this.battery = info[0]['battery']
    }

    /**
     * Save new speaker to database.
     *
     * @return {Promise<void>} - Promise that resolves when the save operation is complete
     */
    async save(){
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

    /**
     * Deletes the speaker from the database.
     *
     * @return {Promise<void>} Promise that resolves when the speaker is deleted.
     */
    async drop(){
        const db = require('../db/db.js')
        await db.deleteRow('speakers',{'id':this.id})
        await this.dropProduct()
        this.source = null
        this.channels = null
        this.audioInput = null
        this.power = null
        this.battery = null
    }

    /**
     * Updates the speaker information in the database.
     *
     * @param {Object} info - The updated speaker information in the form of {'column': value}.
     * @return {Promise} - A promise that resolves when the speaker information is successfully updated.
     */
    async update(info){
        const db = require('../db/db.js')
        await db.updateCell('speakers',{'id':this.id},info)
    }
}

module.exports = Speaker