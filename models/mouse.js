const Product = require('./product.js')

class Mouse extends Product{
    constructor(){
        super()

        // string
        this.connection = null
        this.led = null

        // int
        this.buttons = -1
        this.battery = -1
        this.dpi = -1
        
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

    load = async()=>{// load from database
        this.loadProduct()
        const [info] = await db.getRow({table:'mouses',key:'id',keyVal:this.id})
        this.connection = info[0]['connection']
        this.led = info[0]['led']
        this.buttons = info[0]['buttons']
        this.battery = info[0]['battery']
        this.dpi = info[0]['dpi']
    }

    save = async()=>{// save new product to database
        this.saveProduct('mouses')
        await db.insertRow({
            'mouses',{
                'id':this.id,
                'connection':this.connection,
                'led':this.led,
                'buttons':this.buttons,
                'battery':this.battery,
                'dpi':this.dpi
            }
        })
    }
}

module.exports = Mouse