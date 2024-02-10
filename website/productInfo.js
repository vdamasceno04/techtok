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
  
function getProductId(url){// get product id from url
    params = new URLSearchParams(url)
    return params.get('id')
}

function getProductCategory(url){// get product id from url
  params = new URLSearchParams(url)
  return params.get('category')
}

async function getProductInfo(category,id) {
    console.log("abacate")
    try {
    const endpoint = 'http://localhost:3000/product/products'+ id 
      const response = await fetch(endpoint)
      if (!response.ok) {
        throw new Error(`Failed to fetch product. Status: ${response.status}`)
      }
      const product = await response.json()
      setProduct(product[0])
    } catch (error) {
      console.error(error)
      
    }
  }
  
function getName(info){// get product name from json
    return info.brand + ' ' + info.model
}

function setName(info){// set html product name field
    document.getElementById("productName").innerHTML = getName(info)
}

function setImgPath(info){// set html product img field
    // document.getElementById("productImg").src = 'imgs/' + info.image_path
    document.getElementById("productImg").src = "./imgs/" + info.image_path;
    document.getElementById("productImg").alt = getName(info)
}

function setTitle(info){// set html product title field
    document.querySelector("title").textContent = getName(info)
}

function setPrice(info){// set html product price field
    document.getElementById("price").innerHTML = 'R$ ' + info.price
}

function setWarranty(info){// set html product warranty field
    document.getElementById("warranty").innerHTML = 'Warranty: ' + info.warranty + ' months'
}

function setStock(info){// set html product stock field
    document.getElementById("stock").innerHTML = 'Stock: ' + info.stock
}

function setDescription(info){// set html product description field
    document.getElementById("description").innerHTML = 'Description: ' + info.description
}

function setBrand(info){// set html product brand field
    document.getElementById("brand").innerHTML = 'Brand: ' + info.brand
}

function setModel(info){// set html product model field
    document.getElementById("model").innerHTML = 'Model: ' + info.model
}


function setProduct(info) {
    // Set the title
    console.log("caiu set")
    console.log("info", info)
    console.log("name= ", getName(info))
    document.querySelector("title").textContent = getName(info);
  
    // Set the product name
    document.getElementById("productName").innerHTML = getName(info);
  
    // Set the product image
    document.getElementById("productImg").src = "./imgs/" + info.image_path;
    document.getElementById("productImg").alt = getName(info);
  
    // Create an array of keys for the info object
    var keys = Object.keys(info);
  
    // Loop through the keys
    for (var i = 0; i < keys.length; i++) {
      // Skip the 'image_path' key because it's used for the image source
      if (keys[i] !== 'image_path') {
        // Get the element by id
        var element = document.getElementById(keys[i]);
  
        // If the element exists, set its innerHTML
        if (element) {
          element.innerHTML = keys[i].charAt(0).toUpperCase() + keys[i].slice(1) + ': ' + info[keys[i]];
        }
      }
    }
  }
//TODO: SHOW SPECIFIC ATTRIBUTES FROM EACH CATEGORY