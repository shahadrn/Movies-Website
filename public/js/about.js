const movie_tr = 'https://api.themoviedb.org/3/movie/';
const api_key = '306d0a0bc33adf1b7f7c21641ec3bf21';
const imgUrl = 'https://image.tmdb.org/t/p/w500';
const original_imgUrl = 'https://image.tmdb.org/t/p/original';

const movieId = location.pathname;

console.log(movieId);

//Axois for Show movie by ID
axios(`${movie_tr}${movieId}?` + new URLSearchParams({
    api_key : api_key
}))
.then(res => res.data)
.then(data => {
    console.log(`movieId`, data);
    movieInfobyId(data);
})

const movieInfobyId = (data) => {

    const movieName = document.querySelector('.movie-name');
    const genres = document.querySelector('.genres');
    const desc = document.querySelector('.desc');
    const title = document.querySelector('title');
    const backdrop = document.querySelector('.movie-info');
    const vote = document.querySelector('.vote');

    title.innerHTML = movieName.innerHTML = data.title; // to change Title based on the user's choice

    var today = new Date();
    var year = today.getFullYear();

    //console.log(data.release_date.split('-')[0] );

    // check newst Movie
    if(data.release_date.split('-')[0] == year){
        genres.innerHTML = `${data.release_date.split('-')[0]} new | `; //to Get release Year
    } else {
        genres.innerHTML = `${data.release_date.split('-')[0]} | `; //to Get release Year
    }


    for(let i = 0 ; i < data.genres.length ; i ++){
        genres.innerHTML +=  data.genres[i].name + formatString(i , data.genres.length);
    } // genres type


    // to Ckeck if Suitable for kids or not
    if (data.adult == true){
        genres.innerHTML += ' | +18';
    } else {
        genres.innerHTML += ' | +16';
    }

    //genres.style.backgroundColor= 'red';
    vote.innerHTML +=`  ${data.vote_average} `

    if (data.backdrop_path == null ){
        data.backdrop_path = data.poster_path;
    }

    // to get Overview
    desc.innerHTML = data.overview.substring(0, 160) + "...";

    backdrop.style.backgroundImage= `url(${original_imgUrl}${data.backdrop_path})`;

    // const fav = document.querySelector('.addFav');
    // fav.addEventListener('click' , () => {
    
    // fav.innerHTML = `<button type="button" onclick="movieSeleced(${data.id})">MY LIST+</button>`;
    // })

    const fav = document.querySelector('.addFav');    
    fav.innerHTML = `<button type="button" onclick="movieSeleced(${data.id})">MY LIST+</button>`;
}

const movieSeleced  = (id) => {
    localStorage.setItem('MovieID', id);
    window.location = 'favorite.html';
    return false;

}

const getFav = () => {
    const favMoiveChoice = localStorage.getItem('MovieID');

    axios(`${movie_tr}${favMoiveChoice}?` + new URLSearchParams({
        api_key : api_key
    }))
    .then(res => res.data)
    .then(data => {
        console.log(data);
        const cardMovie = document.querySelector('.fav-container');
        cardMovie.innerHTML +=`
        <div class="moviebyId"> 
            <img src="${imgUrl}${data.backdrop_path}" class="imgLikeThis"  alt="">
            <p class="moive-title mb-10">${data.title}</p>
        </div>
        `;
    } )


}

const formatString = (cureentInx , maxInx) => {
    return (cureentInx == maxInx - 1) ? '..' : ', ';
}

//Get the cast and crew for a movie.
axios(`${movie_tr}${movieId}/credits?` + new URLSearchParams({
    api_key : api_key
}))
.then(res => res.data)
.then(data => {
    console.log(`cast`, data);
    const cast = document.querySelector('.cast');
    for(let i = 0 ; i < 5 ; i++){
        cast.innerHTML +=`
        <span>${data.cast[i].name + formatString(i , 5)}</span>`;   
    }
})


//Get the cast and crew for a movie.
axios(`${movie_tr}${movieId}/videos?` + new URLSearchParams({
    api_key : api_key
}))
.then(res => res.data)
.then(data => {
    console.log(`movieTrailer`,data);
    const trailerVideo = document.querySelector('.trailer-movie');
    const mxVideo = (data.results.length > 3) ? 3 : data.results.length;

    if (data.results.length == 0 ){
        trailerVideo.innerHTML +=`<h3 class"WranningMsg">Unfortunately, there is no video for this movie</h3>`;

    } else {

    
    
    for(let i = 0 ; i < mxVideo ; i++){
            trailerVideo.innerHTML +=`
        <iframe src="https://youtube.com/embed/${data.results[i].key}" 
        title="YouTube video player" 
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen></iframe>
        `;
        
    }
}
})



//Get recommendations.
axios(`${movie_tr}${movieId}/recommendations?` + new URLSearchParams({
    api_key : api_key
}))
.then(res => res.data)
.then(data => {
    console.log(`recommendations`,data);
    let moreLike = document.querySelector('.recommendation-container');
    for (let i = 0 ; i < 10 ; i++) {
        if(data.results[i].backdrop_path == null ) {
            i++;
        }
        moreLike.innerHTML +=`
        <div class="moviebyId" onclick="location.href = '/${data.results[i].id}'"> 
            <img src="${imgUrl}${data.results[i].backdrop_path}" class="imgLikeThis"  alt="">
            <p class="moive-title mb-10">${data.results[i].title}</p>
        </div>`;
    }
})




    
    
