/*provavelmente puxar o id de cada um
dos produtos de uma tabela e enviá-lo na construtora
das instancias dos produtos seja o melhor jeito
de instanciar tudo*/

const Model = require('./model.js')

class Product extends Model{ 
    constructor() {
        super()

        this.imgPath = null
        this.price = -1
        this.brand = null
        this.model = null
        this.description = null
        this.warranty = -1
        this.stock = -1
        this.material = null
        this.size = null
    }

    getImgPath(){return this.imgPath}
    getModel(){return this.model}
    getPrice(){return this.price}
    getDescription(){return this.description}
    getBrand(){return this.brand}
    getWarranty(){return this.warranty}
    getStock(){return this.stock}
    getMaterial(){return this.material}
    getSize(){return this.size}
}

module.exports = Product