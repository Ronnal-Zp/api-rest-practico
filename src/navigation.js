
window.addEventListener("DOMContentLoaded", navigator, false)
window.addEventListener("hashchange", navigator, false)

$searchFormBtn.addEventListener('click', ()=>{
  location.hash = '#search=' + $searchFormInput.value;
})

$trendingBtn.addEventListener('click', ()=>{
  location.hash = '#trends';
});

$arrowBtn.addEventListener('click', ()=>{
  // location.hash = "#home";
  window.history.back();
})

function navigator() {
  if (location.hash.startsWith("#trends")) {
    trendsPage()
  } else if (location.hash.startsWith("#search=")) {
    searchPage()
  } else if (location.hash.startsWith("#movie=")) {
    movieDetailsPage()
  } else if (location.hash.startsWith("#category=")) {
    categoriesPage()
  } else {
    homePage()
  }

  window.scrollTo(0, 0)
}

function homePage() {
  console.log("Home!!")
  const childrenCategoriesPreview = Array.from($trendingMoviesPreviewList.children);

  // get movies and categories to append in html
  if(childrenCategoriesPreview.length == 0){
    getTrendingMoviesPreview();
    getCategoriesPreview();
  }

  $headerTitle.classList.remove('inactive');
  $headerSection.classList.remove('header-container--long');
  $trendingPreviewSection.classList.remove('inactive');
  $categoriesPreviewSection.classList.remove('inactive');
  $searchForm.classList.remove('inactive');
  
  $arrowBtn.classList.add('inactive');
  $arrowBtn.classList.remove('header-arrow--white');
  $headerSection.style.background = ''
  $headerCategoryTitle.classList.add('inactive');
  $genericSection.classList.add('inactive');
  $movieDetailSection.classList.add('inactive');

}


function categoriesPage() {
  console.log("Categories!!")

  $headerTitle.classList.add('inactive');
  $headerSection.classList.remove('header-container--long');
  $trendingPreviewSection.classList.add('inactive');
  $categoriesPreviewSection.classList.add('inactive');
  $searchForm.classList.add('inactive');
  
  $arrowBtn.classList.remove('inactive');
  $arrowBtn.classList.remove('header-arrow--white');
  $headerSection.style.background = ''
  $headerCategoryTitle.classList.remove('inactive');
  $genericSection.classList.remove('inactive');
  $movieDetailSection.classList.add('inactive');

  const [categoryHash, params] = location.hash.split('=')
  const [categoryId, categoryName] = params.split('-');
  const newCategoryName = decodeURI(categoryName)

  // get and append movies to html
  getMoviesByCategory(categoryId)
  $headerCategoryTitle.innerHTML = newCategoryName;
}


function movieDetailsPage() {
  console.log("Movie!!")


  $headerTitle.classList.add('inactive');
  $headerSection.classList.add('header-container--long');
  $trendingPreviewSection.classList.add('inactive');
  $categoriesPreviewSection.classList.add('inactive');
  $searchForm.classList.add('inactive');
  
  $arrowBtn.classList.remove('inactive');
  $arrowBtn.classList.add('header-arrow-white');
  //$headerSection.style.background = ''
  $headerCategoryTitle.classList.add('inactive');
  $genericSection.classList.add('inactive');
  $movieDetailSection.classList.remove('inactive');


  const [_, movieId] = location.hash.split('=');
  getMovieById(movieId);
}


function searchPage() {
  console.log("Search!!")


  $headerTitle.classList.add('inactive');
  $headerSection.classList.remove('header-container--long');
  $trendingPreviewSection.classList.add('inactive');
  $categoriesPreviewSection.classList.add('inactive');
  $searchForm.classList.remove('inactive');
  
  $arrowBtn.classList.remove('inactive');
  $arrowBtn.classList.remove('header-arrow--white');
  $headerSection.style.background = ''
  $headerCategoryTitle.classList.add('inactive');
  $genericSection.classList.remove('inactive');
  $movieDetailSection.classList.add('inactive');

  const [_, search] = location.hash.split('=');
  const newSearch = decodeURI(search);
  
  getMoviesBySearch( newSearch );
}


function trendsPage() {
  console.log("TRENDS!!")


  $headerTitle.classList.add('inactive');
  $headerSection.classList.remove('header-container--long');
  $trendingPreviewSection.classList.add('inactive');
  $categoriesPreviewSection.classList.add('inactive');
  $searchForm.classList.add('inactive');
  
  $arrowBtn.classList.remove('inactive');
  $arrowBtn.classList.remove('header-arrow--white');
  $headerSection.style.background = '';
  $headerCategoryTitle.classList.remove('inactive');
  $genericSection.classList.remove('inactive');
  $movieDetailSection.classList.add('inactive');

  $headerCategoryTitle.innerHTML = 'Tendencias';
  getTrendingMovies();
}









