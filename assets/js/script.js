const logoImg = [
  "assets/images/1.jpg",
  "assets/images/2.jpg",
  "assets/images/3.jpg",
];

const logoFonts = ["Font1", "Font2", "Font3"];

const logoFontsColor = ["black", "red", "blue"];

const companyName = "ABCD";

function getRandomIndex() {
  return {
    imgIndex: Math.floor(Math.random() * logoImg.length),
    fontIndex: Math.floor(Math.random() * logoFonts.length),
    colorIndex: Math.floor(Math.random() * logoFontsColor.length),
  };
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

async function generateLogo() {
  const canvas = document.getElementById("logo");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let index = 1; index <= 20; index++) {
    const { imgIndex, fontIndex, colorIndex } = getRandomIndex();
    console.log(imgIndex, fontIndex, colorIndex);

    try {
      const img = await loadImage(logoImg[imgIndex]);
      ctx.drawImage(img, 50, 50, 100, 100);

      ctx.font = "20px " + logoFonts[fontIndex];
      ctx.fillStyle = logoFontsColor[colorIndex];
      ctx.textAlign = "center";

      ctx.fillText(companyName, canvas.width / 2, canvas.height - 50);

      const dataURL = canvas.toDataURL("image/png");
      const imgElement = document.createElement("img");
      imgElement.src = dataURL;
      document.body.appendChild(imgElement);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
    } catch (error) {
      console.error( error);
    }
  }
}
