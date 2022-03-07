const { generateQRWithImage } = require('../dist/index');

async function TestQRCodeWithoutImage(request, response)
{
  console.debug(`⏳ QR code start ...`);

  const data = await generateQRWithImage(
    "https://www.trisbee.com/en/careers",
    256,
    256,
    null
  );

  console.info(`👍 QR code generated ...`);

  response
    .status(200)
    .set('Content-Type', 'image/png')
    .end(data.buffer);
}

module.exports = TestQRCodeWithoutImage;
