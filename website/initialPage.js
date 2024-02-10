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