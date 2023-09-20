const Product = require('./product.js')

class Keyboard extends Product{
    constructor(){
        super()

        this.connection = null
        this.battery = -1
        this.numpad = false
        this.layout = null
        this.switch = null
        this.led = null
    }

    getConnection(){return this.connection}
    getBattery(){return this.battery}
    getNumpad(){return this.numpad}
    getLayout(){return this.layout}
    getSwitch(){return this.switch}
    getLed(){return this.led}
}

module.exports = Keyboard