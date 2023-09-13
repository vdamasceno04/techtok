const Product = require('./product.js')

class Mouse extends Product{
    constructor(){
        super();
        this.buttons = -1
        this.connection = null
        this.battery = -1
        this.dpi = null
        this.rgblighting = false
    }
    getButtons(){return this.buttons;}
    getConnection(){return this.connection;}
    getBattery(){return this.battery;}
    getDpi(){return this.dpi;}
    getRgb(){return this.rgblighting;}
}

module.exports = Mouse;