const Product = require('./Product.js')

class Mouse extends Product{
    constructor(){
        super()

        // string
        this.connection = null
        this.dpi = null

        // int
        this.buttons = null
        this.battery = null

        // boolean
        this.led = null
    }

    // settters
    setConnection(connection){this.connection = connection}
    setDpi(dpi){this.dpi = dpi}
    setButtons(buttons){this.buttons = buttons}
    setBattery(battery){this.battery = battery}
    setLed(led){this.led = led}

    // getters
    getConnection(){return this.connection}
    getDpi(){return this.dpi}
    getButtons(){return this.buttons}
    getBattery(){return this.battery}
    getLed(){return this.led}

    async load(){// load from database
        await this.loadProduct()
        const [info] = await db.getRow('mice',{'id':this.id})
        this.connection = info[0]['connection']
        this.dpi = info[0]['dpi']
        this.buttons = info[0]['buttons']
        this.battery = info[0]['battery']
        this.led = info[0]['led']
    }

    async save(){// save new product to database
        await this.saveProduct('mice')
        await db.insertRow(
            'mice',{
                'id':this.id,
                'connection':this.connection,
                'dpi':this.dpi,
                'buttons':this.buttons,
                'battery':this.battery,
                'led':this.led
            }
        )
    }

    async drop(){// delete mouse
        const db = require('../db/db.js')
        await db.deleteRow('mice',{'id':this.id})
        await this.dropProduct()
        this.connection = null
        this.dpi = null
        this.buttons = null
        this.battery = null
        this.led = null
    }

    async update(info){// update mouse info={'column':value} in database
        const db = require('../db/db.js')
        await db.updateCell('mice',{'id':this.id},info)
    }
}

module.exports = Mouse