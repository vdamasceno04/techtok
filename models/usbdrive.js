const Product = require('./product.js')

class Usbdrive extends Product{
    constructor(){
        super();

        this.size = -1
        this.writespeed = -1
        this.readspeed = -1
        this.usbtype = -1
    }
}

module.exports = Usbdrive;