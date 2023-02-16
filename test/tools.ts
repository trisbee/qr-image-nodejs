const fs = require('fs');
const path = require('path');

/**
 * convert buffer data to file on disk
 */
async function imageToFile(body): Promise<void> {
  const suffix = Math.floor(new Date().getTime() / 1000);
  const fileName = `image-${suffix}.png`;
  const folder = '/../tmp/';

  let fileAbsolutePath = path.join(__dirname, folder, fileName);
  ensureDirectoryExistence(fileAbsolutePath);

  fs.writeFile(fileAbsolutePath, body, function(err) {
    if (err) throw err;
    console.log("✅ File saved to:", 'file://' + fileAbsolutePath);
  });
}

/**
 * check if directory path exist, if not, create it
 */
function ensureDirectoryExistence(filePath): boolean | void {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}


/**
 * get buffer and print QR code to terminal
 */
async function printToTerminal(buffer): Promise<void> {
  await imageToFile(buffer);
}


module.exports.printToTerminal = printToTerminal;
