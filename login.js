function getUsername(){ //get username from html's filled box
    const username = document.getElementById("username").value;
    return username
}

function getPassword(){ //get password from html's filled box 
    const password = document.getElementById("password").value
    return password
}

function hasBlankText(username, password) {
    var submitMessage = document.getElementById("submitMessage")
    
    if (username.length == 0 && password.length == 0) {
        submitMessage.style.display = "block"
        submitMessage.innerText = "Please fill in your information"
    }
    else if (username.length == 0) {
        submitMessage.style.display = "block"
        submitMessage.innerText = "Please fill in your username"
    }
    else if (password.length == 0) {
        submitMessage.style.display = "block"
        submitMessage.innerText = "Please fill in your password"
    }
    else {
        submitMessage.style.display = "none"
        return false;
    }
    return true;
}

function validateLogin(){ 
    username = getUsername()
    password = getPassword()

    if (!hasBlankText(username, password)) {
        //if (checarNoBancoDeDados(username, password)) {
            //redirectToUserArea()
        //}
        //else {
            // TODO: verifica se a senha tá
            // errada e mostra a msg correta.
            //var submitMessage = document.getElementById("submitMessage")
            //submitMessage.style.display = "block"
            //submitMessage.innerText = "This user does not exist!"
        //}
    }
}

function validateUserCreation() {
    username = getUsername()
    password = getPassword()

    if (!hasBlankText(username, password)) {

    }
}

