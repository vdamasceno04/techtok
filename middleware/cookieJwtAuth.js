// const jwt = require("jsonwebtoken")

// exports.cookieJwtAuth = (req, res, next) => {
//     const token = req.cookies.token// get token out of the cookie
//     try {
//         const user = jwt.verify(token, process.env.JWT_SECRET)// verify the token and secret key
//         req.user = user
//         next()
//     } catch(err) {
//         res.clearCookie("token")
//         return res.redirect("/")
//     }
// }