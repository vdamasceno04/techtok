/* Login session keeper */
// const cookieParser = require("cookie-parser")
// const { cookieJwtAuth } = require("../middleware/cookieJwtAuth")
// const cookieJwtVerifier = require("./routes/tokenJwtVerify.js")

/* Server */
require('dotenv').config()
const express = require("express");
const cors = require('cors');
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const staffRoutes = require('./routes/staffRoutes.js')
const app = express();

//app ís an Express instance
//express has some methods, including CRUD operations
/*Node.js server will run on port 3000 and respond to
the defined requests*/

app.use(cors());

app.listen(process.env.API_PORT, () => console.log(`Example app listening on port ${process.env.API_PORT}!`));

/*THE FOLLOWING EXAMPLE SENDS THESE TOOLS, which can be
ACCESSED AS A .JSON IN http://localhost:3000/example   */
app.get("/example", (req,res) => {
   const products = [
     {id: 1, name: "hammer"},
     {id: 2,name: "screwdriver"},
     {id: 3, name: "wrench"}];
  res.json(products);})


//use routes for products, defined in ./routes/productRoutes.js
app.use('/product', productRoutes);
app.use('/user', userRoutes);
app.use('/staff', staffRoutes);

/* Login cookies */
// app.use(cookieParser())
// app.post("/login", loginRoute)
// app.post("/add", cookieJwtAuth, addRoute)