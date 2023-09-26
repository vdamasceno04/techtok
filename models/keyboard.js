const Product = require('./product.js')

class Keyboard extends Product{
    constructor(){
        super()

        // string
        this.connection = null
        this.layout = null
        this.keySwitch = null
        this.led = null

        // int
        this.battery = null

        // boolean
        this.numpad = false
    }

    // setters
    setConnection(connection){this.connection = connection}
    setLayout(layout){this.layout = layout}
    setKeySwitch(keySwitch){this.keySwitch = keySwitch}
    setLed(led){this.led = led}
    setBattery(battery){this.battery = battery}
    setNumpad(numpad){this.numpad = numpad}    

    // getters
    getConnection(){return this.connection}
    getLayout(){return this.layout}
    getKeySwitch(){return this.keySwitch}
    getLed(){return this.led}
    getBattery(){return this.battery}
    getNumpad(){return this.numpad}

    async load(){// load from database
        const db = require('../db/db.js')
        await this.loadProduct()
        const [info] = await db.getRow('keyboards',{'id':this.id})
        this.connection = info[0]['connection']
        this.layout = info[0]['layout']
        this.keySwitch = info[0]['switch']
        this.led = info[0]['led']
        this.battery = info[0]['battery']
        this.numpad = info[0]['numpad']
    }

    async save(){// save new product to database
        const db = require('../db/db.js')
        await this.saveProduct('keyboards')
        await db.insertRow(
            'keyboards',{
                'id':this.id,
                'connection':this.connection,
                'layout':this.layout,
                'switch':this.keySwitch,
                'led':this.led,
                'battery':this.battery,
                'numpad':this.numpad
            }
        )
    }

    async drop(){// delete keyboard
        const db = require('../db/db.js')
        await db.deleteRow('keyboards',{'id':this.id})
        await this.dropProduct()
        this.connection = null
        this.layout = null
        this.switch = null
        this.led = null
        this.battery = null
        this.numpad = false
    }

    async update(info){// update keyboard info={'column':value} in database
        const db = require('../db/db.js')
        await db.updateCell('keyboards',{'id':this.id},info)
    }
}

module.exports = Keyboard