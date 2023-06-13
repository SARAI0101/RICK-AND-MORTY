async function fetching(){
    const response=await fetch("https://rickandmortyapi.com/api/character")
    const json= await response.json()
    return json
}

fetching().then(
    response => {
        let template=``
        response.results.forEach(item=>{
            template+=`
            <div class="item">
            <a href="${item.url}">
            <img src="${item.image}"/>
            <h2>${item.name}</h2>
            <h3>${item.status}</h3>
            <h4>${item.species}</h4>
            <p>${item.gender}</p>
            </a><
            </div>
            `
        })
        results.innerHTML = template
    }
)