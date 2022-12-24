import Notiflix from 'notiflix';
import throttle from 'lodash.throttle';

export function fetchCountries(name) {
    return  fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`).then(response => {
        if (!response.ok) {
            if (name.length != 0) {
                   throttle(Notiflix.Notify.failure("Oops, there is no country with that name"),1000); 
                }
            throw new Error(response.status);
            }
            return response.json()
        })
}