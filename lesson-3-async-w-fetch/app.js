(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    const unsplachHTTPOptions = {
        method: 'GET',
        headers: {
            Authorization: 'Client-ID HLemrgnvpPZVgueEpVqOdiC21Kl-MvsEtHclzyX1xdw'
        }
    }
    // fetch image api from unsplach.com
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        // fetch unsplash api to get image
        const IMGURL = `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`
        fetch(IMGURL, unsplachHTTPOptions)
            .then(response => response.json())
            .then(addImage)
            .catch(e=> requestError(e,'image'));

        // fetch NY API to get articles
        const NYURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=KwiLY7MT5u7bgIu35hw6Wlp8GnOsJKwi`
        fetch(NYURL)
            .then(response => response.json())
            .then(addArticle)
            .catch(e => requestError(e,'Article'))

    });

    // function to add image
    function addImage(jsonData) {
        let htmlContent = "";
        const firstImage = jsonData.results[0];

        if (firstImage) {
            htmlContent =
                `
                <figure>
                    <img src = "${firstImage.urls.regular}" alt="${firstImage.alt_description}"> 
                    <figcaption>
                        ${searchedForText} by ${firstImage?.user?.name}
                    </figcaption>
                </figure>
            `
        } else {
            console.log("no imaga data !");
            htmlContent = `<div class="error-no-image">No images available</div>`

        }
        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);

    }

    // function to add articles
    function addArticle(jsonData) {
        let htmlContent = "";

        if (jsonData && jsonData.response && jsonData.response.docs.length > 0) {
            console.log("Yes article data ");

            jsonData.response.docs.forEach(article => {
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
            console.log("no article data ");
            htmlContent = `<div class="error-no-articles">No article available</div>`;
            responseContainer.insertAdjacentHTML('beforeend', htmlContent);

        }
    }

})();
