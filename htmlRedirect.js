function redirectToCategory(category){ //send to category.html/CHOSENCATEGORY
    url = 'category.html'
    window.location.href = url.concat(category)
}

function redirectToProduct(product){//send to product.html?CHOSENPRODUCT
    url = 'product.html'
    window.location.href = url.concat(product)
}