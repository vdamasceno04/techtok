function getCategory(url){
    param = new URLSearchParams(url)
    cat = param.get('cat') //should match db table name
    console.log(cat)
    return cat
}

async function printTable(url){
    console.log("vai")
    const db = require('./db/db.js')
    tablename = getCategory(url)
    //const table = db.getTable(tablename)
    await console.log(db.getTable(tablename))
}

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