//setez width si heigh al canvasului
const canvas = document.querySelector('canvas');
if (canvas.width != '500px' || canvas.height != '500px') {
  canvas.width = 400;
  canvas.height = 400;
}
const ctx = canvas.getContext('2d');

//iau imaginea din API cu ajutorului link-ului de mai jos ce imi genereaza automat poze
const fetchDog = async () =>{
  const response = await fetch('https://picsum.photos/200/200', {
    method: 'GET',
    options: { mode: 'cors' }
  });
  return response;
}

//in image.src iau data.url-ul din API
const generateCanvas = async () => {
  const data = await fetchDog();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const image = new Image();
  image.src = data.url;
  image.crossOrigin = "Anonymous";
  image.onload = () => {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    ctx.save();
  }
}
//functie pentru flip orizontal
const flipHorizontalImage = () => { 
  const image = new Image();
  image.src = canvas.toDataURL();
  image.onload = () => {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(image, -1 * canvas.width, 0, canvas.width, canvas.height);
    ctx.restore();
    }
}

//functie pentru flip vertical
const flipVerticalImage = () => {
  const image = new Image();
  image.src = canvas.toDataURL();
  image.onload = () => {
    ctx.save();
    ctx.scale(1, -1);
    ctx.drawImage(image, 0, -1 * canvas.height, canvas.width, canvas.height);
    ctx.restore();
    }
 }

//functie pentru greyscale
const greyScale = () => {
  const now=Date.now();
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length / 2; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg;
    data[i + 1] = avg;
    data[i + 2] = avg;
  }

  ctx.putImageData(imageData, 0, 0);
  const end=Date.now();
  console.log(end-now);
}

//functie pentru inversare culori
const inverColors = () => {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length / 2; i += 4) {
    data[i] = 255 - data[i];
    data[i + 1] = 255 - data[i + 1];
    data[i + 2] = 255 - data[i + 2];
  }
  ctx.putImageData(imageData, 0, 0);
}

//functie pt reseterare canvas
const reset = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//buton pt flip orizontal
const flipButtonVertically = document.getElementsByClassName('flip-vertically')[0];
flipButtonVertically.addEventListener('click', () => {
  flipVerticalImage();
});

//buton pt flip vertical
const flipButtonHorizontally = document.getElementsByClassName('flip-horizontally')[0];
flipButtonHorizontally.addEventListener('click', () => {
  flipHorizontalImage();
});

//buton pt generare canvas
const generateButton = document.getElementsByClassName('generate')[0];
generateButton.addEventListener('click', () => {
  generateCanvas();
});

//buton pt greyscale
const greyScaleButton = document.getElementsByClassName('grey-scale')[0];
greyScaleButton.addEventListener('click', () => {
  greyScale();
});

//buton pt inversare culori
const invertColorsButton = document.getElementsByClassName('invert-colors')[0];
invertColorsButton.addEventListener('click', () => {
  inverColors();
});

//buton pt reseterare canvas
const resetButton = document.getElementsByClassName('reset')[0];
resetButton.addEventListener('click', () => {
  reset();
});
