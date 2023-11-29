function logout() {
    // Request to the server to delete the refreshToken
    fetch('/delete-refresh-token', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
    })
    .then(response => {
        if (response.ok) {
            console.log('Logout successful')
        } else {
            console.log('Logout failed')
        }
    })
    .catch((error) => {
        console.error('Error:', error)
    })

    // Redirect the user to the login page (or any other page you want)
    window.location.href = '/login'
}

// Check if the user is already logged in when the page loads
window.addEventListener('load', function() {
    console.log('Page loaded')
    const logoutButton = document.getElementById('logout')
    const loginButton = document.getElementById('redirLogin')
    const staffButton = document.getElementById('staff')
    const userLoginDisplay = document.getElementById('userLoginDisplay')

    // Request to the server to verify refreshToken
    fetch('/verify-refresh-token', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
    })
    .then(response => response.json())
    .then(data => {
        if (data.hasRefreshToken) {
            console.log('User is logged in')
            const isSuperuser = data.superuser
            if (isSuperuser) {
                // If the user is a superuser, enable the staff area button
                staffAreaButton.classList.remove('disabled')
                staffAreaButton.disabled = false
            } else {
                // If the user is not a superuser, disable the staff area button
                staffAreaButton.classList.add('disabled')
                staffAreaButton.disabled = true
            }
            // If the user is already logged in, show the logout button and the user's login
            logoutButton.style.display = 'block'
            logoutButton.classList.remove('disabled')
            logoutButton.disabled = false
            userLoginDisplay.textContent = data.login
            userLoginDisplay.style.display = 'block'
            loginButton.classList.add('disabled')
            loginButton.disabled = true
            // Redirect to the main page
            redirectToMainPage()
        } else {
            console.log('User is not logged in')
            // If the user is not logged in, show the logout button as disabled
            logoutButton.style.display = 'block'
            logoutButton.classList.add('disabled')
            logoutButton.disabled = true
            userLoginDisplay.style.display = 'none'
            loginButton.classList.remove('disabled')
            loginButton.disabled = false
        }
    })
})

document.getElementById('redirLogin').addEventListener('click', function() {
    console.log('Login button clicked')
    if (!this.classList.contains('disabled')) { 
        redirectToLogin()
    }
})

document.getElementById('logout').addEventListener('click', function() {
    console.log('Logout button clicked')
    if (!this.classList.contains('disabled')) { 
        logout()
    }
})

document.getElementById('staff').addEventListener('click', function() {
    console.log('Staff button clicked.')
    if (!this.classList.contains('disabled')) { 
        redirectToStaff();
    }
})
