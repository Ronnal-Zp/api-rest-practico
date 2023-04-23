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


// listener of scroll trending movies
let page = 1;
let maxPages;


// lazyloader for img movies
const lazyLoader = new IntersectionObserver( (entries, observer) => {

    entries.forEach((item) => {
        const movieElement = item.target;

        if(item.isIntersecting) {
            const urlImg = movieElement.getAttribute('data-img');
            if(urlImg) movieElement.setAttribute('src', urlImg);
        }
    })
})



async function getTrendingMoviesPreview(){

    const { data } = await api.get('trending/movie/day');

    const movies = data.results;
    appendMovies(movies, $trendingMoviesPreviewList, {lazyLoad: true});
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
    appendMovies(movies, $genericSection, { lazyLoad: true });
}


async function getTrendingMovies() {

    const { data } = await api.get('trending/movie/day');

    const movies = data.results;
    maxPages = data.total_pages;

    appendMovies(movies, $genericSection, {lazyLoad: true, scroll: true});
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
    scroll = false,
    lazyLoad = false
} = {}) {
    
    if( !scroll ) container.innerHTML = '';

    let arrMovieContainer = [];

    movies.forEach( movie => {
        const divMovieContainer = d.createElement('div');
        divMovieContainer.className = 'movie-container';
        
        const imgMovie = d.createElement('img');
        imgMovie.className = 'movie-img';
        imgMovie.alt = movie.title;

        const urlImg = URL_BASE_IMG + movie.poster_path;

        // lazyload img
        (lazyLoad) 
            ? imgMovie.setAttribute('data-img', urlImg) 
            : imgMovie.setAttribute('src', urlImg); 

        // show movie
        imgMovie.addEventListener('click', () => {
            location.hash = 'movie=' + movie.id
        });


        // imgMovie.addEventListener('error', (e) => {
        //     console.log(e)
        // })

        lazyLoader.observe(imgMovie)
        
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
    
    const scrolled = scrollTop + clientHeight;
    const maxScroll = scrollHeight - 15;

    if( scrolled < maxScroll || page >= maxPages ) {
        return;
    }


    page++;
    const { data } = await api.get('trending/movie/day', {
        params: {
            page
        }
    });


    const movies = data.results;
    appendMovies(movies, $genericSection, { scroll: true, lazyLoad: true})
}
