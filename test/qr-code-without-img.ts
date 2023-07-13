const { generateQRWithImage } = require('../dist/index');
const { printToTerminal } = require("./tools");

async function testQRCodeWithoutImage() {
  console.debug(`⏳ QR code start ...`);

  const test1 = await generateQRWithImage(
    "https://www.trisbee.com/en/careers",
    256,
    256,
    null
  );

  console.info(`👍 QR code generated ...`);

  printToTerminal(test1.buffer);
}

testQRCodeWithoutImage().then(r => console.info("all done"));
