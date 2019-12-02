'use strict';

const urlBase = 'http://api.tvmaze.com/search/shows?q=';
const form = document.getElementById('form');
const txtSearch = document.getElementById('txt-search');
const btnSearch = document.getElementById('btn-search');
const resultList = document.getElementById('result-list');
const favoritesList = document.getElementById('favorites-list');
const favoritesKey = 'favorites';
let showsList = [];

function findShowsByName(event) {
    event.preventDefault();
    const searchValue = txtSearch.value.toLowerCase();
        fetch(urlBase+searchValue)
        .then(response => response.json())
        .then(data => {
            showsList = data;
            displayShows(data);
        });
};
function displayShows(shows) {
    resultList.innerHTML = '';

    for (let item of shows) {
        const elementLi = document.createElement('li');
        const elementImg = document.createElement('img');
        const elementSpan = document.createElement('span');

        elementLi.id = item.show.id;
        elementLi.classList.add('show');
        elementSpan.innerHTML = item.show.name;
        if (item.show.image !== null) {
            elementImg.src = item.show.image.medium || item.show.image.original
        } else {
            elementImg.src = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
        }

        elementLi.addEventListener('click', manageShowClick);

        elementLi.appendChild(elementSpan);
        elementLi.appendChild(elementImg);
        resultList.appendChild(elementLi);
    };
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
    updateFavorites(foundShow);
    displayFavorites();
};
function updateFavorites(favorite) { 
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
        const elementSpan = document.createElement('span');

        elementLi.id = item.show.id;
        elementLi.classList.add('show');
        elementSpan.innerHTML = item.show.name;
        if (item.show.image !== null) {
            elementImg.src = item.show.image.medium || item.show.image.original
        } else {
            elementImg.src = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
        }

        elementLi.appendChild(elementSpan);
        elementLi.appendChild(elementImg);
        favoritesList.appendChild(elementLi);
    };
};

function getFavoritesFromLocalStorage() {
    const favoritesJson = localStorage.getItem(favoritesKey) || '[]';
    const favoritesArr = JSON.parse(favoritesJson);
    return favoritesArr;
};

form.addEventListener('submit', findShowsByName);
