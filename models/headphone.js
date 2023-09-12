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
}

module.exports = Earphone;