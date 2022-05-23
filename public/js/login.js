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

    console.log(username, password)
    
    fetch(`/loginUser?mail=${username}&password=${password}`, {
        method: 'GET'
    }).then(response => response.json())
    .then(response => {
        sessionStorage.setItem("userToken", response["data"]["token"])
        console.log(sessionStorage.getItem("userToken"))
        window.location.href = "/index"
    })
}
document.addEventListener("DOMContentLoaded", loaded())