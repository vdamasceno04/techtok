const Product = require('./Product.js')

class Mouse extends Product{
    constructor(){
        super()

        // string
        this.connection = null
        this.dpi = null

        // int
        this.buttons = null
        this.battery = null

        // boolean
        this.led = null
    }

    // settters
    setConnection(connection){this.connection = connection}
    setDpi(dpi){this.dpi = dpi}
    setButtons(buttons){this.buttons = buttons}
    setBattery(battery){this.battery = battery}
    setLed(led){this.led = led}

    // getters
    getConnection(){return this.connection}
    getDpi(){return this.dpi}
    getButtons(){return this.buttons}
    getBattery(){return this.battery}
    getLed(){return this.led}

    toJson(){
        const productJson = productToJson()
        const mouseJson = {
            'connection':this.connection,
            'dpi':this.dpi,
            'buttons':this.buttons,
            'battery':this.battery,
            'led':this.led
        }
        return Object.assign(productJson, mouseJson)
    }

    /**
     * Load the mouse information from the database.
     *
     * @return {Promise<void>} A promise that resolves once the mouse information is loaded.
     */
    async load(){
        await this.loadProduct()
        const [info] = await db.getRow('mice',{'id':this.id})
        this.connection = info['connection']
        this.dpi = info['dpi']
        this.buttons = info['buttons']
        this.battery = info['battery']
        this.led = info['led']
    }

    /**
     * Save new mouse to database.
     *
     * @return {Promise<void>} - Promise that resolves when the save operation is complete
     */
    async save(){
        await this.saveProduct('mice')
        await db.insertRow(
            'mice',{
                'id':this.id,
                'connection':this.connection,
                'dpi':this.dpi,
                'buttons':this.buttons,
                'battery':this.battery,
                'led':this.led
            }
        )
    }

    /**
     * Deletes the mouse from the database.
     *
     * @return {Promise<void>} Promise that resolves when the mouse is deleted.
     */
    async drop(){
        const db = require('../db/db.js')
        await db.deleteRow('mice',{'id':this.id})
        await this.dropProduct()
        this.connection = null
        this.dpi = null
        this.buttons = null
        this.battery = null
        this.led = null
    }

    /**
     * Updates the mouse information in the database.
     *
     * @param {Object} info - The updated mouse information in the form of {'column': value}.
     * @return {Promise} - A promise that resolves when the mouse information is successfully updated.
     */
    async update(info){
        const db = require('../db/db.js')
        await db.updateCell('mice',{'id':this.id},info)
    }
}

module.exports = Mouse