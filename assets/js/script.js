const logoImg = [
  "assets/images/1.png",
  "assets/images/2.png",
  "assets/images/3.png",
];

const logoFonts = ["Font1", "Font2", "Font3"];

const logoFontsColor = ["black", "red", "blue"];

const fontSizes = ["20px", "30px", "40px"];
const fontWeights = ["normal", "bold", "bolder"];
const fontStyles = ["normal", "italic"];
const backgroundColors = ["#f0f0f0", "#d3d3d3", "#c0c0c0"];
const shadows = [
  "2px 2px 4px #000000",
  "4px 4px 8px #333333",
  "0px 0px 5px #555555",
];
const canvasBgColors = ["#e0f7fa", "#ffe0b2", "#f3e5f5"];
const borderColors = ["#ff0000", "#00ff00", "#0000ff"];

const companyName = "ABCD";

function getRandomIndex() {
  return {
    imgIndex: Math.floor(Math.random() * logoImg.length),
    fontIndex: Math.floor(Math.random() * logoFonts.length),
    colorIndex: Math.floor(Math.random() * logoFontsColor.length),
    sizeIndex: Math.floor(Math.random() * fontSizes.length),
    weightIndex: Math.floor(Math.random() * fontWeights.length),
    styleIndex: Math.floor(Math.random() * fontStyles.length),
    bgColorIndex: Math.floor(Math.random() * backgroundColors.length),
    shadowIndex: Math.floor(Math.random() * shadows.length),
    canvasBgColorIndex: Math.floor(Math.random() * canvasBgColors.length),
    borderColorIndex: Math.floor(Math.random() * borderColors.length),
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

function drawCurvedText(ctx, text, x, y, radius, startAngle, textAlign) {
  ctx.save();
  // ctx.translate(x, y);
  ctx.translate(100,170);
  ctx.rotate(startAngle);
  ctx.textAlign = textAlign;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const charWidth = ctx.measureText(char).width;
    ctx.rotate(charWidth / 2 / radius);
    ctx.fillText(char, 0, -radius);
    ctx.rotate(charWidth / 2 / radius);
  }

  ctx.restore();
}

async function generateLogo() {
  const canvas = document.getElementById("logo");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let index = 1; index <= 20; index++) {
    const { 
      imgIndex, fontIndex, colorIndex, sizeIndex, weightIndex, styleIndex,
      bgColorIndex, shadowIndex, canvasBgColorIndex, borderColorIndex 
    } = getRandomIndex();

    try {
      // Apply random canvas background color
      ctx.fillStyle = canvasBgColors[canvasBgColorIndex];
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Apply random border color
      ctx.strokeStyle = borderColors[borderColorIndex];
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      const img = await loadImage(logoImg[imgIndex]);
      ctx.drawImage(img, 50, 50, 100, 100);

      // Apply text shadow
      ctx.shadowColor = shadows[shadowIndex].split(" ").pop();
      ctx.shadowOffsetX = parseFloat(shadows[shadowIndex].split(" ")[0]);
      ctx.shadowOffsetY = parseFloat(shadows[shadowIndex].split(" ")[1]);
      ctx.shadowBlur = parseFloat(shadows[shadowIndex].split(" ")[2]);

      // Apply font styles
      ctx.font = `${fontWeights[weightIndex]} ${fontStyles[styleIndex]} ${fontSizes[sizeIndex]} ${logoFonts[fontIndex]}`;
      ctx.fillStyle = logoFontsColor[colorIndex];
      ctx.textAlign = "center";

      const textX = Math.random() * (canvas.width - 200) + 100;
      const textY = Math.random() * (canvas.height - 200) + 100;

      const radius = Math.random() * 1 + 20;
      const startAngle = (Math.random() * 2 - 1) * Math.PI / 2;
      drawCurvedText(ctx, companyName, textX, textY, radius, startAngle, "center");

      const dataURL = canvas.toDataURL("image/png");
      const imgElement = document.createElement("img");
      imgElement.src = dataURL;
      document.body.appendChild(imgElement);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.shadowColor = "transparent";
    } catch (error) {
      console.error(error);
    }
  }
}