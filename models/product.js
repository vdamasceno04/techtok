/*provavelmente puxar o id de cada um
dos produtos de uma tabela e enviá-lo na construtora
das instancias dos produtos seja o melhor jeito
de instanciar tudo*/

const Model = require('./Model.js')

class Product extends Model{ 
    constructor() {
        super()

        // string
        this.brand = null
        this.model = null
        this.description = null
        this.imgPath = null

        // float
        this.price = null

        // int
        this.warranty = null
        this.stock = null
    }

    // setters
    setBrand(brand){this.brand = brand}
    setModel(model){this.model = model}
    setDescription(description){this.description = description}
    setImgPath(imgPath){this.imgPath = imgPath}
    setPrice(price){this.price = price}
    setWarranty(warranty){this.warranty = warranty}
    setStock(stock){this.stock = stock}

    // getters
    getBrand(){return this.brand}
    getModel(){return this.model}
    getDescription(){return this.description}
    getImgPath(){return this.imgPath}
    getPrice(){return this.price}
    getWarranty(){return this.warranty}
    getStock(){return this.stock}

    productToJson(){
        const idJson = idToJson()
        const productJson = {
            'brand':this.brand,
            'model':this.model,
            'description':this.description,
            'image_path':this.imgPath,
            'price':this.price,
            'warranty':this.warranty,
            'stock':this.stock
        }
        return Object.assign(idJson, productJson)
    }

    /**
     * Load the common product information from the database.
     *
     * @return {Promise<void>} A promise that resolves once the common product information is loaded.
     */
    async loadProd(){// load common info from database
        const [info] = await db.getRow('products',{'id':this.id})
        this.brand = info['brand']
        this.model = info['model']
        this.description = info['stock']
        this.imgPath = info['image_path']
        this.price = info['price']
        this.warranty = info['warranty']
        this.stock = info['stock']
    }

    /**
     * Save new common product to database.
     *
     * @param {String} category - The category of the product.
     * @return {Promise<void>} - Promise that resolves when the save operation is complete
     */
    async saveProd(category){
        const db = require('../db/db.js')
        await this.generateId('product')
        await db.insertRow(
            'products',{
                'id':this.id,
                'category':category,
                'brand':this.brand,
                'model':this.model,
                'description':this.description,
                'image_path':this.imgPath,
                'price':this.price,
                'warranty':this.warranty,
                'stock':this.stock
            }
        )
    }

    /**
     * Deletes the common product from the database.
     *
     * @return {Promise<void>} Promise that resolves when the common product is deleted.
     */
    async dropProd(){
        const db = require('../db/db.js')
        await db.deleteRow('products',{'id':this.id})
        await this.dropId()
        this.brand = null
        this.model = null
        this.description = null
        this.imgPath = null
        this.price = null
        this.warranty = null
        this.stock = null
    }

    /**
     * Updates the common product information in the database.
     *
     * @param {Object} info - The updated common product information in the form of {'column': value}.
     * @return {Promise} - A promise that resolves when the common product information is successfully updated.
     */
    async updateProd(info){
        const db = require('../db/db.js')
        await db.updateCell('products',{'id':this.id},info)
    }
}

module.exports = Product