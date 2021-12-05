const bar = document.querySelector('#bar');
const menu = document.querySelector('#menu');



bar.addEventListener('click', () => {
    if (menu.classList.contains('hidden') && window.innerWidth < 768) {
        menu.classList.remove('hidden');
        menu.classList.add(
            'flex',
            'flex-col',
            'text-center',
            'bg-gray-900',
            'w-full',
            'absolute',
            'top-16'
        );
    } else {
        menu.classList.add('hidden');
    }
});

// menu.addEventListener('click', () => {
//     menu.classList.add('hidden');
// })

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        menu.classList.add('hidden');
        menu.classList.remove(
            'flex',
            'flex-col',
            'text-center',
            'bg-gray-900',
            'w-full',
            'absolute',
            'top-16'
        );
    }
})




// axios ({
//     url: '/users',
//     baseURL: 'https://jsonplaceholder.typicode.com',
//     method: 'get'
// })

// .then((response) => {
//     console.log(response.data)
// }).catch((err) => {
//     console.log(err)
// }).then(() => {
//     console.log('end http request')
// })

