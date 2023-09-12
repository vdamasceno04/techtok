const Product = require('./product.js')

class Speaker extends Product{
    constructor(){
        super();

        this.wireless = -1
        this.battery = -1
        this.bluetooth = false
        this.stereo = false
        this.usbinput = false
        this.power = -1
    }
}

module.exports = Speaker;