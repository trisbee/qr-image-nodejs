const { generateQRWithImage } = require('../dist/index');
const { printToTerminal } = require("./tools");

async function TestQRCodeWithoutImage()
{
  console.debug(`⏳ QR code start ...`);

  const data = await generateQRWithImage(
    "https://www.trisbee.com/en/careers",
    256,
    256,
    null
  );

  console.info(`👍 QR code generated ...`);

  printToTerminal(data.buffer);
}

TestQRCodeWithoutImage();
