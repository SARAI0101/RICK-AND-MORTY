function getPage() {
    const url= window.location.search
    const urlParams = new URLSearchParams(url)
    const page= urlParams.get('page')||1
    return page
}
async function fetching(){
    const page = getPage()
    const endpoint=`https://rickandmortyapi.com/api/character?page=${page}`

    const response=await fetch(endpoint)
    const json= await response.json()
    return json
}

fetching().then(
    response => {
        paginationWrapper(response.info)
        let template=``
        response.results.forEach(item=>{
            template+=`
            <div class="item">
            <a href="character.html?id=${item.id}">
            <img src="${item.image}"/>
            <div class="item-description">
            <h2>${item.name}</h2>
            <h3>${item.status} - ${item.species} - ${item.gender} </h3>
            </div>
            </a>
            </div>
            `
        })
        results.innerHTML = template
    }
)

function paginationWrapper (info){
    const actualPage = getPage()
    let template= ``
    for (let index = 1; index <= info.pages; index++) {
        template+=`
        <div class="page ${actualPage == index ? 'current': ''}">
        <a href= "index.html?page=${index}">${index}</>
        </div>
        `
    }
    pagination.innerHTML=template
}
