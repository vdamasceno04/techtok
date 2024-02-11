const axios = require('axios')

function getUsername(){ //get username from html's filled box
    const username = document.getElementById("username").value;
    return username;
}

function getPassword(){ //get password from html's filled box 
    const password = document.getElementById("password").value;
    return password;
}

function getPassword(){ //get password from html's filled box 
    const password2 = document.getElementById("password2").value;
    return password2;
}

function getName(){ //get name from html's filled box 
    const uname = document.getElementById("uname").value;
    return uname;
}

function getEmail(){ //get email from html's filled box 
    const email = document.getElementById("email").value;
    return email;
}

async function sendRegisterData(usname, pass, uname, em){
    const info = {login: usname, password: pass, name: uname, email: em, superuser: 0}; 
    console.log(info)
    await axios.post(window.config.API_ENDPOINT + 'user/register', info)
    .catch(error => console.log(error));
}

async function validateRegister(){ 
    username = getUsername();
    password = getPassword();
    uname = getName();
    email = getEmail();
    console.log(username, password, uname, email);
    if (!hasBlankText(username, password, email, uname)) {
        await sendRegisterData(username, password, uname, email);
    }
}

function hasBlankText(username, password, password2, email, uname) {
    var submitMessage = document.getElementById("submitMessage")
    submitMessage.style.display = "block"
    
    if (username.length == 0 && password.length == 0  && email.length == 0  && uname.length == 0 ) {
        submitMessage.innerText = "Please fill in your information"
    }
    else if (username.length == 0) {
        submitMessage.innerText = "Please fill in your username"
    }
    else if (password.length == 0) {
        submitMessage.innerText = "Please fill in your password"
    }
    else if (password2.length == 0) {
        submitMessage.innerText = "Please repeat your password"
    }
    else if (password2 != password ) {
        submitMessage.innerText = "Passwords do not match"
    }
    else if (email.length == 0) {
        submitMessage.innerText = "Please fill in your email"
    }
    else if (uname.length == 0) {
        submitMessage.innerText = "Please fill in your username"
    }
    else {
        submitMessage.style.display = "none"
        return false;
    }
    return true;
}