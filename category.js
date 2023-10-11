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
            // const box = createProductBox(product)
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


/* Incomplete product boxes
TODO: CSS, validation, DOM, HTML container
  function createProductBox(product){
    // Create a new div element.
    const box = document.createElement('div')
  
    // Set the box's class name.
    box.classList.add('product-box')
  
    // Create a new img element.
    const image = document.createElement('img')
  
    // Set the image's src attribute to the product's image path.
    image.src = 'imgs/' + product.image_path
  
    // Append the image to the box.
    box.appendChild(image)
  
    // Create a new paragraph element.
    const paragraph = document.createElement('p')
  
    // Set the paragraph's text to the product's brand and model.
    paragraph.textContent = product.brand + ' ' + product.model
  
    // Append the paragraph to the box.
    box.appendChild(paragraph)
  
    // Return the box element.
    return box
  }
*/