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


// Escuchar scroll para cargar peliculas
let page = 1;
window.addEventListener('scroll', loadMoreMovies)



async function getTrendingMoviesPreview(){

    const { data } = await api.get('trending/movie/day');

    const movies = data.results;
    appendMovies(movies, $trendingMoviesPreviewList);
}


async function getCategoriesPreview(){
    const { data } = await api.get('genre/movie/list');

    const categories = data.genres;
    appendCategories(categories, $categoriesPreviewList);
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


async function getMoviesBySearch( search ) {
    const { data } = await api.get('search/movie', {
        params: {
          query: search
        }
    });

    const movies = data.results;
    appendMovies(movies, $genericSection);
}


async function getTrendingMovies() {

    const { data } = await api.get('trending/movie/day');

    const movies = data.results;
    appendMovies(movies, $genericSection);
}


async function getMovieById(movieId) {
    const { data } = await api.get(`movie/${movieId}`);
    const categorias = data.genres;
    
    $movieDetailTitle.textContent = data.original_title;
    $movieDetailDescription.textContent = data.overview;
    $movieDetailScore.textContent = data.vote_average.toFixed(1);

    $movieDetailImg.src = URL_BASE_IMG + data.poster_path;
    // $headerSection.style.background = `
    //     url(${URL_BASE_IMG}${data.poster_path})
    //     center center no-repeat/200px auto
    //     linear-gradient(
    //         180deg, 
    //         rgba(0, 0, 0, 0.35) 19.27%, 
    //         rgba(0, 0, 0, 0) 29.17%
    //     )
    // `;
    

    appendCategories(categorias, $movieDetailCategoriesList);
    getRelatedMoviesById(movieId);
}


async function getRelatedMoviesById(movieId) {
    const { data } = await api.get(`movie/${movieId}/similar`);
    const movies = data.results;

    appendMovies(movies, $relatedMoviesContainer);
}


// Utils 
// Agregar peliculas
function appendMovies(movies, container, {
    scroll = false
} = {}) {
    
    if( !scroll ) container.innerHTML = '';

    let arrMovieContainer = [];

    movies.forEach( movie => {
        const divMovieContainer = d.createElement('div');
        divMovieContainer.className = 'movie-container';
        
        const imgMovie = d.createElement('img');
        imgMovie.className = 'movie-img';
        imgMovie.alt = movie.title;
        imgMovie.src = URL_BASE_IMG + movie.poster_path;
        imgMovie.addEventListener('click', () => {
            location.hash = 'movie=' + movie.id
        });
        
        divMovieContainer.appendChild(imgMovie);
        arrMovieContainer.push(divMovieContainer);
    });

    container.append(...arrMovieContainer)
}  

// Agregar categorias
function appendCategories(categories, container) {
    let arrcategoriesPreviewList = [];
    container.innerHTML = "";
    
    categories.forEach( category => {
      
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
    
    container.append(...arrcategoriesPreviewList);
}

// Cargar peliculas por scroll
async function loadMoreMovies() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const scrollValid = scrollHeight - clientHeight - 15;

    if( !(scrollTop >= scrollValid) ) {
        return;
    }


    page++;
    const { data } = await api.get('trending/movie/day', {
        params: {
            page
        }
    });


    const movies = data.results;
    appendMovies(movies, $genericSection, { scroll: true})
}
