import QRCOde = require('qrcode');
import {QRCodeToBufferOptions} from "qrcode";
import {createCanvas, loadImage} from "canvas";

interface QRResponse {
    buffer: Buffer,
    coverage: number
}

export async function generateQRWithImage(
    qrCodeContent: string,
    width: number,
    margin: number,
    imageBuffer?: Buffer | null,
    options?: QRCodeToBufferOptions
): Promise<QRResponse> {

    /** we want's to create a square, so this is size of one of the side */
    const squareSideSize = width + margin;

    /** init new canvas */
    const canvas = createCanvas(squareSideSize, squareSideSize);

    /** create context for drawing on canvas */
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, squareSideSize, squareSideSize);

    if (options) {
        options.width = width;
        options.margin = 0;
    }

    /** Returns a Buffer containing a representation of the QR Code image. Only works with png format */
    const qrBuffer = await QRCOde.toBuffer(qrCodeContent, options || {
        errorCorrectionLevel: imageBuffer ? 'H' : 'M',
        width: width,
        margin: 0,
    })

    /** put prepared QR code to the canvas */
    ctx.drawImage(await loadImage(qrBuffer), margin / 2, margin / 2);

    /** volume of image in pixels */
    let imageVolume = 0;

    /** if we want to put image inside the QR code we will draw it above it, to middle of the square */
    if (imageBuffer) {
        let image = await loadImage(imageBuffer);
        imageVolume = image.width * image.height;

        /** calculates the center point of the image in QR */
        let dx = (width / 2 - image.width / 2) + margin / 2;

        /** draw our image above the QR code */
        ctx.drawImage(image, dx, dx);
    }

    /** calculates the final volume of image in pixels (x * y) */
    const qrVolume = width * width;

    /** calculates how much volume of the qr code is covered by the image in % */
    const result = (imageVolume / qrVolume) * 100;

    return {
        buffer: canvas.toBuffer(),
        coverage: result,
    }
}
