const d = document;
const URL_BASE = 'https://api.themoviedb.org/3/';
const URL_BASE_IMG = 'https://image.tmdb.org/t/p/w500';

const api = axios.create({
    baseURL: URL_BASE,
    headers: {
        'Content-Type': 'application/json;charset=uft-8',
    },
    params: {
        'api_key': API_KEY,
    },
});

async function getTrendingMoviesPreview(){

    const { data } = await api.get('trending/movie/day');

    const movies = data.results;
    appendMovies(movies, $trendingMoviesPreviewList);
}


async function getCategoriesPreview(){
    const { data } = await api.get('genre/movie/list');

    const categories = data.genres;

    let arrcategoriesPreviewList = [];
    $categoriesPreviewList.innerHTML = "";
    
    categories.forEach(category => {
      
        const divCategoryContainer = d.createElement('div');
        const categoryTitle = d.createElement('h3');

        divCategoryContainer.className = 'category-container';
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = category.name;
        categoryTitle.id = 'id' + category.id;

        categoryTitle.addEventListener('click', () => {
            location.hash = '#category=' + category.id  + '-' + category.name
        })


        divCategoryContainer.appendChild(categoryTitle);
        arrcategoriesPreviewList.push(divCategoryContainer);
    });
    
    $categoriesPreviewList.append(...arrcategoriesPreviewList);
}



async function getMoviesByCategory( id ) {

    const { data } = await api.get('discover/movie', {
      params: {
        with_genres: id
      }
    });
  
    const movies = data.results;
    appendMovies(movies, $genericSection);
  }


  
// Utils 

function appendMovies(movies, container) {
    container.innerHTML = '';
    let arrMovieContainer = [];

    movies.forEach( movie => {
        const divMovieContainer = d.createElement('div');
        divMovieContainer.className = 'movie-container';
        
        const imgMovie = d.createElement('img');
        imgMovie.className = 'movie-img';
        imgMovie.alt = movie.title;
        imgMovie.src = URL_BASE_IMG + movie.poster_path;
        
        divMovieContainer.appendChild(imgMovie);
        arrMovieContainer.push(divMovieContainer);
    });

    container.append(...arrMovieContainer)
}  

//getTrendingMoviesPreview();
//getCategoriesPreview();
