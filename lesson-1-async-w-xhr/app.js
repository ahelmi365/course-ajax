// To Send An Async Request
// create an XHR object with the XMLHttpRequest constructor function
// use the .open() method - set the HTTP method and the URL of the resource to be fetched
// set the .onload property - set this to a function that will run upon a successful fetch
// set the .onerror property - set this to a function that will run when an error occurs
// use the .send() method - send the request



(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        // Get the image from unsplach
        const unsplashRequest = new XMLHttpRequest();

        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.onload = addImage;
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID HLemrgnvpPZVgueEpVqOdiC21Kl-MvsEtHclzyX1xdw');
        unsplashRequest.send();

        // get the articles form NYT
        const nytRequest = new XMLHttpRequest();

        nytRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=KwiLY7MT5u7bgIu35hw6Wlp8GnOsJKwi`)
        nytRequest.onload = addArticle;
        nytRequest.send();
    });

    // function to add image
    function addImage() {
        let htmlContent = ""
        const data = JSON.parse(this.responseText);

        const firstImage = data.results[0];
        if (data && data.results && firstImage) {
            htmlContent =
                `
                <figure>
                    <img src=${firstImage.urls.regular} alt="${firstImage.alt_description}">
                    <figcaption>
                        ${searchedForText} by ${firstImage.user.name}
                    </figcaption>
                </figure>
            `
        } else {
            htmlContent = `<div class="error-no-image">No images available</div>`
        }
        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }

    // function to add articles
    function addArticle() {
        const data = JSON.parse(this.responseText);

        let htmlContent = "";
        if (data && data.response && data.response.docs && data.response.docs.length >= 1) {

            data.response.docs.forEach(article => {
                htmlContent =
                    `
                    <ul>
                        <li class="article">
                            <h2> 
                            <a href = "${article.web_url}" target="_blank"> ${article.headline.main} </a> 
                            </h2>
                            <p>${article.snippet}</p>
                        </li>
                    </ul>
                    `
                responseContainer.insertAdjacentHTML('beforeend', htmlContent);
            });
        } else {
            htmlContent = `<div class="error-no-articles">No article available</div>`
        }
    }

})();



