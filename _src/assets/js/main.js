'use strict';

const urlBase = 'http://api.tvmaze.com/search/shows?q=';
const form = document.getElementById('form');
const txtSearch = document.getElementById('txt-search');
const btnSearch = document.getElementById('btn-search');
const resultList = document.getElementById('result-list');
const msgNoResults = document.getElementById('msg-no-results');
const favoritesList = document.getElementById('favorites-list');
const favoritesKey = 'favorites';
const buttonLog = document.querySelector('#btn-log');
let showsList = [];

function findShowsByName(event) {
    event.preventDefault();
    const searchValue = txtSearch.value.toLowerCase();
        fetch(urlBase+searchValue)
        .then(response => response.json())
        .then(data => {
            showsList = data;
            displayShows(data);
        })
        .catch(() => {
            showsList = [];
            displayShows([]);
        });
};
function displayShows(shows) {
    resultList.innerHTML = '';

    if (shows.length > 0) {
        msgNoResults.classList.add('msg-no-results--hidden');
        const favoritesArr = getFavoritesFromLocalStorage();

        for (let item of shows) {
            const elementLi = document.createElement('li');
            const elementImg = document.createElement('img');
            const elementTitle = document.createElement('p');
            const elementStatus = document.createElement('p');

            elementLi.id = item.show.id;
            elementLi.classList.add('show');

            const foundFavorite = favoritesArr.find((favItem) => {
                if (favItem.show.id === item.show.id) {
                    return true;
                } else {
                    return false;
                }
            });

            if (foundFavorite !== undefined) {
                elementLi.classList.add('show--selected');
            }

            elementTitle.innerHTML = item.show.name;
            elementStatus.innerHTML = item.show.status;
            elementTitle.classList.add('show__title');
            if (item.show.image !== null) {
                elementImg.src = item.show.image.medium || item.show.image.original
            } else {
                elementImg.src = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
            }
            elementImg.classList.add('show__poster');

            elementLi.addEventListener('click', manageShowClick);

            elementLi.appendChild(elementImg);
            elementLi.appendChild(elementTitle);
            resultList.appendChild(elementLi);
            elementLi.appendChild(elementStatus);
        };
    } else {
        msgNoResults.classList.remove('msg-no-results--hidden');
    }
};

function manageShowClick(event) {
    const clickedElement = event.currentTarget;
    const clickedId = parseInt(clickedElement.id);
    clickedElement.classList.toggle('show--selected');

    const foundShow = showsList.find((item) => {
        if (item.show.id === clickedId) {
            return true;
        } else {
            return false;
        }
    });
    updateFavoritesOnLocalStorage(foundShow);
    displayFavorites();
};
function updateFavoritesOnLocalStorage(favorite) { 
    const favoritesArr = getFavoritesFromLocalStorage();
    const foundIndex = favoritesArr.findIndex((item) => {
        if (item.show.id === favorite.show.id) {
            return true;
        } else {
            return false;
        }
    });
    if (foundIndex !== -1) {
        favoritesArr.splice(foundIndex, 1);
    } else {
        favoritesArr.push(favorite);
    }
    localStorage.setItem(favoritesKey, JSON.stringify(favoritesArr));
};
function displayFavorites () {
    const favoritesArr = getFavoritesFromLocalStorage();
    favoritesList.innerHTML = '';

    for (let item of favoritesArr) {
        const elementLi = document.createElement('li');
        const elementImg = document.createElement('img');
        const elementTitle = document.createElement('p');
        const btnRemoveFavorite = document.createElement('button');

        elementLi.id = item.show.id;
        elementLi.classList.add('fav-show');
        elementTitle.innerHTML = item.show.name;
        elementTitle.classList.add('fav-show__title');
        if (item.show.image !== null) {
            elementImg.src = item.show.image.medium || item.show.image.original
        } else {
            elementImg.src = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
        }
        elementImg.classList.add('fav-show__poster');
        btnRemoveFavorite.innerHTML = 'x';
        btnRemoveFavorite.classList.add('fav-show__remove-button');

        btnRemoveFavorite.addEventListener('click', manageRemoveFavorite);

        elementLi.appendChild(elementImg);
        elementLi.appendChild(elementTitle);
        elementLi.appendChild(btnRemoveFavorite);
        favoritesList.appendChild(elementLi);
    };
};

function manageRemoveFavorite (event) {
    const parentLi = event.currentTarget.parentElement;
    const clickedId = parseInt(parentLi.id);
    const favoritesArr = getFavoritesFromLocalStorage();
    const foundShow = favoritesArr.find((item) => {
        if (item.show.id === clickedId) {
            return true;
        } else {
            return false;
        }
    });
    updateFavoritesOnLocalStorage(foundShow);
    displayFavorites();
    const resultsElement = document.querySelector(`#result-list [id="${clickedId}"]`);
    if (resultsElement !== null) {
        resultsElement.classList.toggle('show--selected');
    }
};

function getFavoritesFromLocalStorage() {
    const favoritesJson = localStorage.getItem(favoritesKey) || '[]';
    const favoritesArr = JSON.parse(favoritesJson);
    return favoritesArr;
};

function getLogFavorites () {
    const favoritesArr = getFavoritesFromLocalStorage();
    for (let item of favoritesArr) {
        console.log(item.show.name);
    }

};

window.addEventListener('load', displayFavorites);
form.addEventListener('submit', findShowsByName);
buttonLog.addEventListener('click', getLogFavorites);
