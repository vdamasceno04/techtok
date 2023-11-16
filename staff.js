document.addEventListener('DOMContentLoaded', function() {
    const selectCategory = document.getElementById('product');
    const productInfoContainer = document.getElementById('productInfo');
  
    // Adiciona um ouvinte de eventos para o evento de mudança no select
    selectCategory.addEventListener('change', function() {
      // Remove caixas de entrada existentes
      productInfoContainer.innerHTML = '';
  
        const selectedCategory = selectCategory.value;
  
      switch (selectedCategory) {
        case 'Mouse':
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
          
        case 'Keyboard':
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
        case 'USB Flash Drive':
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
        case 'Speaker':
            addProductAttribute('Brand', 'brand');
            addProductAttribute('Model:', 'model');
            addProductAttribute('Stock:', 'stock');
            addProductAttribute('Price:', 'price');
            addProductAttribute('Description:', 'description');
            addProductAttribute('Image Path', 'image_path');
            addProductAttribute('Warranty', 'warranty');            
            addProductAttribute('Source:', 'source');
            addProductAttribute('Channels:', 'channels');
            addProductAttribute('Audio Input:', 'Audio Input');
            addProductAttribute('Power:', 'power');
            addProductAttribute('Battery:', 'battery');
          break;

        case 'Earphone':
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
          // Não faz nada se a opção 'selecione' for escolhida
      }
    });
  
    function addProductAttribute(labelText, inputId) {
      const label = document.createElement('label');
      label.textContent = labelText;
  
      const input = document.createElement('input');
      input.type = 'text';
      input.id = inputId;
  
      productInfoContainer.appendChild(label);
      productInfoContainer.appendChild(input);
    }
  });