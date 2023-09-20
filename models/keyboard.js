const Product = require('./product.js')

class Keyboard extends Product{
    constructor(){
        super()

        // string
        this.connection = null
        this.layout = null
        this.switch = null
        this.led = null

        // int
        this.battery = -1

        // boolean
        this.numpad = false
    }

    // setters
    setConnection(connection){this.connection = connection}
    setLayout(layout){this.layout = layout}
    setSwitch(switch){this.switch = switch}
    setLed(led){this.led = led}
    setBattery(battery){this.battery = battery}
    setNumpad(numpad){this.numpad = numpad}    

    // getters
    getConnection(){return this.connection}
    getLayout(){return this.layout}
    getSwitch(){return this.switch}
    getLed(){return this.led}
    getBattery(){return this.battery}
    getNumpad(){return this.numpad}
}

module.exports = Keyboard