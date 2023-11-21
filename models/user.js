const Model = require('./Model.js')

class User extends Model{
    constructor(
            login = null,
            password = null,
            name = null,
            email = null,
            superuser = null,
            cart = []
        ){
            super()

            // string
            this.login = login
            this.password = password
            this.name = name
            this.email = email

            // boolean
            this.superuser = superuser

            // array
            this.cart = cart
        }

    // setters
    setLogin(login){this.login = login}
    setPassword(password){this.password = password}
    setName(name){this.name = name}
    setEmail(email){this.email = email}
    setSuperuser(){this.superuser = superuser}

    // getters
    getLogin(){return this.login}
    getPassword(){return this.password}
    getName(){return this.name}
    getEmail(){return this.email}
    getSuperuser(){return this.superuser}

    async loadUser(){// load from database
        const db = require('../db/db.js')
        const [info] = await db.getRow('users',{'id':this.id})
        this.login = info[0]['login']
        this.password = info[0]['password']
        this.name = info[0]['name']
        this.email = info[0]['email']
        this.superuser = info[0]['superuser']
    }

    async saveUser(){// save new product to database
        const db = require('../db/db.js')
        await this.generateId('users')
        await db.insertRow(
            'users',{
                'id':this.id,
                'login':this.login,
                'password':this.password,
                'name':this.name,
                'email':this.email,
                'superuser':this.superuser
            }
        )
    }

    async dropUser(){
        const db = require('../db/db.js')
        await db.deleteRow('users',{'id':this.id})
        await this.dropId()
        this.login = null
        this.password = null
        this.name = null
        this.email = null
        this.superuser = null
    }

    // Cart
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

    async saveCart(){// save cart array to cart database
        const db = require('../db/db.js')
        await this.dropCart()
        const entries = Object.entries(this.cart)
        for(const [key, value] of entries){
            await db.insertRow('carts',{'user_id':this.id,'product_id':key,'quantity':value})
        }
    }

    async dropCart(){// delete user's cart from database
        const db = require('../db/db.js')
        await db.deleteRow('carts',{'user_id':this.id})
    }
}

module.exports = User