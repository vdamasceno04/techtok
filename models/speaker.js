const Product = require('./product.js')

class Speaker extends Product{
    constructor(){
        super()

        this.connection = null
        this.battery = -1
        this.channels = null
        this.protection = null
        this.power = -1
    }

    getConnection(){return this.connection}
    getBattery(){return this.battery}
    getChannels(){return this.channels}
    getProtection(){return this.protection}
    getPower(){return this.power}
}

module.exports = Speaker