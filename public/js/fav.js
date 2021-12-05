function getfromLS() {
    let movies;
    if (localStorage.getItem('movies') === null) {
        movies = []
    } else {
        movies = JSON.parse(localStorage.getItem('movies'));
    } return movies;
}

const favoritesTable = document.querySelector('#favorites');
if (favoritesTable) {
    const movies = getfromLS();
    displayFavorites(movies);
}

favoritesTable.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('remove-movie')) {
        //Remove from DOM
        //console.log(e.target.parentElement.parentElement);
        removeFavorites(e.target.parentElement.parentElement);

        //Remove from LocalStorage
        removeFromLS(e.target.getAttribute('data-id'));

    }
})

//Remove movie from DOM
function removeFavorites(element) {
    element.remove();
}


// function isFav(){
//     const movies = getfromLS();
//     movies.forEach(movie => {
//         let {id} = movie;
//         let favoritesMovies =  document.querySelector(`[data-id=${id}]`);
//         if (favoritesMovies){
//             favoritesMovies.classList.add('is-fav');
//             favoritesMovies.textContent ='MY LIST-';
//         }
//     })
// }

//Remove movie from lcoalStorage
function removeFromLS(id) {

    const movies = this.getfromLS();
    //loop
    movies.forEach((movie, index) => {
        if (id === movie.id) {
            movies.splice(index, 1);
        }
    });
    //set Array into localStorage
    localStorage.setItem('movies', JSON.stringify(movies));
}



function displayFavorites(favorites) {
    const favoritesTable = document.querySelector('#favorites tbody');
    favorites.forEach(movie => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td class="p-2 md:border md:border-gray-500">${movie.title}</td>
        <td class="p-2 md:border md:border-gray-500">
        <button class="bg-black text-white py-1 px-2 rounded my-1 w-28 data-id="${movie.id}"  onclick="location.href = '/${movie.id}' ">link</button>
        <button class="bg-red-700 text-white my-1 w-28 py-1 px-2 rounded remove-movie" data-id="${movie.id}">Remove</button>
        </td>`;
        favoritesTable.appendChild(tr);
    });
}