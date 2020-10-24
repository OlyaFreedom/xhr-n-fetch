let successBtn = document.getElementById('goodRequest');
let dangerBtn = document.getElementById('badRequest');
let requestURL = new URL('https://jsonplaceholder.typicode.com/users');
let badRequestURL = new URL('https://jsonplaceholder.typicode.com/users-with-error');
const initialRatio = window.devicePixelRatio;

/* Requests */
successBtn.addEventListener('click', () => showData(requestURL))
dangerBtn.addEventListener('click', () => showData(badRequestURL))

/* Catch window zoom */
document.addEventListener('DOMContentLoaded', watchScale);
window.addEventListener("resize", watchScale);

function watchScale() {
    let scale = window.devicePixelRatio / initialRatio;
    let modal = document.querySelector('.xf-modal');

    if (scale >= 2.1 && !modal) {
        addModalMessage('See a doctor, pall', 'large');
        return;
    }
    if (scale <= 0.6 && !modal) {
        addModalMessage('WTF?!', 'small');
        return;
    }

    if (modal && scale < 2.1 && scale > 0.6) modal.remove();
}

async function getData(url) {
    let response = await fetch(url);

    if (response.ok) {
        return await response.json();
    }

    throw Error('Return with status ' + response.status);
}

function showData(url) {
    getData(url)
        .then(result => {
            let listUsers = result.reduce((acc, el) => {
                return acc + `ID: ${el.id}, Name: ${el.name}\n`;
            }, '');
            alert(listUsers);
        })
        .catch(e => {
            alert("Error: " + e.message)
        })
}

function addModalMessage(message, type) {
    let setting = {
        large: {
            image: 'img/doctor.png',
            imageAlt: 'Cartoon: doctor',
            class: 'scale-large'
        },
        small: {
            image: 'img/cat-pumpkin-icon.png',
            imageAlt: 'Cartoon: cat in pumpkin',
            class: 'scale-small'
        }
    }

    message = type == 'large' ? message : `
        <link href="https://fonts.googleapis.com/css?family=Raleway:300,500,700,900" rel="stylesheet">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="width: 0;height: 0;">
            <defs>
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                    <feBlend in="SourceGraphic" in2="goo" />
                </filter>
            </defs>
        </svg>    
        <div class="xf-modal__blood-title">
            WTF?!
            <span class="xf-modal__blood-drop"></span>
            <span class="xf-modal__blood-drop"></span>
            <span class="xf-modal__blood-drop"></span>
            <span class="xf-modal__blood-drop"></span>
            <span class="xf-modal__blood-drop"></span>
        </div>`;

    let modal = document.createElement('div');
    modal.className = `xf-modal xf-modal_${setting[type].class}`;
    let modalHTML = `
        <div class="xf-modal__body xf-modal__body_${setting[type].class} row">
            <div class="xf-modal__image col-6">
                <img src="${setting[type].image}" alt="${setting[type].imageAlt}">
            </div>
            <div class="xf-modal__message col-6">
                ${message}
            </div>
        </div>`;

    document.body.insertAdjacentElement('beforeend', modal);
    modal.insertAdjacentHTML('afterbegin', modalHTML);
    setTimeout(() => modal.classList.add('visible'), 0);
}