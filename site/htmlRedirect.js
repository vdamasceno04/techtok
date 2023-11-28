function setImg(id, filename){
    const imagePath = window.config.API_ENDPOINT + 'images/'
    document.getElementById(id).src = imagePath + filename
    console.log(imagePath + filename)
}

function redirectToCategory(category) {
    window.location.href = `category.html?cat=${category}`
  }

function redirectToProduct(product){//send to product.html?CHOSENPRODUCT
    url = 'product.html'
    window.location.href = url.concat(product)
}

function redirectToLogin(){
    window.location.href = 'login.html'
}

function redirectToStaff(){
    window.location.href = 'staff.html'
}

function redirectToMainPage() {
    window.location.href = 'initialPage.html'
}

function redirectToRegister(){
    window.location.href = 'register.html'
}

//function redirectToUserArea(){}

function redirectToCart() {
    window.location.href = 'cart.html'
}