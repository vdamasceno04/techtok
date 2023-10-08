function getCategory(url){
    param = new URLSearchParams(url)
    cat = param.get('cat') //should match db table name
    console.log(cat)
    return cat
}

//fetches the whole category table as a json
//need make buttons for each fetched product
async function getProductsfromCategory(category){
    const endpoint = 'http://localhost:3000/product/'+ category
    fetch(endpoint)
    .then(res => res.json())
    .then(data => {
        const conteudoDiv = document.getElementById('dados');

        // Defina o texto do parágrafo com os dados obtidos da API
        conteudoDiv.textContent = JSON.stringify(data);
        console.log(JSON.stringify(data))
    })
    .catch(error => console.log(error))
}

getProductsfromCategory(getCategory(window.location.search))