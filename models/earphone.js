const Product = require('./product.js')

class Earphone extends Product{
    constructor(){
        super()

        this.battery = -1
        this.connection = null
        this.channels = -1
        this.mic = false
        this.power = -1
    }
    getBattery(){return this.battery}
    getConnection(){return this.connection}
    getChannels(){return this.channels}
    getMic(){return this.mic}
    getPower(){return this.power}
}

module.exports = Earphone