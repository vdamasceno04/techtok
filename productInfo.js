/*function getProductId(url){ //get product id from url
    params = new URLSearchParams(url)
    return params.get('prod')
}

function getProductName(url){//get product name from db
    getProductId(url)
    return 'mousetop'
} 

function getImgPath(id){return 'imgs/mouselogitechm90.png'} //get img path from db 
//need to decide how to store imgs

function setName(htmlId, url){ //set html product name field
    prod_name = getProductName(url)
    document.getElementById(htmlId).innerHTML = prod_name
}

function setImgPath(imgId, url){ //set html product img field
    id = getProductId(url)
    img_path = getImgPath()
    document.getElementById(imgId).src = img_path;
}

function setProduct(url, nameId, imgId){ //run all functions above
    setName(nameId, url)
    setImgPath(imgId, url)
}
//TODO: create classes for each product*/

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

//TODO: create classes for each product