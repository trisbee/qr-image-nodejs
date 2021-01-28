# QR Image
Simple library allowing you to generate an image in middle of an QR code or without it.

This library contains only 1 method and that is `generateQRWithImage` and uses libraries
[qrcode](https://www.npmjs.com/package/qrcode) and [canvas](https://www.npmjs.com/package/canvas) to generate the
resulting image.

## Quick Example

```js

    const imageBuffer;

    // for option values please visit https://www.npmjs.com/package/qrcode#qr-code-options library
    const options = {
        errorCorrectionLevel: 'Q',
        color: {
            dark: '#0CC8A8'
        }
    };


    // This will create QR with 'https://trisbee.com' encoded in it and with centered image also color will be #0CC8A8
    const resultWithImage = generateQRWithImage('https://trisbee.com', 500, 100, imageBuffer, options)
    // This will create just QR code with 'https://trisbee.com' encoded in it in color #0CC8A8
    const resultWithoutImage = generateQRWithImage('https://trisbee.com', 500, 100, null, options)
    // This will create classic B&W QR code with 'https://trisbee.com' encoded in it
    const resultWithoutImageAndOptions = generateQRWithImage('https://trisbee.com', 500, 100, null, null)

    // The buffer of outputed QR code
    const imageBuffer = resultWithImage.buffer;

    // The precentage of how much the inserted image area of QR code image covers
    // if 'errorCorrectionLevel' is not specified theoretical maxium of how much the image can cover is 30%
    // but we recommend to keep it under 20 and make sure the image doesn't touch the big rectangles in the corners
    // of QR
    const imageQRCoverage = resultWithImage.coverage



```

### Typings
```ts
    generateQRWithImage(qrCodeContent: string, width: number, margin: number, imageBuffer?: Buffer, options?: QRCodeToBufferOptions)
```

### Options

For options please visit documentation of [qrcode](https://www.npmjs.com/package/qrcode#qr-code-options) library
