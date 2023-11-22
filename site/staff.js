require('dotenv').config()

const API_ADDRESS = process.env.API_PROTOCOL + '://' + process.env.API_HOSTS + ':' + process.env.API_PORT + '/'

document.addEventListener('DOMContentLoaded', async function() {
    const prodForm = document.getElementById('form');
    const selectCategory = document.getElementById('product');
    const productInfoContainer = document.getElementById('productInfo');
    const submitButton = document.getElementById('submitInfo');
    const productInfoContainers = [];
  
    selectCategory.addEventListener('change', function() {

      productInfoContainer.innerHTML = '';
      productInfoContainers.length = 0;
  
        const selectedCategory = selectCategory.value;
  
      switch (selectedCategory) {
        case 'mice':
            addProductAttribute('Brand', 'brand');
            addProductAttribute('Model:', 'model');
            addProductAttribute('Stock:', 'stock');
            addProductAttribute('Price:', 'price');
            addProductAttribute('Description:', 'description');
            addProductAttribute('Image Path', 'image_path');
            addProductAttribute('Warranty', 'warranty');            
            addProductAttribute('Connection:', 'connection');
            addProductAttribute('Dpi:', 'dpi');
            addProductAttribute('Buttons:', 'buttons');
            addProductAttribute('Battery:', 'battery');
            addProductAttribute('LED:', 'led');
          break;
          
        case 'keyboards':
            addProductAttribute('Brand', 'brand');
            addProductAttribute('Model:', 'model');
            addProductAttribute('Stock:', 'stock');
            addProductAttribute('Price:', 'price');
            addProductAttribute('Description:', 'description');
            addProductAttribute('Image Path', 'image_path');
            addProductAttribute('Warranty', 'warranty');            
            addProductAttribute('Connection:', 'connection');
            addProductAttribute('Layout:', 'layout');
            addProductAttribute('Key switch:', 'key_switch');
            addProductAttribute('Battery:', 'battery');
            addProductAttribute('LED:', 'led');
            addProductAttribute('Numpad:', 'numpad');
            break;
        case 'usb_flash_drives':
            addProductAttribute('Brand', 'brand');
            addProductAttribute('Model:', 'model');
            addProductAttribute('Stock:', 'stock');
            addProductAttribute('Price:', 'price');
            addProductAttribute('Description:', 'description');            
            addProductAttribute('Image Path', 'image_path');
            addProductAttribute('Warranty', 'warranty');            
            addProductAttribute('USB Type:', 'usb_type');
            addProductAttribute('Capacity:', 'capacity');
            addProductAttribute('Write Speed:', 'write_speed');
            addProductAttribute('Read Speed:', 'read_speed');
          break;
        case 'speakers':
            addProductAttribute('Brand', 'brand');
            addProductAttribute('Model:', 'model');
            addProductAttribute('Stock:', 'stock');
            addProductAttribute('Price:', 'price');
            addProductAttribute('Description:', 'description');
            addProductAttribute('Image Path', 'image_path');
            addProductAttribute('Warranty', 'warranty');            
            addProductAttribute('Source:', 'source');
            addProductAttribute('Channels:', 'channels');
            addProductAttribute('Audio Input:', 'audio_input');
            addProductAttribute('Power:', 'power');
            addProductAttribute('Battery:', 'battery');
          break;

        case 'earphones':
            addProductAttribute('Brand', 'brand');
            addProductAttribute('Model:', 'model');
            addProductAttribute('Stock:', 'stock');
            addProductAttribute('Price:', 'price');
            addProductAttribute('Description:', 'description');
            addProductAttribute('Image Path', 'image_path');
            addProductAttribute('Warranty', 'warranty');            
            addProductAttribute('Connection', 'connection');
            addProductAttribute('Channels:', 'channels');
            addProductAttribute('Battery:', 'battery');
            addProductAttribute('Microphone:', 'microphone');
            addProductAttribute('Waterproof:', 'waterproof');
          break;
        default:
      }
    });
    function addProductAttribute(labelText, inputId) {
      const label = document.createElement('label');
      label.textContent = labelText;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.id = inputId;
      productInfoContainers.push(input);
    productInfoContainer.appendChild(label);
    productInfoContainer.appendChild(input);
   }

   prodForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    categoryOption = document.getElementById('product');
    info = { category: categoryOption.value };
    productInfoContainers.forEach(function (box) {
      info[box.id] = box.value;
  //    console.log(box.id, box.value);
    });
 //   console.log('info = ', info);
    await axios.post(API_ADDRESS + 'staff/insert', info)
      .catch(error => console.log(error.response.data));
  });
});

