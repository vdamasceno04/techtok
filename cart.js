document.addEventListener('DOMContentLoaded', async function() {
    const products = [
        { name: "Mouse Logitech", price: 78.67 },
        { name: "Teclado gamer", price: 573.21 },
        { name: "Headset rgb 7.1", price: 312.53 },
        { name: "Speaker JBL", price: 230.11 }
        
    ];
    let totalPrice = 0;
    const cart =[]
    // Add products to the cart
    /*
    for (let x in products) {
        addToCart(products[x]);
    }
    */
    await getInfoFromDb()
});

async function getInfoFromDb(){
    const fromCartTable = [];
    const fromProdTable = [];
    const userId = 8 //use cookies??  
    const endpoint = 'http://localhost:3000/cart/get/' + userId;
    try {
        const res = await fetch(endpoint);
        const data = await res.json();

        if (data.length > 0){
            for(i = 0; i<data.length; i++){
                fromCartTable.push({prodId: data[i].product_id, quantity: data[i].quantity})
                const fetchDetalhesProduto = async () => {
                const detalhesResponse = await fetch('http://localhost:3000/product/products' + (data[i].product_id));
                //await new Promise(resolve => setTimeout(resolve, 1000)); //avoid infinite calls
                const detalhesProduto = await detalhesResponse.json()
                return detalhesProduto
            }
            const dataProd = await fetchDetalhesProduto();
            if(dataProd.length > 0){
                for(j=0; j<dataProd.length; j++){
                    fromProdTable.push({name: dataProd[j].model, price: dataProd[j].price})
                }
            }
            }
        }
        //console.log('fetched data: ' + JSON.stringify(data))
        console.log('fromcart =     ' + JSON.stringify(fromCartTable))
        console.log('fromProd =     ' + JSON.stringify(fromProdTable))
        const product = []
        for(i = 0; i<fromProdTable.length; i++){
            product.push({name: fromProdTable[i].name, price: fromProdTable[i].price, quantity: fromCartTable[i].quantity})
        }
        console.log('prod =     ' + JSON.stringify(product))
        updateCartUI(product)
    }
    catch(error){console.log(error)} 
}

/*
function addToCart(product) {
    cart.push({ ...product, quantity: 1 });
    totalPrice += product.price;
    updateCartUI();
}

// Function to remove an item from the cart
function removeFromCart(index) {
    const item = cart[index];
    totalPrice -= item.price * item.quantity;
    cart.splice(index, 1);
    updateCartUI();
}
*/
function updateCartUI(cart) {
    const cartItems = document.getElementById("cart-items");
    const totalDisplay = document.getElementById("total-price");
    totalPrice = 0;
    for(i=0; i<cart.length; i++){
        totalPrice += (parseFloat(cart[i].price)* cart[i].quantity)
    }
    // Clear the cart display
    cartItems.innerHTML = "";

    // Populate the cart display with current items
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${item.name}</span>
            <input type="number" value="${item.quantity}" min="1"s>
            <span class="price">R$${(item.price * item.quantity).toFixed(2)}</span>
            <button>Remove</button>
        `;
        cartItems.appendChild(li);
    });

    totalDisplay.textContent = totalPrice.toFixed(2);
}
/*
// Function to update the quantity of an item in the cart
function updateQuantity(index, newQuantity) {
    const item = cart[index];
    const previousTotal = item.price * item.quantity;
    item.quantity = parseInt(newQuantity, 10);
    const newTotal = item.price * item.quantity;
    totalPrice = totalPrice - previousTotal + newTotal;
    updateCartUI();
}
*/


/*
        li.innerHTML = `
            <span>${item.name}</span>
            <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
            <span class="price">R$${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
*/