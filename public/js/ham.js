const hamburger=document.querySelector('.hamburger');

hamburger.addEventListener('click',function(){
    this.classList.toggle('is-active')
})

const logout=document.querySelector('.log');

logout.addEventListener('click',function(){
    alert("¿you want to log out?")
})


hamburger.addEventListener('click',function(){
    document.querySelector(".dropdown-container ul").classList.toggle("show")
})

