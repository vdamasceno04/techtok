function getCategory(url){
    param = new URLSearchParams(url)
    cat = param.get('cat') //should match db table name
    console.log(cat)
    return cat
}

//fetches the whole category table as a json
//need make buttons for each fetched product
//deve buscar na tabela produtos o produto da tal categoria
async function getProductsfromCategory(category){
    const endpoint = 'http://localhost:3000/product/products/' + category
    fetch(endpoint)
    .then(res => res.json())
    .then(data => {
        const conteudoDiv = document.getElementById('dados')
        
        data.forEach((product)=>{
            const button = createProductButton(product)
            conteudoDiv.appendChild(button)
        });
        // Defina o texto do parágrafo com os dados obtidos da API
        // conteudoDiv.textContent = JSON.stringify(data);
        console.log(JSON.stringify(data))
    })
    .catch(error => console.log(error))
}

getProductsfromCategory(getCategory(window.location.search))

function createProductButton(product){
    // Create a new button element.
    const button = document.createElement('button')
  
    // Set the button element's text to the product's brand and model.
    button.textContent = product.brand + ' ' + product.model
  
    // Add an event listener to the button so that you can respond to user interaction.
    button.addEventListener('click',()=>{
        // Temporarily save the product JSON and open the product page.
        sessionStorage.setItem(String(product.id), JSON.stringify(product))
        redirectToProduct(`?prod=${product.id}`)
    })
  
    // Return the button element.
    return button
  }