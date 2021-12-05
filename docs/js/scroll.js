const setScrolling = () => {
    const container = [...document.querySelectorAll('.movieContainer')];
    const nxtbtn = [...document.querySelectorAll('.nxt-btn')];
    const brebtn = [...document.querySelectorAll('.pre-btn')];


    container.forEach((item, i) => {
        let containerDi = item.getBoundingClientRect();
        let containerw = containerDi.width;


        nxtbtn[i].addEventListener('click', () => {
            item.scrollLeft += containerw;
        })

        brebtn[i].addEventListener('click', () => {
            item.scrollLeft -= containerw;
        })
    })
    }

