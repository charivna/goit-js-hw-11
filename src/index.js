
import axios from "axios";
import Notiflix from 'notiflix';
import simpleLightbox from "simplelightbox";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    formEl : document.querySelector('.search-form'),
    keyWordEl: document.querySelector('input'),
    galleryEl: document.querySelector('.gallery'),
    loadMoreEl: document.querySelector('.load-more')
}

refs.formEl.addEventListener('submit', onSubmit);
refs.loadMoreEl.addEventListener('click', onLoadMore)

let page = 1;

async function onLoadMore() {
   
    page += 1;
    const { hits, totalHits } = await fetchImages(page);
    refs.galleryEl.insertAdjacentHTML('beforeend', createMarkup(hits))
    
    if (page >= Number(totalHits / 40)) {
        
        refs.loadMoreEl.hidden = true;

         Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
  }
}

async function onSubmit(evt) {

    evt.preventDefault()
   
    refs.galleryEl.textContent = "";
    refs.loadMoreEl.hidden = true;
   

    try {
        const { hits, totalHits } = await fetchImages(page);  
        refs.galleryEl.insertAdjacentHTML('beforeend', createMarkup(hits));
        let lightbox = new SimpleLightbox('.gallery a', { captionsData: `alt`, captionDelay: 250, });
          lightbox.refresh()
     

        if (page < Number(totalHits/40)) {
            refs.loadMoreEl.hidden = false;
               Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
        }
             
        
    
    } catch (error) {
        console.log(error)
    }
}


async function fetchImages(page = 1) {
   
    const BASE_URL = "https://pixabay.com/api/"
    const API_KEY = "38322370-cd2680a408cbe7ab4bd12cfc4"
    
    const { data } = await axios.get(`${BASE_URL}`,
        {
            params: {
                key: `${API_KEY}`,
                q: `${refs.keyWordEl.value}`,
                page: `${page}`,
                per_page:"40",
                image_type: "photo",
                orientation: "horizontal",
                safesearch: "true"
            }
              
        })

return data}

 function createMarkup(hits) {

    if (hits.length <= 0) {
       
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    } 
   
    
     return hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => `
   <div class="photo-card">
   <a class="gallery__link" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" class ="image" loading="lazy" />
   </a>
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`).join('')
}

