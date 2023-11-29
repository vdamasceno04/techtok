const jwt = require('jsonwebtoken')
const redirect = require('./htmlRedirect')

// Get the login from the HTML's filled box.
function getLogin() {
    return document.getElementById('login').value
}

// Get the password from the HTML's filled box.
function getPassword() {
    return document.getElementById('password').value
}

// Check if either the login or the password is blank.
function hasBlankText(login, password) {
    let submitMessage = document.getElementById('submitMessage');
    if (!login.length && !password.length) {
        submitMessage.style.display = 'block';
        submitMessage.innerText = 'Please fill in your information';
        return true;
    } else if (!login.length) {
        submitMessage.style.display = 'block';
        submitMessage.innerText = 'Please fill in your login';
        return true;
    } else if (!password.length) {
        submitMessage.style.display = 'block';
        submitMessage.innerText = 'Please fill in your password';
        return true;
    } else {
        submitMessage.style.display = 'none';
        return false;
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
    validateLogin(getLogin(), getPassword())
})
