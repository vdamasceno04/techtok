function getUsername(){ //get username from html's filled box
    const username = document.getElementById("username");
    return username
}
function getPassword(){ //get password from html's filled box 
    const password = document.getElementById("password")
    return password
}

function validateLogin(){ //TODO VALIDATION CONDITIONS 
    username = getUsername()
    password = getPassword()
    
    //checarNoBancoDeDados(username, password)
    //redirectToUserArea()
}