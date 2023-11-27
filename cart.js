const products = [
    { name: "Mouse Logitech", price: 78.67 },
    { name: "Teclado gamer", price: 573.21 },
    { name: "Headset rgb 7.1", price: 312.53 },
    { name: "Speaker JBL", price: 230.11 }
    
];

getCart()
const cart = [];
let totalPrice = 0;

// Function to add an item to the cart
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

// Function to update the cart display
function updateCartUI() {
    const cartItems = document.getElementById("cart-items");
    const totalDisplay = document.getElementById("total-price");

    // Clear the cart display
    cartItems.innerHTML = "";

    // Populate the cart display with current items
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${item.name}</span>
            <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
            <span class="price">R$${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(li);
    });

    totalDisplay.textContent = totalPrice.toFixed(2);
}

// Function to update the quantity of an item in the cart
function updateQuantity(index, newQuantity) {
    const item = cart[index];
    const previousTotal = item.price * item.quantity;
    item.quantity = parseInt(newQuantity, 10);
    const newTotal = item.price * item.quantity;
    totalPrice = totalPrice - previousTotal + newTotal;
    updateCartUI();
}

// Add products to the cart
for (let x in products) {
    addToCart(products[x]);
}

async function getCart(){
    const userId = 8 //use cookies??  
    const endpoint = 'http://localhost:3000/cart/get' + userId;
    fetch(endpoint)
    .then(res => res.json())
    .then(data => {
        console.log('fetched data: ' + JSON.stringify(data))
        if(data.length == 0)
            console.log("user doesnt exist")
        else if(password == data[0].password)
            console.log("password match")
        else
            console.log("wrong password")
        
    })
    .catch(error => console.log(error))
}