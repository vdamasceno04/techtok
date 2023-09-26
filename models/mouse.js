const Product = require('./product.js')

class Mouse extends Product{
    constructor(){
        super()

        // string
        this.connection = null
        this.led = null

        // int
        this.buttons = null
        this.battery = null
        this.dpi = null
    }

    // settters
    setConnection(connection){this.connection = connection}
    setLed(led){this.led = led}
    setButtons(buttons){this.buttons = buttons}
    setBattery(battery){this.battery = battery}
    setDpi(dpi){this.dpi = dpi}

    // getters
    getConnection(){return this.connection}
    getLed(){return this.led}
    getButtons(){return this.buttons}
    getBattery(){return this.battery}
    getDpi(){return this.dpi}

    async load(){// load from database
        await this.loadProduct()
        const [info] = await db.getRow('mice',{'id':this.id})
        this.connection = info[0]['connection']
        this.led = info[0]['led']
        this.buttons = info[0]['buttons']
        this.battery = info[0]['battery']
        this.dpi = info[0]['dpi']
    }

    async save(){// save new product to database
        await this.saveProduct('mice')
        await db.insertRow(
            'mice',{
                'id':this.id,
                'connection':this.connection,
                'led':this.led,
                'buttons':this.buttons,
                'battery':this.battery,
                'dpi':this.dpi
            }
        )
    }

    async drop(){// delete mouse
        const db = require('../db/db.js')
        await db.deleteRow('mice',{'id':this.id})
        await this.dropProduct()
        this.connection = null
        this.led = null
        this.buttons = null
        this.battery = null
        this.dpi = null
    }

    async update(info){// update mouse info={'column':value} in database
        const db = require('../db/db.js')
        await db.updateCell('mice',{'id':this.id},info)
    }
}

module.exports = Mouse