"use strict";const urlBase="http://api.tvmaze.com/search/shows?q=",form=document.getElementById("form"),txtSearch=document.getElementById("txt-search"),btnSearch=document.getElementById("btn-search"),resultList=document.getElementById("result-list"),msgNoResults=document.getElementById("msg-no-results"),favoritesList=document.getElementById("favorites-list"),favoritesKey="favorites";let showsList=[];function findShowsByName(e){e.preventDefault();const t=txtSearch.value.toLowerCase();fetch(urlBase+t).then(e=>e.json()).then(e=>{showsList=e,displayShows(e)}).catch(()=>{showsList=[],displayShows([])})}function displayShows(e){if(resultList.innerHTML="",e.length>0){msgNoResults.classList.add("msg-no-results--hidden");const t=getFavoritesFromLocalStorage();for(let s of e){const e=document.createElement("li"),o=document.createElement("img"),a=document.createElement("p");e.id=s.show.id,e.classList.add("show"),void 0!==t.find(e=>e.show.id===s.show.id)&&e.classList.add("show--selected"),a.innerHTML=s.show.name,a.classList.add("show__title"),null!==s.show.image?o.src=s.show.image.medium||s.show.image.original:o.src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV",o.classList.add("show__poster"),e.addEventListener("click",manageShowClick),e.appendChild(o),e.appendChild(a),resultList.appendChild(e)}}else msgNoResults.classList.remove("msg-no-results--hidden")}function manageShowClick(e){const t=e.currentTarget,s=parseInt(t.id);t.classList.toggle("show--selected"),updateFavoritesOnLocalStorage(showsList.find(e=>e.show.id===s)),displayFavorites()}function updateFavoritesOnLocalStorage(e){const t=getFavoritesFromLocalStorage(),s=t.findIndex(t=>t.show.id===e.show.id);-1!==s?t.splice(s,1):t.push(e),localStorage.setItem(favoritesKey,JSON.stringify(t))}function displayFavorites(){const e=getFavoritesFromLocalStorage();favoritesList.innerHTML="";for(let t of e){const e=document.createElement("li"),s=document.createElement("img"),o=document.createElement("p"),a=document.createElement("button");e.id=t.show.id,e.classList.add("fav-show"),o.innerHTML=t.show.name,o.classList.add("fav-show__title"),null!==t.show.image?s.src=t.show.image.medium||t.show.image.original:s.src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV",s.classList.add("fav-show__poster"),a.innerHTML="x",a.classList.add("fav-show__remove-button"),a.addEventListener("click",manageRemoveFavorite),e.appendChild(s),e.appendChild(o),e.appendChild(a),favoritesList.appendChild(e)}}function manageRemoveFavorite(e){const t=e.currentTarget.parentElement,s=parseInt(t.id);updateFavoritesOnLocalStorage(getFavoritesFromLocalStorage().find(e=>e.show.id===s)),displayFavorites();const o=document.querySelector(`#result-list [id="${s}"]`);null!==o&&o.classList.toggle("show--selected")}function getFavoritesFromLocalStorage(){const e=localStorage.getItem(favoritesKey)||"[]";return JSON.parse(e)}window.addEventListener("load",displayFavorites),form.addEventListener("submit",findShowsByName);