function getPage() {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const page = urlParams.get('page') || 1;
    return page;
}

async function fetching() {
    const page = getPage();
    const endpoint = `https://rickandmortyapi.com/api/location?page=${page}`;

    const response = await fetch(endpoint);
    const json = await response.json();
    return json;
}

fetching().then(
    response => {
    paginationWrapper(response.info);
    let template = ``;
    response.results.forEach(item => {
        template += `
            <div class="card">
                <h2>${item.name}</h2>
                <p>Type: ${item.type}</p>
                <p>Dimension: ${item.dimension}</p>
            </div>
        `;
    });
    results.innerHTML = template;
});

function paginationWrapper(info) {
    const actualPage = getPage();
    let template = ``;
    for (let index = 1; index <= info.pages; index++) {
        template += `
            <div class="page ${actualPage == index ? 'current' : ''}">
                <a href="locations.html?page=${index}">${index}</a>
            </div>
        `;
    }
    pagination.innerHTML = template;
}
