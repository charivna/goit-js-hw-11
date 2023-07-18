
import axios from "axios";

const refs = {
    formEl : document.querySelector('.search-form'),
    keyWordEl : document.querySelector('input')
}

refs.formEl.addEventListener('submit', onSubmit)

function onSubmit(evt) {

    evt.preventDefault()
    
 const BASE_URL = "https://pixabay.com/api/"
const API_KEY = "38322370-cd2680a408cbe7ab4bd12cfc4"

    return fetch(`${BASE_URL}?key=${API_KEY}&q=${refs.keyWordEl.value}&image-type=photo&orientation=horizontal&safesearch=true`)
        .then(resp => resp.json())
       
}

onSubmit(evt).then(data => console.log(data))
