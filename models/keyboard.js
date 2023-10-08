const Product = require('./Product.js')

class Keyboard extends Product{
    constructor(){
        super()

        // string
        this.connection = null
        this.layout = null
        this.keySwitch = null

        // int
        this.battery = null

        // boolean
        this.led = null
        this.numpad = null
    }

    // setters
    setConnection(connection){this.connection = connection}
    setLayout(layout){this.layout = layout}
    setKeySwitch(keySwitch){this.keySwitch = keySwitch}
    setBattery(battery){this.battery = battery}
    setLed(led){this.led = led}
    setNumpad(numpad){this.numpad = numpad}    

    // getters
    getConnection(){return this.connection}
    getLayout(){return this.layout}
    getKeySwitch(){return this.keySwitch}
    getBattery(){return this.battery}
    getLed(){return this.led}
    getNumpad(){return this.numpad}

    async load(){// load from database
        const db = require('../db/db.js')
        await this.loadProduct()
        const [info] = await db.getRow('keyboards',{'id':this.id})
        this.connection = info[0]['connection']
        this.layout = info[0]['layout']
        this.keySwitch = info[0]['switch']
        this.battery = info[0]['battery']
        this.led = info[0]['led']
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
                'battery':this.battery,
                'led':this.led,
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
        this.battery = null
        this.led = null
        this.numpad = null
    }

    async update(info){// update keyboard info={'column':value} in database
        const db = require('../db/db.js')
        await db.updateCell('keyboards',{'id':this.id},info)
    }
}

module.exports = Keyboard