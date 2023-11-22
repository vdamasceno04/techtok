require('dotenv').config()
const jwt = require('jsonwebtoken')
const redirect = require('./htmlRedirect')


const API_ADDRESS = process.env.API_PROTOCOL + '://' + process.env.API_HOSTS + ':' + process.env.API_PORT + '/'

/**
 * Get the username from the HTML's filled box.
 *
 * @return {String} The username.
 */
function getUsername(){ //get username from html's filled box
    const username = document.getElementById('username').value
    return username
}

/**
 * Retrieves the password from the filled box in the HTML.
 *
 * @return {String} The password retrieved from the box.
 */
function getPassword(){ //get password from html's filled box 
    const password = document.getElementById('password').value
    return password
}

/**
 * Checks if either the username or the password is blank.
 *
 * @param {String} username - The username input.
 * @param {String} password - The password input.
 * @return {boolean} Returns true if either the username or the password is blank, otherwise returns false.
 */
function hasBlankText(username, password) {
    let submitMessage = document.getElementById('submitMessage')
    submitMessage.style.display = 'block'
    if (!username.length && !password.length)
        submitMessage.innerText = 'Please fill in your information'
    else if (!username.length)
        submitMessage.innerText = 'Please fill in your username'
    else if (!password.length)
        submitMessage.innerText = 'Please fill in your password'
    else {
        submitMessage.style.display = 'none'
        return false
    }
    return true
}

// async function validateLogin(){ 
//     username = getUsername()
//     password = getPassword()
//     console.log(checkLoginData(username, password));
//     if (!hasBlankText(username, password)) {
//         //if (checarNoBancoDeDados(username, password)) {
//             //redirectToUserArea()
//         //}
//         //else {
//             // TODO: verifica se a senha tá
//             // errada e mostra a msg correta.
//             //var submitMessage = document.getElementById("submitMessage")
//             //submitMessage.style.display = "block"
//             //submitMessage.innerText = "This user does not exist!"
//         //}
//     }
// }


// //Gets user's row from users table by its login and check if password matches
// async function checkLoginData(username, password){ 
//     const endpoint = 'http://localhost:3000/user/users' + username;
//     fetch(endpoint)
//     .then(res => res.json())
//     .then(data => {
//         //console.log('fetched data: ' + JSON.stringify(data))
//         if(data.length == 0)
//             console.log("User does not exist.")
//         else if(password == data[0].password){
//             const token = jwt.sign(
//                     { username },
//                     process.env.JWT_SECRET_TOKEN,
//                     { expires in: process.env.JWT_CONNECT_TIMEOUT }
//                 )
//             console.log("Password match.")
//             return 
//         }
//         else
//             console.log("Wrong password.")
//     })
//     .catch(error => console.log(error))
// }

/**
 * Validates the login credentials by making a POST request to the login endpoint.
 *
 * @param {String} username - The username entered by the user.
 * @param {String} password - The password entered by the user.
 * @return {Promise<null>} If there is an error, returns null. Otherwise, returns a promise that resolves with the token.
 */
async function validateLogin(username, password) {
    if (!hasBlankText(username, password)) {
        const endpoint = API_ADDRESS + 'login'
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ getUsername(), getPassword() })
        });
        const data = await response.json()
        if (data.ok) {
            console.log('Login successful.')
            redirectToMainPage()
        } else {// Handle error response
            let msg, submitMessage = document.getElementById('submitMessage')
            submitMessage.style.display = 'block'
            if(data.error === 401){
                if (data.errorType === 'login')
                    msg = 'User not registered.'
                else if (data.errorType === 'password')
                    msg = 'Wrong password.'
                msg += data.error
            }
            else if(data.error === 500)
                msg = 'Internal server error.'
            else
                msg = 'Unknown error: ' + data.error
            submitMessage.innerText = msg
            console.log(msg)
        }
    }
}