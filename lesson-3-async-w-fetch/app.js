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
            .then(response => {
                return response.json();
            }).then(jsonData => {
                addImage(jsonData);
            })

        // fetch NY API to get articles
        const NYURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=KwiLY7MT5u7bgIu35hw6Wlp8GnOsJKwi`

        fetch(NYURL)
            .then(response => {
                return response.json();
            }).then(jsonData => {
                addArticle(jsonData);
            })
    });

    // function to add image
    function addImage(jsonData) {
        let htmlContent = "";
        const firstImage = jsonData.results[0];

        if (jsonData && jsonData.results && firstImage) {
            htmlContent =
                `
                <figure>
                    <img src = "${firstImage.urls.regular}" alt="${firstImage.alt_description}"> 
                    <figcaption>
                        ${searchedForText} by ${firstImage?.user?.name}
                    </figcaption>
                </figure>
            `
            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        } else {
            htmlContent =
                `<div class="error-no-image>No image available</div>`
        }

    }

    // function to add articles

    function addArticle(jsonData) {
        console.log(jsonData.response.docs);
        let htmlContent = document.createElement('ul');
        if (jsonData && jsonData.response && jsonData.response.docs) {
            jsonData.response.docs.forEach(article => {
                const li =
                    `
                <li class="article">
                    <h2>
                        <a href="${article.web_url}" target="_blank">${article.headline.main}</a>
                    </h2>
                    <p>${article.snippet}</p>
                </li>
            

                `
                htmlContent.insertAdjacentHTML('afterbegin', li);

            });

        }else{
            htmlContent.insertAdjacentHTML('beforeend', '<div class="error-no-articles">No article available</div>');

            // htmlContent = `<div class="error-no-articles">No article available</div>`
        }
        responseContainer.insertAdjacentHTML('beforeend', htmlContent);
    }



})();
