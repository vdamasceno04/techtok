const Product = require('./product.js')

class Keyboard extends Product{
    constructor(){
        super();

        this.connection = null
        this.battery = -1
        this.numericpad = false
        this.layout = null
        this.mechanical = false
    }

    getConnection(){return this.connection;}
    getBattery(){return this.battery;}
    getNumericpad(){return this.numericpad;}
    getLayout(){return this.layout}
    getMechanial(){return this.mechanical;}
}

module.exports = Keyboard;