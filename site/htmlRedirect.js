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

function logout() {
    // Remove the access token from local storage
    localStorage.removeItem('accessToken')

    // Clear the refresh token cookie
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

    // Redirect the user to the login page (or any other page you want)
    window.location.href = '/login'
}

// Check if the user is already logged in when the page loads
window.onload = function() {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = getCookie('refreshToken') // Function to get a cookie by name
    const logoutButton = document.getElementById('logout')
    const userLoginDisplay = document.getElementById('userLoginDisplay')
    if (accessToken && refreshToken) {
        // If the user is already logged in, show the logout button and user's login
        logoutButton.style.display = 'block'
        userLoginDisplay.textContent = localStorage.getItem('userLogin')
        userLoginDisplay.style.display = 'block'
        // Redirect to the main page
        redirectToMainPage()
    } else {
        // If the user is not logged in, hide the logout button and user's login
        logoutButton.style.display = 'none'
        userLoginDisplay.style.display = 'none'
    }
}

// Function to get a cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
}
