const results = document.getElementById("results");

const searchForm = () => {
    const searchQueryElem = document.querySelector('.search-input');
    const searchQuery = searchQueryElem.value;

    if (!searchQuery) {
        searchQueryElem.classList.add('is-invalid');
    } else {
        searchQueryElem.classList.remove('is-invalid');
    }

    searchGifs(searchQuery)
    .then((response) => {
        clearResults();
        if (response.data && response.data.length > 0) {
            addGifs(response.data);
        } else {
            displayText('There are no results.');
        }
    })
    .catch((error) => {
        clearResults();
        displayText('No connection. Please try again');
    });

    return false;
}

const clearResults = () => {
    results.innerHTML = "";
}

const displayText = (text) => {
    const textElem = document.createElement("p");
    textElem.classList.add("text-center");
    textElem.classList.add("empty-results");
    textElem.textContent = text;
    results.appendChild(textElem);
}

const convertObjToParams = (obj) => {
    let str = "";
    for (let key in obj) {
        if (str != "") {
            str += "&";
        }
        str += key + "=" + encodeURIComponent(obj[key]);
    }
    return str;
}

const searchGifs = (searchQuery) => {
    let url = "https://api.giphy.com/v1/gifs/search?"

    url += convertObjToParams({
        api_key: 'piiGSxEBKJuMefFyyaD1Mee6GoyN7AJB',
        q: searchQuery
    });

    return fetch(url, {mode: 'cors'})
    .then((response) => {
        return response.json()
    });
}


const addGifs = (gifs) => {
    const resultsElem = document.createElement('div');
    resultsElem.classList.add("row");

    for (let i in gifs) {
        const gif = gifs[i];
        const gifDiv = document.createElement("div");
        gifDiv.className = "col-12 col-sm-6 col-md-4 col-lg-3";
        const gifElem = document.createElement("img");
        gifElem.className = "gif";
        gifElem.src = gif.images.original.url;
        
        gifDiv.appendChild(gifElem);
        resultsElem.appendChild(gifDiv);
    }
    results.appendChild(resultsElem);
}