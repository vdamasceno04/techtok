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

    getWireless(){return this.wireless;}
    getBattery(){return this.battery;}
    getBluetooth(){return this.bluetooth;}
    getStereo(){return this.stereo;}
    getUsbinput(){return this.usbinput;}
    getPower(){return this.power;}
}

module.exports = Speaker;