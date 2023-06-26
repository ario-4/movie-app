const api_url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=85802d99b0caa119163bbfa22b00a972&page=1'
const img_path = 'https://image.tmdb.org/t/p/w1280'
const search_api = 'https://api.themoviedb.org/3/search/movie?api_key=85802d99b0caa119163bbfa22b00a972&query="'
const main = document.querySelector('.contaner')
let search = document.getElementById('search')
const form = document.getElementById('form')
getmovie(api_url)

async function getmovie(url) {
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results)
}


function showMovies(movies) {
    main.innerHTML = ''
    movies.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML =
            ` <div class="img">
         <img src="${img_path + poster_path}" alt="${title}">
     </div>
     <div class="title">
         <h2>${title}</h2>
         <span class="${getClassByRate(vote_average)}">${vote_average}</span>
     </div>
     <div class="overview">
         <h3>overview</h3>
        ${overview}
     </div>`
        main.appendChild(movieEl)
    })

}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green'

    }
    else if (vote >= 5) {
        return 'orange'
    }
    else {
        return 'red'
    }

}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let searchTerm = search.value;


    if (searchTerm && searchTerm !== '') {
        getmovie(search_api + searchTerm)
        search.value = ''

    }
    else {
        window.location.reload();
    }
})
