const Model = require('./model.js')

class User extends Model{
    constructor(){
        super()

        this.login = null
        this.password = null
        this.name = null
        this.birthDate = null
        this.document = -1
        this.address = null
        this.telephone = -1
        this.cellphone = -1
        this.email = null
        this.occupation = null
        this.workplace = null
        this.photoPath = null
    }

    getLogin(){return this.login}
    getPassword(){return this.password}
    getName(){return this.name}
    getBirthDate(){return this.birthDate}
    getDocument(){return this.document}
    getAddress(){return this.address}
    getTelephone(){return this.telephone}
    getCellphone(){return this.cellphone}
    getEmail(){return this.email}
    getOccupation(){return this.occupation}
    getWorkplace(){return this.workplace}
    getPhotoPath(){return this.photoPath}
}

module.exports = User