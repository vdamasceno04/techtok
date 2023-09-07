function getProductId(url){ //get product id from url
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
//TODO: create classes for each product