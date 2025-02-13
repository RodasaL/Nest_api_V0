async function generateImage() {
    const prompt = document.getElementById('prompt').value;
    if (!prompt) {
      alert('Please enter a prompt!');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/image-ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
  
      const data = await response.json();
  
      // Clear previous images
      const imageContainer = document.getElementById('image-container');
      imageContainer.innerHTML = '';
  
      //new image
      data.imageUrls.forEach((url) => {
        const img = document.createElement('img');
        img.src = url;
        imageContainer.appendChild(img);
      });
    } catch (error) {
      console.error('Error generating image:', error);
    }
  }
  