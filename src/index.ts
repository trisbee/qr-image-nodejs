import QRCOde = require('qrcode');
import {QRCodeToBufferOptions} from "qrcode";


const {createCanvas, loadImage} = require('canvas')

interface QRResponse {
    buffer: Buffer,
    coverage: number
}


export const generateQRWithImage = async (qrCodeContent: string, width: number, margin: number, imageBuffer?: Buffer | null, options?: QRCodeToBufferOptions): Promise<QRResponse> => {

    const fullHeight = width + margin;

    const canvas = createCanvas(fullHeight, fullHeight)
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, fullHeight, fullHeight);

    if (options) {
        options.width = width;
        options.margin = 0;
    }


    const qrBuffer = await QRCOde.toBuffer(qrCodeContent, options || {
        errorCorrectionLevel: imageBuffer ? 'H' : 'M',
        width: width,
        margin: 0,
    })

    ctx.drawImage(await loadImage(qrBuffer), margin / 2, margin / 2)

    let imageVolume = 0;

    if (imageBuffer) {
        let image = await loadImage(imageBuffer);
        imageVolume = image.width * image.height

        let dx = (width / 2 - image.width / 2) + margin / 2;
        ctx.drawImage(image, dx, dx)
    }


    const qrVolume = width * width;
    const result = (imageVolume / qrVolume) * 100;


    return {
        buffer: canvas.toBuffer(),
        coverage: result,
    }


}
