function loaded() {
    console.log("Hello")
    document.getElementById("btnSubmit").addEventListener("click", () => { login() })
}

function login() {
    console.log("Hello")
    let username = document.getElementById("username").value 
    let password = document.getElementById("password").value 

    if(!username && username == "" && !password && password == "")
        return;

    console.log("HelloX")
    
    fetch("/loginUser", {
        body: {
            username : username,
            password : password
        },
        method: "POST"
    }).then(response => console.log(response))
    .then(response => response.json())
    .catch(error => console.log(error))
}

document.addEventListener("DOMContentLoaded", loaded())