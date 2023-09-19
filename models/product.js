/*provavelmente puxar o id de cada um
dos produtos de uma tabela e enviá-lo na construtora
das instancias dos produtos seja o melhor jeito
de instanciar tudo*/

class Product{ 
    constructor() {
        this.id = -1
        this.imgpath = null
        this.price = -1
        this.brand = null
        this.model = null
        this.description = null
        this.warranty = -1
        this.stock = -1
    }

    getId(){return this.id;}
    getImgPath(){return this.imgpath; }
    getModel(){return this.model;}
    getPrice(){return this.price;}
    getDescription(){return this.description;}
    getBrand(){return this.brand;}
    getWarranty(){return this.warranty;}
    getStock(){return this.stock;}
}
module.exports = Product;