# Examples

## Quick Example

```js
import { generateQRWithImage } from '@trisbee/qr-image-nodejs';

const imageBuffer;

// for option values please visit https://www.npmjs.com/package/qrcode#qr-code-options library
const options = {
    errorCorrectionLevel: 'Q',
    color: {
        dark: '#0CC8A8'
    }
};

// This will create QR with 'https://trisbee.com' encoded in it and with centered image also color will be #0CC8A8
const resultWithImage = generateQRWithImage('https://trisbee.com', 500, 100, imageBuffer, options);

// This will create just QR code with 'https://trisbee.com' encoded in it in color #0CC8A8
const resultWithoutImage = generateQRWithImage('https://trisbee.com', 500, 100, null, options);

// This will create classic B&W QR code with 'https://trisbee.com' encoded in it
const resultWithoutImageAndOptions = generateQRWithImage('https://trisbee.com', 500, 100, null, null);

// The buffer of outputed QR code
const imageBuffer = resultWithImage.buffer;
const imageInBase64 = resultWithImage.buffer.toString('base64');

// The precentage of how much the inserted image area of QR code image covers
// if 'errorCorrectionLevel' is not specified theoretical maxium of how much the image can cover is 30%
// but we recommend to keep it under 20 and make sure the image doesn't touch the big rectangles in the corners
// of QR
const imageQRCoverage = resultWithImage.coverage;
```


## Express example

```ts
import express = require('express');
import { generateQRWithImage } from '@trisbee/qr-image-nodejs';

const app = express();
app.use(express.json());
app.listen(3000);

// When opening http://localhost:300/generateQR?content=trisbee.com the browser should render QR code of size 200 px
// and with margin of 100px
app.get('/generateQr', async (req, res) => {
    const data = await generateQRWithImage(req.params.content, 200, 100);

    res.contentType('image/png');
    res.end(data.buffer);
});
```
