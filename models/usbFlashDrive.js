const Product = require('./product.js')

class UsbFlashDrive extends Product{
    constructor(){
        super();

        // string
        this.usbType = null

        // int
        this.capacity = null
        this.writeSpeed = null
        this.readSpeed = null
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

    async load(){// load from database
        const db = require('../db/db.js')
        await this.loadProduct()
        const [info] = await db.getRow('usb_flash_drives',{'id':this.id})
        this.usbType = info[0]['usb_type']
        this.capacity = info[0]['capacity']
        this.writeSpeed = info[0]['write_speed']
        this.readSpeed = info[0]['read_speed']
    }

    async save(){// save new product to database
        const db = require('../db/db.js')
        await this.saveProduct('usb_flash_drives')
        await db.insertRow(
            'usb_flash_drives',{
                'id':this.id,
                'usb_type':this.usbType,
                'capacity':this.capacity,
                'write_speed':this.writeSpeed,
                'read_speed':this.readSpeed
            }
        )
    }

    async drop(){// delete usbFlashDrive
        const db = require('../db/db.js')
        await db.deleteRow('usb_flash_drives',{'id':this.id})
        await this.dropProduct()
        this.usbType = null
        this.capacity = null
        this.writeSpeed = null
        this.readSpeed = null
    }

    async update(info){// update usbFlashDrive info={'column':value} in database
        const db = require('../db/db.js')
        await db.updateCell('usb_flash_drives',{'id':this.id},info)
    }
}

module.exports = UsbFlashDrive