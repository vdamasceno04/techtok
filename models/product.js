/*provavelmente puxar o id de cada um
dos produtos de uma tabela e enviá-lo na construtora
das instancias dos produtos seja o melhor jeito
de instanciar tudo*/

const Model = require('./model.js')

class Product extends Model{ 
    constructor() {
        super()

        // string
        this.brand = null
        this.model = null
        this.description = null
        this.imgPath = null
        this.material = null
        this.size = null

        // int
        this.price = -1
        this.warranty = -1
        this.stock = -1
    }

    // setters
    setBrand(brand){this.brand = brand}
    setModel(model){this.model = model}
    setDescription(description){this.description = description}
    setImgPath(imgPath){this.imgPath = imgPath}
    setMaterial(material){this.material = material}
    setSize(size){this.size = size}
    setPrice(price){this.price = price}
    setWarranty(warranty){this.warranty = warranty}
    setStock(stock){this.stock = stock}

    // getters
    getBrand(){return this.brand}
    getModel(){return this.model}
    getDescription(){return this.description}
    getImgPath(){return this.imgPath}
    getMaterial(){return this.material}
    getSize(){return this.size}
    getPrice(){return this.price}
    getWarranty(){return this.warranty}
    getStock(){return this.stock}
}

module.exports = Product