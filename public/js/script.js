const api_key = '306d0a0bc33adf1b7f7c21641ec3bf21';
const imgUrl = 'https://image.tmdb.org/t/p/w500';
const genresList = 'https://api.themoviedb.org/3/genre/movie/list?';
const movieGenres = 'https://api.themoviedb.org/3/discover/movie?';
const main = document.querySelector('.main');

//const url = genres + apiKey;
//const urlGenres = movieGenres + apiKey + with-genres


axios(genresList + new URLSearchParams({
    api_key : api_key
}))
.then(res =>  res.data)
  .then(data => {
      console.log(data.genres)
      data.genres.forEach(item => {
          axiosMoviesList(item.id, item.name);
          
      });
  });


  const axiosMoviesList = (id , genres) => {
      axios(movieGenres + new URLSearchParams({
          api_key : api_key,
          with_genres : id,
          //page : Math.floor(Math.random() * 3)  + 1
      }))
      .then(res =>  res.data)
      .then(data => {
          console.log(data)
        makeCategories(`${genres}_movies` , data.results);
  })
  .catch(err => console.log(err));
}

const makeCategories = (category , data) => {
    main.innerHTML +=`
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

    </div>
    `;
    makeCards(category, data);

    }

    const makeCards = (id, data) => {
        const movieContainer = document.getElementById(id);
        data.forEach((item , i) => {
            if(item.backdrop_path == null){
                item.backdrop_path = item.poster_path;
                if(item.backdrop_path == null){
                    return;
                }
            }

            movieContainer.innerHTML +=`
            <div class="movie" onclick="location.href = '/${item.id}'">
                <img src="${imgUrl}${item.backdrop_path}" alt="">
                <p class="moive-title">${item.title}</p>
            </div>
            `;

            if (i == data.length - 1) {
                setTimeout(() => {
                    setScrolling();
                }, 1000);
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



//   .catch(err => console.log(err))


// const apiKey = 'api_key=306d0a0bc33adf1b7f7c21641ec3bf21';
// const baseURL = 'https://api.themoviedb.org/3';
// const getURL = baseURL + '/movie/popular?' + apiKey;
// const imgUrl = 'https://image.tmdb.org/t/p/w500';
// const searchURL = baseURL + '/search/movie?'+ apiKey;
// const container = document.getElementById('movie');
// const form = document.getElementById('form');
// const search = document.getElementById('search');


// getMovie(getURL);

// function getMovie(url) {
//     axios(url)
//   .then(res =>  res.data)
//   .then(data => {
    
//     showMovies(data.results);
//   })
//   .catch(err => console.log(err))
// }
// function showMovies(data){
//     //main.innerHTML = '';

//     data.forEach(movie => {
//         const { id, title, poster_path, overview, release_date, vote_average } = movie;
//         //const movieEL = document.createElement('div');
//         let movieEL = `
//         <label for="my-modal-${id}">
//         <div class="flex flex-col bg-white m-3 shadow-md md:w-full lg:w-72">
//           <img src="${imgUrl+poster_path}" alt="${title}" class="h-42">
//           <h2 class="text-center p-6">${title}</h2>
//       </div>
//       </label>
//       <input type="checkbox" id="my-modal-${id}" class="modal-toggle">
//       <div class="modal">
//         <div class="modal-box">
//           <p>${overview}</p>
//           <div class="modal-action">
//             <label for="my-modal-${id}" class="btn">X</label>
//           </div>
//         </div>
//       </div>`;
//         container.innerHTML +=movieEL;
//     });

// };


// form.addEventListener('submit' , (e) =>{
//     e.preventDefault();

//     const searchTerm = search.value;
//     if (searchTerm) {
//         getMovie(searchURL+'&query='+search);
//     } else {
//          getMovie(getURL);
//         }
//  });



// const apiKey = 'api_key=306d0a0bc33adf1b7f7c21641ec3bf21';
// const baseURL = 'https://api.themoviedb.org/3';
// const getURL = baseURL + '/movie/popular?' + apiKey;
// const imgUrl = 'https://image.tmdb.org/t/p/w500';
// const searchURL = baseURL + '/search/movie?'+ apiKey;
// const container = document.getElementById('movie');
// const search = document.getElementById('search');
// let state =[];

// search.addEventListener('keyup' , (event) => {
//     //searchState(search.value));
//     const searchText = event.target.value.toLowerCase();
//     console.log(searchText);
    

//     const filterText = state.filter(states => {
//         return (
//             states.title.toLowerCase().includes(searchText)
//         );
//     });
//     console.log(filterText)
//     showMovies(filterText);

// });

// function getMovie(url) {
//     axios(url)
//   .then(res =>  res.data)
//   .then(data => {
    
//     state = data.results;
//     showMovies(state);

//   })
//   .catch(err => console.log(err))
// }

// function showMovies(data){
//     //main.innerHTML = '';

//     data.forEach(movie => {
//         const { id, title, poster_path, overview, release_date, vote_average } = movie;
//         //const movieEL = document.createElement('div');
//         let movieEL = `
//         <label for="my-modal-${id}">
//         <div class="flex flex-col bg-white m-3 shadow-md md:w-full lg:w-72">
//           <img src="${imgUrl+poster_path}" alt="${title}" class="h-42">
//           <h2 class="text-center p-6">${title}</h2>
//       </div>
//       </label>
//       <input type="checkbox" id="my-modal-${id}" class="modal-toggle">
//       <div class="modal">
//         <div class="modal-box">
//           <p>${overview}</p>
//           <div class="modal-action">
//             <label for="my-modal-${id}" class="btn">X</label>
//           </div>
//         </div>
//       </div>`;
//         container.innerHTML +=movieEL;
//     });

// };
//getMovie(getURL);
