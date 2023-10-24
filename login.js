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
    else {
        submitMessage.style.display = "none"
        return false;
    }
    return true;
}

async function validateLogin(){ 
    username = getUsername()
    password = getPassword()
    console.log(username, password);
    console.log(await checkLoginData(username, password));
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

//Gets user's row from users table by its login and check if password matches
async function checkLoginData(username, password){ 
    const endpoint = 'http://localhost:3000/user/users' + username;
    fetch(endpoint)
    .then(res => res.json())
    .then(data => {
        console.log(JSON.stringify(data))
/*        if(password == data[0].password){
            infoMatch = true;
            console.log("dentro: ")
            console.log(infoMatch)
        }
*/
    })
    .catch(error => console.log(error))
}