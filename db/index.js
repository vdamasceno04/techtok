/* Script for database tests only */

(async()=>{
    const db = require('./db.js')
  /*  const User = require('../models/user.js')
    const usr = new User()
    usr.setLogin('admin')
    usr.setPassword('123')
    await usr.save()
    await console.log(await db.checkIfExists('users',{
        'login':'admin',
        'password':'123'
    }))*/
  //  await usr.drop()
    const Keyboard = require('../models/keyboard.js')
    const kybd = new Keyboard()
    kybd.setBrand('Redragon')
    kybd.setModel('Kumara')
    kybd.setDescription('Lorem ipsum')
    kybd.setPrice(249.99)
    kybd.setStock(5)
    kybd.setImgPath('../imgs/keyboard.png')
    kybd.setWarranty(12)
    await kybd.save()
    await kybd.update({'led':'rgb'})
    await console.log(await db.getRow('keyboards',{'id':kybd.getId()}))
    await kybd.drop()
    await console.log(await db.getTable('keyboards'))
    await console.log(await db.getTable('products'))
    await console.log(await db.getTable('ids'))
})()