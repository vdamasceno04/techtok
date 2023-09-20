const Product = require('./product.js')

class Speaker extends Product{
    constructor(){
        super()

        // string
        this.connection = null
        this.channels = null
        this.protection = null

        // int
        this.battery = -1
        this.power = -1
    }

    // setters
    setConnection(connection){this.connection = connection}
    setChannels(channels){this.channels = channels}
    setProtection(protection){this.protection = protection}
    setBattery(battery){this.battery = battery}
    setPower(power){this.power = power}

    // getters
    getConnection(){return this.connection}
    getChannels(){return this.channels}
    getProtection(){return this.protection}
    getBattery(){return this.battery}
    getPower(){return this.power}
}

module.exports = Speaker