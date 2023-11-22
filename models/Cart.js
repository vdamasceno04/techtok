class Cart extends Customer{
    constructor(){
        super()
    }

    // insertIntoCart(productId,quantity){// insert into cart array
    //     const entries = Object.entries(info)
    //     for(const [key, value] of entries){
    //         if(key == productId){
    //             this.info[key] = quantity
    //             return
    //         }
    //     }
    //     this.cart.push({productId:quantity})
    // }
    
    // removeFromCart(productId){// remove from cart array
    //     const entries = Object.entries(this.cart)
    //     for(const [key, value] of entries){
    //         if(key == productId){
    //             delete this.info[key]
    //             return
    //         }
    //     }
    // }

    // clearCart(){this.cart = []}// clear cart array

    // async loadCart(){// load cart database into cart array
    //     const db = require('../db/db.js')
    //     this.clearCart()
    //     const entries = Object.entries(await db.getRow('carts',{'user_id':this.id}))
    //     for(const element of entries){
    //         this.cart.push({element['product_id']:element['quantity']})
    //     }
    // }

    // async saveCart(){// save cart array to cart database
    //     const db = require('../db/db.js')
    //     await this.dropCart()
    //     const entries = Object.entries(this.cart)
    //     for(const [key, value] of entries){
    //         await db.insertRow('carts',{'user_id':this.id,'product_id':key,'quantity':value})
    //     }
    // }

    // async dropCart(){// delete user's cart from database
    //     const db = require('../db/db.js')
    //     await db.deleteRow('carts',{'user_id':this.id})
    // }
}