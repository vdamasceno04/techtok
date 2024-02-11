const Model = require('./Model.js')

class User extends Model{
    constructor(
            login = null,
            password = null,
            name = null,
            email = null,
            superuser = null,
            cart = null
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

            this.token = null
        }

    // setters
    setLogin(login){this.login = login}
    setPassword(password){this.password = password}
    setName(name){this.name = name}
    setEmail(email){this.email = email}
    setSuperuser(superuser){this.superuser = superuser}
    setToken(token){this.token = token}

    // getters
    getLogin(){return this.login}
    getPassword(){return this.password}
    getName(){return this.name}
    getEmail(){return this.email}
    getSuperuser(){return this.superuser}
    getToken(){return this.token}

    /**
     * Loads user information from the database.
     *
     * @return {Promise} A promise that resolves with the loaded user information.
     */
    async load(){
        const db = require('../db/db.js')
        const [info] = await db.getRow('users', 'login', this.login)
        console.log(info)
        this.login = info['login']
        this.password = info['password']
        this.name = info['name']
        this.email = info['email']
        this.superuser = info['superuser']
    }

    /**
     * Save new product to database.
     *
     * @return {Promise<void>} - The function does not take any parameters and does not return anything.
     */
    async save(){
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

    /**
     * Deletes the user from the database and resets the user object.
     *
     * @return {Promise} A promise that resolves when the user is successfully deleted.
     */
    async drop(){
        const db = require('../db/db.js')
        await db.deleteRow('users', {'id':this.id})
        await this.dropId()
        this.login = null
        this.password = null
        this.name = null
        this.email = null
        this.superuser = null
    }

    /**
     * Verify if the user exists in the database.
     *
     * @return {Promise<boolean>} A promise that resolves to a boolean indicating if the user exists.
     */
    async validateLogin(){
        const db = require('../db/db.js')
        return await db.checkIfExists('users', {'login':this.login})
    }

        /**
     * Verify if the user's password is correct in the database.
     *
     * @return {Promise<boolean>} A promise that resolves to a boolean indicating if the user's password is correct.
     */
    async validatePassword(){
        const db = require('../db/db.js')
        return await db.checkIfExists('users', {'login':this.login, 'password':this.password})
    }
}

module.exports = User