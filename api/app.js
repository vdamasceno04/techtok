const express = require("express");
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const staffRoutes = require('./routes/staffRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
const app = express();
const port = 3000;
//app ís an Express instance
//express has some methods, including CRUD operations
/*Node.js server will run on port 3000 and respond to
the defined requests*/

app.use(cors());

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

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
app.use('/cart', cartRoutes);