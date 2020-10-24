let successBtn = document.getElementById('goodRequest');
let dangerBtn = document.getElementById('badRequest');
let requestURL = new URL('https://jsonplaceholder.typicode.com/users');
let badRequestURL = new URL('https://jsonplaceholder.typicode.com/users-with-error');

successBtn.addEventListener('click', () => showData(requestURL))
dangerBtn.addEventListener('click', () => showData(badRequestURL))

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

