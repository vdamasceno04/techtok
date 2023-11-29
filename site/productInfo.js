function getProductId(url){// get product id from url
    params = new URLSearchParams(url)
    return params.get('prod')
}

function getProductInfo(id){// get product's info json from session storage
    return JSON.parse(sessionStorage.getItem(String(id)))
}

function getName(info){// get product name from json
    return info.brand + ' ' + info.model
}

function setName(info){// set html product name field
    document.getElementById("productName").innerHTML = getName(info)
}

function setImgPath(info){// set html product img field
    // document.getElementById("productImg").src = 'imgs/' + info.image_path
    document.getElementById("productImg").src = window.config.API_ENDPOINT + 'product/' + info.image_path
    document.getElementById("productImg").alt = getName(info)
}

function setTitle(info){// set html product title field
    document.querySelector("title").textContent = getName(info)
}

function setPrice(info){// set html product price field
    document.getElementById("price").innerHTML = 'R$ ' + info.price
}

function setWarranty(info){// set html product warranty field
    document.getElementById("warranty").innerHTML = 'Warranty: ' + info.warranty
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
    document.querySelector("title").textContent = getName(info);
  
    // Set the product name
    document.getElementById("productName").innerHTML = getName(info);
  
    // Set the product image
    document.getElementById("productImg").src = window.config.API_ENDPOINT + 'product/' + info.image_path;
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