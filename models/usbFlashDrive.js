const Product = require('./product.js')

class UsbFlashDrive extends Product{
    constructor(){
        super();

        // string
        this.usbType = null

        // int
        this.capacity = -1
        this.writeSpeed = -1
        this.readSpeed = -1
    }

    // setters
    setUsbType(usbType){this.usbType = usbType}
    setCapacity(capacity){this.capacity = capacity}
    setWriteSpeed(writeSpeed){this.writeSpeed = writeSpeed}
    setReadSpeed(readSpeed){this.readSpeed = readSpeed}

    // getters
    getUsbType(){return this.usbType}
    getCapacity(){return this.capacity}
    getWriteSpeed(){return this.writeSpeed}
    getReadSpeed(){return this.readSpeed}
}

module.exports = UsbFlashDrive