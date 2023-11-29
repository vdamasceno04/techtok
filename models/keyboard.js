const Product = require('./Product.js')

class Keyboard extends Product{
    constructor(){
        super()

        // string
        this.connection = null
        this.layout = null
        this.keySwitch = null

        // int
        this.battery = null

        // boolean
        this.led = null
        this.numpad = null
    }

    // setters
    setConnection(connection){this.connection = connection}
    setLayout(layout){this.layout = layout}
    setKeySwitch(keySwitch){this.keySwitch = keySwitch}
    setBattery(battery){this.battery = battery}
    setLed(led){this.led = led}
    setNumpad(numpad){this.numpad = numpad}    

    // getters
    getConnection(){return this.connection}
    getLayout(){return this.layout}
    getKeySwitch(){return this.keySwitch}
    getBattery(){return this.battery}
    getLed(){return this.led}
    getNumpad(){return this.numpad}

    toJson(){
        const productJson = productToJson()
        const keyboardJson = {
            'connection':this.connection,
            'layout':this.layout,
            'switch':this.keySwitch,
            'battery':this.battery,
            'led':this.led,
            'numpad':this.numpad
        }
        return Object.assign(productJson, keyboardJson)
    }

    /**
     * Load the keyboard from the database.
     *
     * @return {Promise<void>} The promise that resolves after the keyboard is loaded.
     */
    async load(){
        const db = require('../db/db.js')
        await this.loadProduct()
        const [info] = await db.getRow('keyboards',{'id':this.id})
        this.connection = info['connection']
        this.layout = info['layout']
        this.keySwitch = info['switch']
        this.battery = info['battery']
        this.led = info['led']
        this.numpad = info['numpad']
    }

    /**
     * Save new keyboard to the database.
     *
     * @return {Promise<void>} A Promise that resolves when the save operation is complete.
     */
    async save(){
        const db = require('../db/db.js')
        await this.saveProduct('keyboards')
        await db.insertRow(
            'keyboards',{
                'id':this.id,
                'connection':this.connection,
                'layout':this.layout,
                'switch':this.keySwitch,
                'battery':this.battery,
                'led':this.led,
                'numpad':this.numpad
            }
        )
    }

    /**
     * Deletes the keyboard.
     *
     * @return {Promise<void>} A promise that resolves when the keyboard is deleted.
     */
    async drop(){
        const db = require('../db/db.js')
        await db.deleteRow('keyboards',{'id':this.id})
        await this.dropProduct()
        this.connection = null
        this.layout = null
        this.switch = null
        this.battery = null
        this.led = null
        this.numpad = null
    }
    
    /**
     * Update the keyboard information in the database.
     *
     * @param {Object} info - The updated keyboard information in the form of {'column': value}.
     * @return {Promise} - A promise that resolves when the update is complete.
     */
    async update(info){
        const db = require('../db/db.js')
        await db.updateCell('keyboards',{'id':this.id},info)
    }
}

module.exports = Keyboard