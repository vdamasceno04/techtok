const Product = require('./product.js')

class Earphone extends Product{
    constructor(){
        super();

        this.battery = -1
        this.connection = null
        this.stereo = false
        this.mic = false
        this.power = -1
    }
    getBattery(){return this.battery;}
    getConnection(){return this.connection;}
    getStereo(){return this.stereo;}
    getMic(){return this.mic;}
    getPower(){return this.power;}
}

module.exports = Earphone;