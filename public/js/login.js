function loaded() {
    console.log("Hello")
}

function login() {
    let username = document.getElementById("username").value 
    let password = document.getElementById("password").value 

    if(!username && username == "" && !password && password == "")
        return;
    
    //fetch("http:localhost:3000/api/")
}

document.addEventListener("DOMContentLoaded", loaded())