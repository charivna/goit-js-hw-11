const e={formEl:document.querySelector(".search-form"),keyWordEl:document.querySelector("input")};function t(t){t.preventDefault();return fetch(`https://pixabay.com/api/?key=38322370-cd2680a408cbe7ab4bd12cfc4&q=${e.keyWordEl.value}&image-type=photo&orientation=horizontal&safesearch=true`).then((e=>e.json()))}e.formEl.addEventListener("submit",t),t(evt).then((e=>console.log(e)));
//# sourceMappingURL=index.0b0a5171.js.map
