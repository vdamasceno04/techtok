const Model = require('./model.js')

class User extends Model{
    constructor(){
        super()

        // string
        this.login = null
        this.password = null
        this.name = null
        this.birthDate = null
        this.address = null
        this.email = null
        this.occupation = null
        this.workplace = null
        this.photoPath = null

        // int
        this.document = null
        this.telephone = null
        this.cellphone = null

        // boolean
        this.employee = false

        // array
        this.cart = []
    }

    // setters
    setLogin(login){this.login = login}
    setPassword(password){this.password = password}
    setName(name){this.name = name}
    setBirthDate(birthDate){this.birthDate = birthDate}
    setAddress(address){this.address = address}
    setEmail(email){this.email = email}
    setOccupation(occupation){this.occupation = occupation}
    setWorkplace(workplace){this.workplace = workplace}
    setPhotoPath(photoPath){this.photoPath = photoPath}
    setDocument(document){this.document = document}
    setTelephone(telephone){this.telephone = telephone}
    setCellphone(cellphone){this.cellphone = cellphone}
    setEmployee(employee){this.employee = employee}

    // getters
    getLogin(){return this.login}
    getPassword(){return this.password}
    getName(){return this.name}
    getBirthDate(){return this.birthDate}
    getAddress(){return this.address}
    getEmail(){return this.email}
    getOccupation(){return this.occupation}
    getWorkplace(){return this.workplace}
    getPhotoPath(){return this.photoPath}
    getDocument(){return this.document}
    getTelephone(){return this.telephone}
    getCellphone(){return this.cellphone}
    getEmployee(){return this.employee}
    getCart(){return this.cart}

    async load(){// load from database
        const db = require('../db/db.js')
        const [info] = await db.getRow('users',{'id':this.id})
        this.login = info[0]['login']
        this.password = info[0]['password']
        this.name = info[0]['name']
        this.birthDate = info[0]['birth_date']
        this.address = info[0]['address']
        this.email = info[0]['email']
        this.occupation = info[0]['occupation']
        this.workplace = info[0]['workplace']
        this.photoPath = info[0]['photo_path']
        this.document = info[0]['document']
        this.telephone = info[0]['telephone']
        this.cellphone = info[0]['cellphone']
        this.employee = info[0]['employee']
    }

    async save(){// save new product to database
        const db = require('../db/db.js')
        await this.generateId('user')
        await db.insertRow(
            'users',{
                'id':this.id,
                'login':this.login,
                'password':this.password,
                'name':this.name,
                'birth_date':this.birthDate,
                'address':this.address,
                'email':this.email,
                'occupation':this.occupation,
                'workplace':this.workplace,
                'photo_path':this.photoPath,
                'document':this.document,
                'telephone':this.telephone,
                'cellphone':this.cellphone
                'employee':this.employee
            }
        )
    }

    async drop(){
        const db = require('../db/db.js')
        await db.deleteRow('users',{'id':this.id})
        await this.dropId()
        this.login = null
        this.password = null
        this.name = null
        this.birthDate = null
        this.address = null
        this.email = null
        this.occupation = null
        this.workplace = null
        this.photoPath = null
        this.document = null
        this.telephone = null
        this.cellphone = null
        this.employee = null
    }

    // Cart
    insertIntoCart(productId,quantity){// insert into cart array
        const entries = Object.entries(info)
        for(const [key, value] of entries){
            if(key == productId){
                this.info[key] = quantity
                return
            }
        }
        this.cart.push({productId:quantity})
    }
    
    removeFromCart(productId){// remove from cart array
        const entries = Object.entries(this.cart)
        for(const [key, value] of entries){
            if(key == productId){
                delete this.info[key]
                return
            }
        }
    }

    clearCart(){this.cart = []}// clear cart array

    async loadCart(){// load cart database into cart array
        const db = require('../db/db.js')
        this.clearCart()
        const entries = Object.entries(await db.getRow('carts',{'user_id':this.id}))
        for(const element of entries){
            this.cart.push({element['product_id']:element['quantity']})
        }
    }

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