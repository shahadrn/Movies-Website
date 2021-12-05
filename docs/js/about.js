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
.then(res => {
    res.data
    console.log(`movieId`, res.data);
    movieInfobyId(res.data);
})
.catch(err => console.log(err));


const movieInfobyId = (data) => {
    const movieName = document.querySelector('.movie-name');
    const genres = document.querySelector('.genres');
    const desc = document.querySelector('.desc');
    const title = document.querySelector('title');
    const backdrop = document.querySelector('.movie-info');
    const vote = document.querySelector('.vote');

    title.textContent = movieName.innerHTML = data.title; // to change Title based on the user's choice

    var today = new Date();
    var year = today.getFullYear();

    //console.log(data.release_date.split('-')[0] );

    // check newst Movie
    if(data.release_date.split('-')[0] == year){
        genres.textContent = `${data.release_date.split('-')[0]} new | `; //to Get release Year
    } else {
        genres.textContent = `${data.release_date.split('-')[0]} | `; //to Get release Year
    }


    for(let i = 0 ; i < data.genres.length ; i ++){
        genres.textContent +=  data.genres[i].name + formatString(i , data.genres.length);
    } // genres type


    // to Ckeck if Suitable for kids or not
    if (data.adult == true){
        genres.textContent += ' | +18';
    } else {
        genres.textContent += ' | +16';
    }

    //genres.style.backgroundColor= 'red';
    vote.textContent +=`${data.vote_average}`

    if (data.backdrop_path == null ){
        data.backdrop_path = data.poster_path;
    }

    // to get Overview
    desc.textContent = data.overview.substring(0, 200) + "...";

    backdrop.style.backgroundImage= `url(${original_imgUrl}${data.backdrop_path})`;

    // const fav = document.querySelector('.addFav');
    // fav.addEventListener('click' , () => {
    
    // fav.innerHTML = `<button type="button" onclick="movieSeleced(${data.id})">MY LIST+</button>`;
    // })

    


    const fav = document.querySelector('.addFav');    
    fav.innerHTML += `
    <button type="button" data-id="${data.id}" class=" mb-1 bg-red-700 text-white w-24 h-8 font-normal center hover:text-black ml-7 btn-fav" >MY LIST+</button>`;
    if(fav){
        fav.addEventListener('click', addFav);

    }
    isFav();

    function addFav(e)  {
        e.preventDefault();
        if(e.target.classList.contains('btn-fav')) {
            if(e.target.classList.contains('is-fav')) {
                e.target.classList.remove('is-fav');
                e.target.textContent='MY LIST+';
                //console.log('removed')
                removeFromLS(e.target.getAttribute('data-id'));

            }else{
                e.target.classList.add('is-fav');
                e.target.textContent='MY LIST-';
                //console.log('added');

                const cardbody = e.target.parentElement;
                const infoFav = {
                    id : e.target.getAttribute('data-id'),
                    title : cardbody.querySelector('.movie-name').textContent
                }
                console.log(infoFav)
                //console.log(e.target.parentElement)
                saveLS(infoFav);
                
            }
        }
    }

    function saveLS(movie){
        const movies = getfromLS();
        movies.push(movie);
        localStorage.setItem('movies', JSON.stringify(movies))

    }


    //Remove movie from lcoalStorage
    function removeFromLS(id) {

        const movies = getfromLS();
        //loop
        movies.forEach((movie, index) => {
            if (id === movie.id) {
                movies.splice(index, 1);
            }
        });
        //set Array into localStorage
        localStorage.setItem('movies', JSON.stringify(movies));
    }

    function isFav(){
        const movies = getfromLS();
        movies.forEach(movie => {
            let {id} = movie;
            let favoritesMovies =  document.querySelector(`[data-id="${id}"]`);
            if (favoritesMovies){
                favoritesMovies.classList.add('is-fav');
                favoritesMovies.textContent ='MY LIST-';
            }
        })
    }
    
    function getfromLS(){
        let movies;
        if(localStorage.getItem('movies') === null){
            movies =[]
        } else{
            movies = JSON.parse(localStorage.getItem('movies'));
        } return movies;
    }
}


const formatString = (cureentInx , maxInx) => {
    return (cureentInx == maxInx - 1) ? '.' : ', ';
}

//Get the cast and crew for a movie.
axios(`${movie_tr}${movieId}/credits?` + new URLSearchParams({
    api_key : api_key
}))
.then(res => {
    res.data
    console.log(`cast`,  res.data);
    const cast = document.querySelector('.cast');
    for(let i = 0 ; i < 5 ; i++){
        cast.textContent +=`
        ${res.data.cast[i].name + formatString(i , 5)}`;
    }
}).catch(err => console.log(err));


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




    
    
