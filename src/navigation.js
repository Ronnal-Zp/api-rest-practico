
window.addEventListener("DOMContentLoaded", navigator, false)
window.addEventListener("hashchange", navigator, false)

$searchFormBtn.addEventListener('click', ()=>{
  location.hash = '#search=';
})

$trendingBtn.addEventListener('click', ()=>{
  location.hash = '#trends';
});

$arrowBtn.addEventListener('click', ()=>{
  location.hash = "#home";
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
}

function homePage() {
  console.log("Home!!")
  getTrendingMoviesPreview();
  getCategoriesPreview();


  
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
  $headerCategoryTitle.classList.remove('inactive');
  $genericSection.classList.remove('inactive');
  $movieDetailSection.classList.add('inactive');
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
  $headerSection.style.background = ''
  $headerCategoryTitle.classList.remove('inactive');
  $genericSection.classList.remove('inactive');
  $movieDetailSection.classList.add('inactive');
}









