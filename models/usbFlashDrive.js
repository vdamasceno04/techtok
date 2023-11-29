const Product = require('./Product.js')

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

    toJson(){
        const productJson = productToJson()
        const usbFlashDriveJson = {
            'usb_type':this.usbType,
            'capacity':this.capacity,
            'write_speed':this.writeSpeed,
            'read_speed':this.readSpeed
        }
        return Object.assign(productJson, usbFlashDriveJson)
    }

    /**
     * Load the usbFlashDrive information from the database.
     *
     * @return {Promise<void>} A promise that resolves once the usbFlashDrive information is loaded.
     */
    async load(){
        const db = require('../db/db.js')
        await this.loadProduct()
        const [info] = await db.getRow('usb_flash_drives',{'id':this.id})
        this.usbType = info['usb_type']
        this.capacity = info['capacity']
        this.writeSpeed = info['write_speed']
        this.readSpeed = info['read_speed']
    }

    /**
     * Save new usbFlashDrive to database.
     *
     * @return {Promise<void>} - Promise that resolves when the save operation is complete
     */
    async save(){
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

    /**
     * Deletes the usbFlashDrive from the database.
     *
     * @return {Promise<void>} Promise that resolves when the usbFlashDrive is deleted.
     */
    async drop(){
        const db = require('../db/db.js')
        await db.deleteRow('usb_flash_drives',{'id':this.id})
        await this.dropProduct()
        this.usbType = null
        this.capacity = null
        this.writeSpeed = null
        this.readSpeed = null
    }

    /**
     * Updates the usbFlashDrive information in the database.
     *
     * @param {Object} info - The updated usbFlashDrive information in the form of {'column': value}.
     * @return {Promise} - A promise that resolves when the usbFlashDrive information is successfully updated.
     */
    async update(info){
        const db = require('../db/db.js')
        await db.updateCell('usb_flash_drives',{'id':this.id},info)
    }
}

module.exports = UsbFlashDrive