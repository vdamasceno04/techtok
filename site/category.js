// Get the category from the URL
function getCategory() {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('cat')
}

// Fetch products from the server
async function fetchProducts(category) {
  const endpoint = window.config.API_ENDPOINT + 'products/' + category
  const response = await fetch(endpoint)
  if (!response.ok) {
    throw new Error(`Failed to fetch products. Status: ${response.status}`)
  }
  const data = await response.json()
  displayProducts(data)
}

// Display products on the page
function displayProducts(products) {
  const productGrid = document.getElementById('dados')
  productGrid.innerHTML = ''
  products.forEach(product => {
    const productCard = document.createElement('div')
    productCard.className = 'product-card'
    productCard.innerHTML = `
      <img src="${window.config.API_ENDPOINT}images/${product.image_path}" alt="${product.brand} ${product.model}">
      <h2>${product.brand} ${product.model}</h2>
      <p>${product.price}</p>
    `
    productCard.addEventListener('click', () => {
      window.location.href = `product.html?id=${product.id}`
    })
    
    productGrid.appendChild(productCard)
  })
}

// Fetch products when the page loads
fetchProducts(getCategory())
