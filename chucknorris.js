const getjoke = document.querySelector('.get-jokes')
const jonks = document.querySelector('.jokes');
const jokeList = document.querySelector('.favorites');


// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    jonks.addEventListener('click', addFavorites);
    getjoke.addEventListener('click', getJokes);
    jokeList.addEventListener('click', removeJoke);
    document.addEventListener('DOMContentLoaded', showJokes);
}

// LOAD JOKE FROM API
function getJokes(e) {
    const xhr = new XMLHttpRequest();
    const number = document.querySelector('input[type="number"]').value;
    const firstName = document.querySelector('#firstName').value;
    const lastName = document.querySelector('#lastName').value;
    xhr.open('GET', `http://api.icndb.com/jokes/random/${number}?firstName=${firstName}&lastName=${lastName}`, true);

    xhr.onload = function () {
        if (this.status === 200) {
            const response = JSON.parse(this.responseText).value;
            let output = '';
            response.forEach(function (joke) {
                output += `<div class="card card-content center hoverable"><p href="#" class="jokes">${joke.joke}<br></p></div>`;
            });
            document.querySelector('.jokes').innerHTML = output;
        }
    };

    xhr.onerror = function () {
        console.log('Request error...');
    };

    xhr.send();
    e.preventDefault();
}

// ADD TO FAVORITES
function addFavorites(e) {
    // console.log('Added to favorites')
    if (e.target) {
        StoreJoke(e.target.textContent);
    }
    const link = document.createElement('div');
    link.className = 'card delete-item card-title';
    link.innerHTML = '<i class = "fa fa-times-circle right"></i>';
    const div = document.createElement('div');
    div.className = 'card-content';
    div.appendChild(document.createTextNode(e.target.textContent));
    link.appendChild(div);
    jokeList.appendChild(link);

    badge = parseInt(document.querySelector('#badge').textContent);
    badge++;
    document.querySelector('#badge').textContent = badge;
    e.preventDefault();

}

// STORE IN LOCAL STORAGE
function StoreJoke(joke) {
    let jokes;
    if (localStorage.getItem('jokes') === null) {
        jokes = [];
    } else {
        jokes = JSON.parse(localStorage.getItem('jokes'));
    }
    jokes.push(joke);
    localStorage.setItem('jokes', JSON.stringify(jokes));
}

// DISPLAY JOKES FROM LOCAL STORAGE
function showJokes() {
    let jokes;
    if (localStorage.getItem('jokes') === null) {
        jokes = [];
    } else {
        jokes = JSON.parse(localStorage.getItem('jokes'));
    }
    let badge = 0;
    jokes.forEach(function (joke) {
        const link = document.createElement('div');
        link.className = 'card delete-item card-title';
        link.innerHTML = '<i class = "fa fa-times-circle right"></i>';
        const div = document.createElement('div');
        div.className = 'card-content';
        div.appendChild(document.createTextNode(joke));
        link.appendChild(div);
        jokeList.appendChild(link);
        badge++;

    });
    // console.log(badge);
    document.querySelector('#badge').textContent = badge;
}

// REMOVE JOKES FROM DISPLAY
function removeJoke(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure?')) {
            e.target.parentElement.remove();
            // remove from local storage
            removeJokeFromLocalStorage(e.target.parentElement);
            badge = parseInt(document.querySelector('#badge').textContent);
            badge--;
            document.querySelector('#badge').textContent = badge;
        }
    }
}

// REMOVE JOKE FROM LOCAL STORAGE
function removeJokeFromLocalStorage(JokeContent) {
    let jokes;
    if (localStorage.getItem('jokes') === null) {
        jokes = [];
    } else {
        jokes = JSON.parse(localStorage.getItem('jokes'));
    }

    jokes.forEach(function (joke, index) {
        if (JokeContent.textContent === joke) {
            jokes.splice(index, 1);
        }
    });
    localStorage.setItem('jokes', JSON.stringify(jokes));
}