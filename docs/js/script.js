const api_key = '306d0a0bc33adf1b7f7c21641ec3bf21';
const imgUrl = 'https://image.tmdb.org/t/p/w500';
const genresList = 'https://api.themoviedb.org/3/genre/movie/list?';
const movieGenres = 'https://api.themoviedb.org/3/discover/movie?';
const main = document.querySelector('.main');


axios(genresList + new URLSearchParams({
    api_key: api_key
}))
    .then(res => {
        console.log(`Our genres`,res.data)
        res.data.genres.forEach(item => {
            // to get Id, name for each genres
            axiosMoviesList(item.id, item.name);
        })
    });


//function will take each genres
const axiosMoviesList = (id, genres) => {
    axios(movieGenres + new URLSearchParams({
        api_key: api_key,
        with_genres: id,
        //page : 10
    }))
    .then(res => {
        // to print movieGenres with id
        console.log(`${genres}_movies`, id, res.data.results);
        makeCategories(`${genres}_movies`, res.data.results);
    })
    .catch(err => console.log(err));
}

// categories section
const makeCategories = (category, data) => {
    main.innerHTML += `
    <div class="movie-list">
        <button class="pre-btn"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h2 class="movie-category">${category.split("_").join(" ")}</h2>
        <div class="movieContainer" id=${category}>
        </div>

        <button class="nxt-btn"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>

    </div>`;
    makeCards(category, data);

}

const makeCards = (idNmame, data) => {
    const movieContainer = document.getElementById(idNmame);
    data.forEach((item, i) => {
        // if (localStorage.getItem('oviecard') == null){
        //     localStorage.setItem('oviecard', '[]');
        // }
        // var da= JSON.parse(localStorage.getItem('oviecard'));
        // da.push(item);
        // localStorage.setItem('oviecard', JSON.stringify(da));
        // console.log(`local`,da)
        // window.localStorage.setItem('movieCard', JSON.stringify(item));
        // let y = localStorage.getItem('movieCard');
        // let z = JSON.parse(y);
        if (item.backdrop_path == null) {
            item.backdrop_path = item.poster_path;
            if (item.backdrop_path == null) {
                return;
            }
        }

        movieContainer.innerHTML += `
        <div class="movie" onclick="location.href = '/${item.id}'">
            <img src="${imgUrl}${item.backdrop_path}" alt="">
            <p class="moive-title">${item.title}</p>
        </div>`;

        if (i == data.length - 1) {
            setTimeout(() => {
                setScrolling();
            }, 100);
        }
    })
}

    // axios(movieGenres + new URLSearchParams({
    //     api_key : api_key
    // }))
    // .then(res =>  res.data)
    //   .then(data => {
    //       console.log(`imgBack`,data.results)

    //       //data.results = Math.floor(Math.random() * 3)  + 1;
    //       const dd = data.results[0] 
    //       console.log(`dfgh`,dd)


    //           bck = document.querySelector('.backg');

    //           dd.bck.innerHTML += `<img src="${imgUrl}${item.backdrop_path}" class="w-full h-96 flex center" />`;


    //   });


