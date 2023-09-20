const Product = require('./product.js')

class Mouse extends Product{
    constructor(){
        super()

        // string
        this.connection = null
        this.led = null

        // int
        this.buttons = -1
        this.battery = -1
        this.dpi = -1
        
    }

    // settters
    setConnection(connection){this.connection = connection}
    setLed(led){this.led = led}
    setButtons(buttons){this.buttons = buttons}
    setBattery(battery){this.battery = battery}
    setDpi(dpi){this.dpi = dpi}

    // getters
    getConnection(){return this.connection}
    getLed(){return this.led}
    getButtons(){return this.buttons}
    getBattery(){return this.battery}
    getDpi(){return this.dpi}
}

module.exports = Mouse