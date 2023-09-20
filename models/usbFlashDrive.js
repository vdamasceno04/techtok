const Product = require('./product.js')

class UsbFlashDrive extends Product{
    constructor(){
        super();

        // string
        this.usbType = null

        // int
        this.capacity = -1
        this.writeSpeed = -1
        this.readSpeed = -1
    }

    // setters
    setUsbType(usbType){this.usbType = usbType}
    setCapacity(capacity){this.capacity = capacity}
    setWriteSpeed(writeSpeed){this.writeSpeed = writeSpeed}
    setReadSpeed(readSpeed){this.readSpeed = readSpeed}

    // getters
    getUsbType(){return this.usbType}
    getCapacity(){return this.capacity}
    getWriteSpeed(){return this.writeSpeed}
    getReadSpeed(){return this.readSpeed}

    load = async()=>{// load from database
        this.loadProduct()
        const db = require('../db/db.js')
        const [info] = await db.getRow({table:'usb_flash_drives',key:'id',keyVal:this.id})
        this.usbType = info[0]['usb_type']
        this.capacity = info[0]['capacity']
        this.writeSpeed = info[0]['write_speed']
        this.readSpeed = info[0]['read_speed']
    }

    save = async()=>{// save new product to database
        this.saveProduct('usb_flash_drives')
        const db = require('../db/db.js')
        await db.insertRow({
            'usb_flash_drives',{
                'id':this.id,
                'usb_type':this.usbType,
                'capacity':this.capacity,
                'write_speed':this.writeSpeed,
                'read_speed':this.readSpeed
            }
        })
    }
}

module.exports = UsbFlashDrive