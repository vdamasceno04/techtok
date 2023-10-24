function getUsername(){ //get username from html's filled box
    const username = document.getElementById("username").value;
    return username
}

function getPassword(){ //get password from html's filled box 
    const password = document.getElementById("password").value
    return password
}

function getName(){ //get password from html's filled box 
    const name = document.getElementById("name").value
    return name;
}

function getEmail(){ //get password from html's filled box 
    const email = document.getElementById("email").value
    return email;
}

function hasBlankText(username, password, email, name) {
    var submitMessage = document.getElementById("submitMessage")
    submitMessage.style.display = "block"
    
    if (username.length == 0 && password.length == 0) {
        submitMessage.innerText = "Please fill in your information"
    }
    else if (username.length == 0) {
        submitMessage.innerText = "Please fill in your username"
    }
    else if (password.length == 0) {
        submitMessage.innerText = "Please fill in your password"
    }
    else if (email.length == 0) {
        submitMessage.innerText = "Please fill in your password"
    }
    else if (name.length == 0) {
        submitMessage.innerText = "Please fill in your password"
    }
    else {
        submitMessage.style.display = "none"
        return false;
    }
    return true;
}