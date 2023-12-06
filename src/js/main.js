
/*****************************/
/*****final project***********/
/*****************************/

function changeText(label) {
    const phrase = label.textContent;
    let text = '';
    for (const item of phrase) {
        if (item!==' ') {
            text += `
            <b>${item}</b>
            `;
        } else {
            text += `
            <u>${item}</u>
            `;
        }
    }
    label.innerHTML = text;
}
function animateText(label) {
    const text = document.querySelectorAll('b');
    let i = 0;
    const print = setInterval(() => {
        text[i].classList.toggle('zoom');
        i++;
        if(i >= text.length){
            clearInterval(print);
            i = 0;
            const clear = setInterval(() => {
                text[i].classList.toggle('zoom');
                i++;
                if(i >= text.length){
                    clearInterval(clear);
                }
            }, 200);
        }
    }, 200);
}
function skills(){
    const skill = document.querySelector('.slider__skills');
    const list = document.querySelectorAll('.slider__skills img');
    const images = Array.from(list).map(element => element.getAttribute('src'));
    console.log(images);
    let count = 0;
    let html = `<img src="${images[count]}" alt="hard skill">`;
    skill.innerHTML = html;
    const prev = document.querySelector('.btn__prev');
    const next = document.querySelector('.btn__next');
    prev.addEventListener('click', () => {
        clearInterval(interval)
        if (0 < count) {
        count--; 
        }else{
        count = images.length-1;
        }
    html = `<img src="${images[count]}" alt="hard skill">`;
    skill.innerHTML = html;});
    next.addEventListener('click', () => {
        clearInterval(interval)
        if (count < images.length-1) {
            count++; 
        }else{
            count = 0;
        }
        html = `<img src="${images[count]}" alt="hard skill">`;
        skill.innerHTML = html;
    });
    const interval = setInterval(() => {
        if (count < images.length-1) {
            count++; 
        }else{
            count = 0;
        }
        html = `<img src="${images[count]}" alt="hard skill">`;
        skill.innerHTML = html;
    }, 2000);
}
function mode(){
    const body = document.querySelector('body');
    const btn = document.querySelector('.icon__mode');
    const icon = document.querySelector('.icon__mode ion-icon');
    const iframe = document.querySelector('.header iframe');
    const link = iframe.contentDocument.querySelector('link');
    btn.addEventListener('click', () => {
        body.classList.toggle('dark');
        if (icon.name==='sunny') {
            icon.name = 'moon';
        } else {
            icon.name = 'sunny';
        }
        if (link.getAttribute('href') === './src/particles/dark.css') {
            link.href = './src/particles/bright.css';
        } else {
            link.href = './src/particles/dark.css';
        }
    });
}
function sound(){
    const btn = document.querySelector('.icon__volume');
    const icon = document.querySelector('.icon__volume ion-icon');
    const audio = document.querySelector('.icon__volume audio');
    btn.addEventListener('click', () => {
        if (icon.name==='volume-mute') {
            icon.name = 'volume-high'
        } else {
            icon.name = 'volume-mute'
        }
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    })
}
function social() {
    const h1 = document.querySelector('h1');
    const nav = document.querySelector('.header__nav');
    const footer = document.querySelector('.footer');
    footer.classList.toggle('active');
    changeText(h1);
    animateText(h1);
    setTimeout(() => {
        footer.classList.toggle('active');  
    }, 2000);
    nav.addEventListener('click', () => {
        footer.classList.toggle('active');
        animateText(h1);
        setTimeout(() => {
            footer.classList.toggle('active');  
        }, 2000);
    })
}
async function getApi () {
    const url = 'https://fundametos-api-porfolios-dev-exsn.2.ie-1.fl0.io/api/v1/projects';
    try {
        const data = await fetch(url);
        const res = await data.json();
        localStorage.setItem('projects', JSON.stringify(res));
        return res;
    } catch (error) {
       console.log(error); 
    }
}
function printProjects(projects) {
    const list = document.querySelectorAll('.splide__slide');
    const path = location.href.split('/').at(-1).at(0);
    projects.forEach((project, i) => {
        console.log(project);
        const { descripcion, image, tecnologias, titulo, 
        description, technologies, title } = project;
        let html = '';
        if (path==='e') {
            html = `
            <div>
                <h3>${title}</h3>
                <p>${description}</p>
                <p>${technologies}</p>
            </div>
            <figure>
                <img src="${image}" alt="slider item">
            </figure>
        `;
        } else {
            html = `
            <div>
                <h3>${titulo}</h3>
                <p>${descripcion}</p>
                <p>${tecnologias}</p>
            </div>
            <figure>
                <img src="${image}" alt="slider item">
            </figure>
        `;
        }
        
        list[i].innerHTML = html;
    });
}
function slider(){
    const splide = new Splide( '.splide', {
        type   : 'loop',
        autoplay: true,
        interval: 3000,
        breakpoints: {
            849: {
                direction: 'ttb',
                height: '65vh'
            },
      }
      }  );
    splide.mount();
}
async function main() {
    const projects = JSON.parse(localStorage.getItem
    ('projects')) || await getApi();
    printProjects (projects);
    skills();
    mode();
    sound();
    social();
    slider();
}
main();