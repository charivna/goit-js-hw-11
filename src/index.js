
import axios from "axios";

const refs = {
    formEl : document.querySelector('.search-form'),
    keyWordEl : document.querySelector('input')
}

refs.formEl.addEventListener('submit', onSubmit)

function onSubmit(evt) {

    evt.preventDefault()
    fetchImages()

}

async function fetchImages() {
const BASE_URL = "https://pixabay.com/api/"
    const API_KEY = "38322370-cd2680a408cbe7ab4bd12cfc4"
    
    const response = await axios.get(`${BASE_URL}`,
        {
            params: {
                key:`${API_KEY}`,
                q:`${refs.keyWordEl.value}`,
image_type: "photo",
orientation:"horizontal",
safesearch:"true" 
            }
        }).then(resp => {
            if (resp.length <= 0) {
            throw new Error ("Sorry, there are no images matching your search query. Please try again.")
            }
            console.log(resp.data);

        }).catch(err => console.log(err))
}

function createMarkup(response) {
    
}

