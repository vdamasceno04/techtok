// module.exports = async (req, res) => {
//     const { username, password } = req.body
//     const user = await getUser(username)

//     if(user.password !== password){
//         return res.status(403).json({error: "Wrong password",})
//     }

//     delete user.password
//     const toke = jwt.sign(user, JWT_SECRET, { expiresIn: "1h"})

//     res.cookie("token", token, {
//         httpOnly: true
//     })

//     return res.redirect("/welcome")
// }