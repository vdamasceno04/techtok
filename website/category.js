// Get the category from the URL
function getCategory() {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('cat')
}

function setImg(elementId, imagePath) {
  const imgElement = document.getElementById(elementId);

  if (imgElement) {
    // Set the src attribute of the image element
    imgElement.src = imagePath;

    // Optional: Set alt attribute for accessibility
    imgElement.alt = elementId;
  } else {
    console.error(`Element with ID '${elementId}' not found.`);
  }
}


// Fetch products from the server
async function fetchProducts(category) {
  const endpoint = 'http://localhost:3000/product/products/' + category
  const response = await fetch(endpoint)
  if (!response.ok) {
    throw new Error(`Failed to fetch products. Status: ${response.status}`)
  }
  const data = await response.json()
  displayProducts(data, category)
}

// Display products on the page
function displayProducts(products, category) {
  const endpoint = 'http://localhost:3000/product/products/' + category
  const productGrid = document.getElementById('dados')
  productGrid.innerHTML = ''

  products.forEach(product => {
    const productCard = document.createElement('div')
    productCard.className = 'product-card'
    productCard.innerHTML = `
    <img src="./imgs/${product.image_path}" alt="${product.brand} ${product.model}">
    <h2>${product.brand} ${product.model}</h2>
    <p>${product.price}</p>
  `
    productCard.addEventListener('click', () => {
      window.location.href = `product.html?category=${product.category}&id=${product.id}`
    })
    
    productGrid.appendChild(productCard)
  })
}

// Fetch products when the page loads
fetchProducts(getCategory())
