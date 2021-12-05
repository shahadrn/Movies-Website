const api_key = 'api_key=306d0a0bc33adf1b7f7c21641ec3bf21';
const baseURL = 'https://api.themoviedb.org/3';
const getURL = baseURL + '/movie/popular?' + api_key;
const imgUrl = 'https://image.tmdb.org/t/p/w500';
const searchURL = baseURL + '/search/movie?'+ api_key;

const main = document.getElementById('main');
const form =  document.getElementById('form');
const search = document.getElementById('search');


getMovie(getURL);

form.addEventListener('submit' , (e) =>{
    e.preventDefault();

    const searchTerm = search.value;
    if (searchTerm) {
        getMovie(searchURL+'&query='+searchTerm);
    }  else {
        getMovie(getURL);


    }
 });


function getMovie(url) {
    axios(url)
  .then(res =>  
    showMovies(res.data.results))
 .catch(err => console.log(err))
}


function showMovies(data) {
    main.innerHTML = '';

    data.forEach(data => {
        let movieEl = `
        <div class="bg-gray-100 h-64 m-3 rounded">
            <img src="${imgUrl+data.poster_path}" class="w-80 h-52 rounded-t" alt="">
            <p class="mo center text-gray-900 pt-1 font-semibold">${data.title}</p>
        </div>`;

        main.innerHTML +=movieEl;


    })

}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    if(searchTerm) {
        getMovie(searchURL+'&query='+searchTerm)
    }else{
        getMovie(getURL);
    }

})



