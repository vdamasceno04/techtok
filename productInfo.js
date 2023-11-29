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
    document.getElementById("productImg").src = `http://localhost:3000/product/${info.image_path}`
    document.getElementById("productImg").alt = getName(info)
}

function setTitle(info){// set html product title field
    document.querySelector("title").textContent = getName(info)
}

function setPrice(info){// set html product price field
    document.getElementById("price").innerHTML = 'R$ ' + info.price
}

function setWarranty(info){// set html product warranty field
    document.getElementById("warranty").innerHTML = 'Warranty: ' + info.warranty + ' years'
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

function setProduct(info){// run all functions above
    setTitle(info)
    setName(info)
    setImgPath(info)
    setBrand(info)
    setModel(info)
    setPrice(info)
    setStock(info)
    setDescription(info)
    setWarranty(info)
}

const productInfoContainer = document.getElementById('productInfo');
const productInfoContainers = [];
productInfoContainer.innerHTML = '';
productInfoContainers.length = 0;

var id = getProductId(window.location.search)

var category = getProductInfo(id).category

getSpecs()
async function getSpecs(){
    const endpoint = ('http://localhost:3000/product/products/' + category + '/' + id)
    console.log(endpoint)
    fetch(endpoint)
    .then(res => res.json())
    .then(data => {
        switch (category) {
          case 'mice':
              addProductAttribute('Connection:', data[0].connection + '     ');
              addProductAttribute('Dpi:', data[0].dpi + '     ');
              addProductAttribute('Buttons:', data[0].buttons + '     ');
              addProductAttribute('Battery:', data[0].battery + 'days' + '     ');
              addProductAttribute('LED:', data[0].led + '     ');
            break;
            
          case 'keyboards':
              addProductAttribute('Connection:', data[0].connection + '     ');
              addProductAttribute('Layout:', data[0].layout+ ' ');
              addProductAttribute('Key switch:', data[0].key_switch+ '       ');
              addProductAttribute('Battery:', data[0].battery+ 'days'+ '        ');
              addProductAttribute('LED:', data[0].led+ '        ');
              addProductAttribute('Numpad:', data[0].numpad+ '      ');
              break;
          case 'usb_flash_drives':
              addProductAttribute('USB Type:', data[0].usb_type+ '       ');
              addProductAttribute('Capacity:', data[0].capacity + 'Gb'+ '       ');
              addProductAttribute('Write Speed:', data[0].write_speed + 'Mb/s'+ '        ');
              addProductAttribute('Read Speed:', data[0].read_speed + 'Mb/s'+ '      ');
            break;
          case 'speakers':
              addProductAttribute('Source:', data[0].source+ '       ');
              addProductAttribute('Channels:', data[0].channels+ '       ');
              addProductAttribute('Audio Input:', data[0].audio_input+ '         ');
              addProductAttribute('Power:', data[0].power + 'Watts'+ '       ');
              addProductAttribute('Battery:', data[0].battery+ '         ');
            break;
  
          case 'earphones':
              addProductAttribute('Connection', data[0].connection+ '       ');
              addProductAttribute('Channels:', data[0].channels+ '      ');
              addProductAttribute('Battery:', data[0].battery + 'minutes'+ '         ');
              addProductAttribute('Microphone:', data[0].microphone+ '       ');
              addProductAttribute('Waterproof:', data[0].waterproof+ '      ');
            break;
          default:
        }

        console.log('fetched data: ' + JSON.stringify(data))
    
    })
    .catch(error => console.log(error))
}

function addProductAttribute(labelText, specInfo) {
    const label = document.createElement('label');
    label.textContent = labelText;
    const spec = document.createElement('label');
    spec.textContent = specInfo;
    productInfoContainers.push(spec);
    productInfoContainer.appendChild(label);
    productInfoContainer.appendChild(spec);
 }

async function addToCart(url){
    let userId = 8 //get user id (using cookies?)
    let prodId = getProductId(url)
    var quant = 1
    const endpoint = ('http://localhost:3000/cart/get/' + userId + '/' + prodId) 
    //check if user already has the specific product in the cart
    fetch(endpoint)
    .then(res => res.json())
    .then(data => {
        console.log('fetched data: ' + JSON.stringify(data))
        if(data.length > 0 ){ //if the product is in the cart
            quant += data[0].quantity;
            const info = {quantity: quant, id: data[0].id};
            axios.put('http://localhost:3000/cart/update', info)
            .catch(error => console.log(error));
        }
        else {
            const info = {customer_id: userId, product_id: prodId, quantity: quant};
            axios.post('http://localhost:3000/cart/insert', info)
            .catch(error => console.log(error));
        }
    })
    .catch(error => console.log(error))
}
//TODO: SHOW SPECIFIC ATTRIBUTES FROM EACH CATEGORY