const sliders_new = document.querySelector("#new-releases");
const sliders_popular = document.querySelector("#popular-releases");
var scrollPerClickNew;
var ImagePaddingNew = 20;

showNewMovies();

var scrollAmountNew = 0;

function sliderScrollLeftNew(){
  sliders_new.scrollTo({
    top:0,
    left: (scrollAmountNew -= scrollPerClickNew),
    behavior: "smooth"
  });
  if(scrollAmountNew < 0){
    scrollAmountNew = 0;
  }
}

function sliderScrollRightNew(){
  if(scrollAmountNew <= sliders_new.scrollWidth - sliders_new.clientWidth){
    sliders_new.scrollTo({
      top: 0,
      left: (scrollAmountNew += scrollPerClickNew),
      behavior: "smooth",
    });
  }
}

async function showNewMovies(){
  api_key = "571b4aea0875e39f94c28d07da3d7ca9"
  language = "en"
  region = "US"
  release_date = "2021-12-31"
  api_discover = "https://api.themoviedb.org/3/discover/movie?api_key"
  api_url_discover = `${api_discover}=${api_key}&language=${language}-${region}&region=${region}&primary_release_date.lte=${release_date}&sort_by=primary_release_date.desc&page=1` 

  var result_new = await $.get(api_url_discover);
  result_new = result_new.results;
  result_new.map(function(cur,index){
  $("#new-releases").append(
    `
    <img class="img-${index} slider-img" src="https://image.tmdb.org/t/p/w185/${cur.poster_path}"/>
    `
  )
   })
  scrollPerClickNew = 800;
}

//Popular Movies
var scrollPerClickPopular;
var ImagePaddingPopular = 20;

showPopularMovies();

var scrollAmountPopular = 0;

function sliderScrollLeftPopular(){
  sliders_popular.scrollTo({
    top:0,
    left: (scrollAmountPopular -= scrollPerClickPopular),
    behavior: "smooth"
  });
  if(scrollAmountPopular < 0){
    scrollAmountPopular = 0;
  }
}

function sliderScrollRightPopular(){
  if(scrollAmountPopular <= sliders_popular.scrollWidth - sliders_popular.clientWidth){
    sliders_popular.scrollTo({
      top: 0,
      left: (scrollAmountPopular += scrollPerClickPopular),
      behavior: "smooth",
    });
  }
}

async function showPopularMovies(){
  api_key = "571b4aea0875e39f94c28d07da3d7ca9"
  language = "en"
  region = "US"
  release_date = "2021-12-31"
  api_popular = "https://api.themoviedb.org/3/movie/popular?page=1&api_key"
  api_url_popular = `${api_popular}=${api_key}`

  var result_popular = await $.get(api_url_popular);
  result_popular = result_popular.results;
  result_popular.map(function(cur,index){
    $("#popular-releases").append(
      `
      <img class="img-${index} slider-img" src="https://image.tmdb.org/t/p/w185/${cur.poster_path}"/>
      `
    )
  })
  scrollPerClickPopular = 800;
}