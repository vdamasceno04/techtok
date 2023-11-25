function getProductId(url){// get product id from url
    params = new URLSearchParams(url)
    return params.get('prod')
}

function getProductInfo(id){// get product's info json from session storage
    return JSON.parse(sessionStorage.getItem(String(id)))
}

function getName(info){// get product name from json
    return info.brand + ' ' + info.model
}

function setName(info){// set html product name field
    document.getElementById("productName").innerHTML = getName(info)
}

function setImgPath(info){// set html product img field
    // document.getElementById("productImg").src = 'imgs/' + info.image_path
    document.getElementById("productImg").src = `http://localhost:3000/product/${info.image_path}`
    document.getElementById("productImg").alt = getName(info)
}

function setTitle(info){// set html product title field
    document.querySelector("title").textContent = getName(info)
}

function setPrice(info){// set html product price field
    document.getElementById("price").innerHTML = 'R$ ' + info.price
}

function setWarranty(info){// set html product warranty field
    document.getElementById("warranty").innerHTML = 'Warranty: ' + info.warranty
}

function setStock(info){// set html product stock field
    document.getElementById("stock").innerHTML = 'Stock: ' + info.stock
}

function setDescription(info){// set html product description field
    document.getElementById("description").innerHTML = 'Description: ' + info.description
}

function setBrand(info){// set html product brand field
    document.getElementById("brand").innerHTML = 'Brand: ' + info.brand
}

function setModel(info){// set html product model field
    document.getElementById("model").innerHTML = 'Model: ' + info.model
}

function setProduct(info){// run all functions above
    setTitle(info)
    setName(info)
    setImgPath(info)
    setBrand(info)
    setModel(info)
    setPrice(info)
    setStock(info)
    setDescription(info)
    setWarranty(info)
}

async function addToCart(url){
    let userId = 8 //get user id (using cookies?)
    let prodId = getProductId(url)
    var quant = 1
    const match = {customer_id: userId, product_id: prodId}
    axios.post('http://localhost:3000/cart/get' + userId + '&' + prodId, match)
    .then(data => {
        console.log('fetched data: ' + JSON.stringify(data))
        if(data.length == 0){ //testar se tem colu
            const info = {customer_id: userId, product_id: prodId, quantity: quant};
            axios.post('http://localhost:3000/cart/insert', info)
            .catch(error => console.log(error));
        }
        else {
            quant += data[0].quantity;
            const info = {customer_id: userId, productId: prodId, quantity: quant};
            axios.post('http://localhost:3000/cart/update', info)
            .catch(error => console.log(error));
        }
        
    })
    .catch(error => console.log(error))
}
//TODO: SHOW SPECIFIC ATTRIBUTES FROM EACH CATEGORY