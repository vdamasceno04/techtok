const Product = require('./product.js')

class Keyboard extends Product{
    constructor(){
        super()

        // string
        this.connection = null
        this.layout = null
        this.switch = null
        this.led = null

        // int
        this.battery = -1

        // boolean
        this.numpad = false
    }

    // setters
    setConnection(connection){this.connection = connection}
    setLayout(layout){this.layout = layout}
    setSwitch(switch){this.switch = switch}
    setLed(led){this.led = led}
    setBattery(battery){this.battery = battery}
    setNumpad(numpad){this.numpad = numpad}    

    // getters
    getConnection(){return this.connection}
    getLayout(){return this.layout}
    getSwitch(){return this.switch}
    getLed(){return this.led}
    getBattery(){return this.battery}
    getNumpad(){return this.numpad}

    load = async()=>{// load from database
        this.loadProduct()
        const db = require('../db/db.js')
        const [info] = await db.getRow({table:'keyboards',key:'id',keyVal:this.id})
        this.connection = info[0]['connection']
        this.layout = info[0]['layout']
        this.switch = info[0]['switch']
        this.led = info[0]['led']
        this.battery = info[0]['battery']
        this.numpad = info[0]['numpad']
    }

    save = async()=>{// save new product to database
        this.saveProduct('keyboards')
        const db = require('../db/db.js')
        await db.insertRow({
            'keyboards',{
                'id':this.id,
                'connection':this.connection,
                'layout':this.layout,
                'switch':this.switch,
                'led':this.led,
                'battery':this.battery,
                'numpad':this.numpad
            }
        })
    }
}

module.exports = Keyboard