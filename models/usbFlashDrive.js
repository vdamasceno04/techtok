const Product = require('./product.js')

class UsbFlashDrive extends Product{
    constructor(){
        super();

        this.capacity = -1
        this.writeSpeed = -1
        this.readSpeed = -1
        this.usbType = null
    }
    getCapacity(){return this.capacity}
    getWriteSpeed(){return this.writeSpeed}
    getReadSpeed(){return this.readSpeed}
    getUsbType(){return this.usbType}
}

module.exports = UsbFlashDrive