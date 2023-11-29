const jwt = require('jsonwebtoken')
const redirect = require('./htmlRedirect')

// Check if the user is already logged in when the login page loads
window.onload = function() {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
        // If the user is already logged in, redirect to the main page
        redirectToMainPage()
    }
}

// Validate the login credentials by making a POST request to the login endpoint.
async function validateLogin() {
    const login = getLogin()
    const password = getPassword()
    if (!hasBlankText(login, password)) {
        const endpoint = window.config.API_ENDPOINT + 'login'
        console.log(endpoint)
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login:login, password })
        })
        const data = await response.json()
        console.log('Response from api:')
        console.log(data)
        if (response.status === 200) {
            console.log('Login successful.')
            // Store the access token in local storage if "Remember Me" is checked
            const rememberMe = isRememberMeChecked()
            if (rememberMe) {
                localStorage.setItem('accessToken', data.accessToken)
            }
            // Store the refresh token in a secure HttpOnly cookie
            document.cookie = `refreshToken=${data.refreshToken}; HttpOnly; Secure; SameSite=Lax;`
            // Redirect to the main page
            redirectToMainPage()
        } else {
            let msg = ' '
            let submitMessage = document.getElementById('submitMessage')
            submitMessage.style.display = 'block'
            if (response.status === 401) {
                if (data.errorType === 'login') {
                    msg = 'User not registered.'
                } else if (data.errorType === 'password') {
                    msg = 'Wrong password.'
                }
                msg = 'Error ' + response.status + ': ' + msg
            } else if (response.status === 500) {
                msg = 'Error ' + response.status + ':  Internal server error: ' + data.errorType
            } else {
                msg = 'Unknown error: ' + data.errorType
            }
            submitMessage.innerText = msg
            console.log(msg)
        }
    }
}

// Event listener for the login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault()
    validateLogin(getLogin(), getPassword())
})