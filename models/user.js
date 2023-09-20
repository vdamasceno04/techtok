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
        this.document = -1
        this.telephone = -1
        this.cellphone = -1
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
}

module.exports = User