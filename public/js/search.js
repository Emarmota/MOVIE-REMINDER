$(document).ready(function() {
  //  const clearIcon = document.querySelector(".clear-icon");
  //   const searchBar = document.querySelector(".search");
  
  //   searchBar.addEventListener("keyup", () => {
  //     if(searchBar.value && clearIcon.style.visibility != "visible"){
  //       clearIcon.style.visibility = "visible";
  //     } else if(!searchBar.value) {
  //       clearIcon.style.visibility = "hidden";
  //     }
  //   });
    
  //   clearIcon.addEventListener("click", () => {
  //     searchBar.value = "";
  //     clearIcon.style.visibility = "hidden";
  //   })

  
  $("#test").on('click', searchMov) 

  
  function searchMov(e){
    $("#movies").empty()
    e.preventDefault();
    let item =$(".searchInput").val();
    console.log(`${item}`)
    let peticion = {
      url:`https://api.themoviedb.org/3/search/movie?api_key=571b4aea0875e39f94c28d07da3d7ca9&query=${item}`,
      success: function (respuesta) {
        
        let gifList = $("#movies")
        
        if(item != ""){
           respuesta.results.forEach(element => {
            gifList.append(`
            <div class= "animal-item"> 
            <img class="imgMovie" data-type="${element.id}" src = 'https://image.tmdb.org/t/p/w185/${element.poster_path}' /> 
            </div>`  )
            //console.log(`${element.id}`)
          })
        }
  
        
        
      } ,
      error: function () {
       console.log("No se ha podido obtener la información")   
      }
    }
    
    
    $.ajax(peticion)
  
  }
  
  $("#movies").on("click", ".imgMovie", function(e){
  
    console.log("Se dio click")
    e.preventDefault();
    let movieId =$(this).attr("data-type");
    let peticion = {
      url:`https://api.themoviedb.org/3/movie/${movieId}?api_key=571b4aea0875e39f94c28d07da3d7ca9`,
      success: function (element) {
        
  
        console.log(`${element.id}`)
        console.log(`${element.original_title}`)
        console.log(`${element.poster_path}`)
        console.log(`${element.overview}`)
  
  
        
        
      } ,
      error: function () {
       console.log("No se ha podido obtener la información")   
      }
    }
    
    
    $.ajax(peticion)
  
  })
  
  
  });