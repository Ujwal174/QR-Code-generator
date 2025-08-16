var qrcode = new QRCode("qrcode", {
  colorDark: "#000",
  colorLight: "#fff",
  width: 240,
  height: 240
});

const makeCode = () => {
  var Text = document.getElementById("text");
  var output = document.getElementById("output");

  if (!Text.value.trim()) {
    output.style.display = "none";
    return;
  }

  document.getElementById("qrcode").innerHTML = "";
  
  qrcode = new QRCode("qrcode", {
    colorDark: "#000",
    colorLight: "#fff",
    width: 720,
    height: 720
  });

  output.style.display = "flex";
  qrcode.makeCode(Text.value);
  
  setTimeout(setupButtons, 500);
};

const setupButtons = () => {
  const viewBtn = document.querySelector('.view-btn');
  const downloadBtn = document.querySelector('.download-btn');

  if (viewBtn) {
    viewBtn.onclick = () => {
      const qrElement = document.querySelector('#qrcode img, #qrcode canvas');
      if (qrElement) {
        const newWindow = window.open('', '_blank');
        const qrSrc = qrElement.src || qrElement.toDataURL();
        
        newWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>QR Code - Full Screen</title>
            <style>
              body {
                margin: 0;
                padding: 20px;
                background: #000000;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                font-family: "Playfair Display", serif;
              }
              img {
                width: 720px;
                height: 720px;
                max-width: 90vw;
                max-height: 90vh;
                object-fit: contain;
                box-shadow: 0 10px 30px rgba(255,255,255,0.2);
                border-radius: 10px;
                background: white;
                padding: 20px;
              }
            </style>
          </head>
          <body>
            <img src="${qrSrc}" alt="QR Code" />
          </body>
          </html>
        `);
        newWindow.document.close();
      }
    };
  }

  if (downloadBtn) {
    downloadBtn.onclick = () => {
      const qrElement = document.querySelector('#qrcode img, #qrcode canvas');
      if (qrElement) {
        const link = document.createElement('a');
        link.download = `qrcode-${Date.now()}.png`;
        
        if (qrElement.tagName === 'CANVAS') {
          link.href = qrElement.toDataURL('image/png');
        } else {
          link.href = qrElement.src;
        }
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };
  }
};

$(document).ready(() => {
  $("#text")
    .on("blur", makeCode)
    .on("keydown", function (e) {
      if (e.keyCode === 13) {
        makeCode();
      }
    })
    .on("input", makeCode);
});

  