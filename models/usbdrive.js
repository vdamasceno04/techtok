const Product = require('./product.js')

class Usbdrive extends Product{
    constructor(){
        super();

        this.size = -1
        this.writespeed = -1
        this.readspeed = -1
        this.usbtype = -1
        this.casing = null
        
    }
    getSize(){return this.size;}
    getWritespeed(){return this.writespeed;}
    getReadspeed(){return this.readspeed;}
    getUsbtype(){return this.usbtype;}
    getCasing(){return this.casing;}
}

module.exports = Usbdrive;