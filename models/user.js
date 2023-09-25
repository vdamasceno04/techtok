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

    async load(){// load from database
        const [info] = await this.db.getRow(
            'users',{
                key:'id',
                keyVal:this.id
            }
        )
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
    }

    async save(){// save new product to database
        await this.generateId('user')
        await this.db.insertRow(
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
            }
        )
    }

    // checkLogin = async()=>{
    //     return await this.db.checkIfExists(
    //         'users',
    //         {
    //             'login':this.login
    //         }
    //     )
    // }

    // checkPassword = async()=>{
    //     return await this.db.checkIfExists(
    //         'users',
    //         {
    //             'login':this.login
    //             'password':this.password
    //         }
    //     )
    // }
}

module.exports = User