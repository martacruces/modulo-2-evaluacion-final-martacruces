'use strict';

const urlBase = 'http://api.tvmaze.com/search/shows?q=';
const txtSearch = document.getElementById('txt-search');
const btnSearch = document.getElementById('btn-search');
const resultList = document.getElementById('result-list');

function getShowName() {
    const searchValue = txtSearch.value.toLowerCase();
        fetch(urlBase+searchValue)
        .then(response => response.json())
        .then(data => searchShow(data))
};


function searchShow(data){
    const mySearch = data;
    resultList.innerHTML = '';
    for (let search of mySearch) {
        const elementLi = document.createElement('li');
        const elementImg = document.createElement('img');
        const elementSpan = document.createElement('span');

        elementSpan.innerHTML = search.show.name;
        if (search.show.image !== null) {
            elementImg.src = search.show.image.medium ||  search.show.image.original
        } else {
            elementImg.src = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
        } 
        elementLi.appendChild(elementSpan);
        elementLi.appendChild(elementImg);
        resultList.appendChild(elementLi);
    };

};

btnSearch.addEventListener('click', getShowName);
