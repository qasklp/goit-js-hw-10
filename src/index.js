import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';



let name = '';
const DEBOUNCE_DELAY = 300;
const list = document.querySelector(".country-list");
const searchBox = document.querySelector("#search-box");

searchBox.addEventListener("input", debounce(showCountries, DEBOUNCE_DELAY));

function fetchCountries(name) {
    return  fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`).then(response => {
        if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json()
        })
}

function showCountries() {
    name = searchBox.value.toLowerCase().trim();
    fetchCountries(name)
        .then(data => {
            console.log(data);
            if (data.length <= 10) {
                const markup = createMarkup(data);
                list.innerHTML =  markup;
            } else {
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            }
        })
        .catch(error => {
            console.log(error);
            list.innerHTML = '';
        })
}

function createMarkup(arr) {
    if (arr.length == 1) {
        return arr.map(country => `<div class="box"><img src="${country.flags.svg}" alt="flag" class="picture">
        <h1 class="name">${country.name.common}</h1></div>
        <dl><dt>Capital:</dt><dd>${country.capital}</dd>
        <dt>Population:</dt><dd>${country.population}</dd>
        <dt>Languages:</dt><dd>${Object.values(country.languages)}</dd></dl>`).join('') 
    } else {
        return arr.map(country => `<li class="item">
        <img src="${country.flags.svg}" alt="flag" class="picture">
        <p class="name">${country.name.official}</p>
        </li>`).join('')  
    }
   
}