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
}

module.exports = Earphone