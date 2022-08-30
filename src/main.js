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
    const { data } = await api('trending/movie/day');
    
    const movies = data.results;

    let articleImgsContainer = d.querySelector('#trendingPreview .trendingPreview-movieList');

    movies.forEach(movie => {
       const divMovieContainer = d.createElement('div');
       divMovieContainer.className = 'movie-container';
       
       const imgMovie = d.createElement('img');
       imgMovie.className = 'movie-img';
       imgMovie.alt = movie.title;
       imgMovie.src = URL_BASE_IMG + movie.poster_path;
       
       divMovieContainer.appendChild(imgMovie);

       articleImgsContainer.appendChild(divMovieContainer);
    });

}


async function getCategoriesPreview(){
    const { data } = await api('genre/movie/list');

    const categories = data.genres;
    console.log(data, categories);

    let articleCategoriesPreview = d.querySelector('#categoriesPreview .categoriesPreview-list');

    categories.forEach(category => {
      
        const divCategoryContainer = d.createElement('div');
        const h3 = d.createElement('h3');

        divCategoryContainer.className = 'category-container';
        h3.className = 'category-title';
        h3.textContent = category.name;
        h3.id = 'id' + category.id;

        divCategoryContainer.appendChild(h3);

        articleCategoriesPreview.appendChild(divCategoryContainer);
    });

}


getTrendingMoviesPreview();
getCategoriesPreview();
