const jwt = require('jsonwebtoken')
const redirect = require('./htmlRedirect')

// Get the username from the HTML's filled box.
function getUsername() {
    return document.getElementById('username').value
}

// Get the password from the HTML's filled box.
function getPassword() {
    return document.getElementById('password').value
}

// Check if either the username or the password is blank.
function hasBlankText(username, password) {
    let submitMessage = document.getElementById('submitMessage')
    submitMessage.style.display = 'block'
    if (!username.length && !password.length) {
        submitMessage.innerText = 'Please fill in your information'
    } else if (!username.length) {
        submitMessage.innerText = 'Please fill in your username'
    } else if (!password.length) {
        submitMessage.innerText = 'Please fill in your password'
    } else {
        submitMessage.style.display = 'none'
        return false
    }
    return true
}

// Validate the login credentials by making a POST request to the login endpoint.
async function validateLogin(username, password) {
    if (!hasBlankText(username, password)) {
        const endpoint = window.config.API_ENDPOINT + 'login'
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        const data = await response.json()
        if (response.ok) {
            console.log('Login successful.')
            // Store the access token in local storage for "Remember me" functionality
            localStorage.setItem('accessToken', data.accessToken)
            // Redirect to the main page
            redirectToMainPage()
        } else {
            let msg
            let submitMessage = document.getElementById('submitMessage')
            submitMessage.style.display = 'block'
            if (data.error === 401) {
                if (data.errorType === 'login') {
                    msg = 'User not registered.'
                } else if (data.errorType === 'password') {
                    msg = 'Wrong password.'
                }
                msg += data.error
            } else if (data.error === 500) {
                msg = 'Internal server error.'
            } else {
                msg = 'Unknown error: ' + data.error
            }
            submitMessage.innerText = msg
            console.log(msg)
        }
    }
}

// Event listener for the login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault()
    validateLogin(getUsername(), getPassword())
})
