const fs = require('fs');
const path = require('path');
const resolve = require('path').resolve

/**
 * convert buffer data to file on disk
 */
async function imageToFile(body) {

  const suffix = Math.floor(new Date().getTime() / 1000);
  const fileName = `image-${suffix}.png`;
  const folder = '/tmp/';

  let fileAbsolutePath = path.join(__dirname, folder, fileName);

  ensureDirectoryExistence(fileAbsolutePath);

  fs.writeFile(fileAbsolutePath, body, function(err) {
    if (err) throw err;
    console.log("✅ File saved to:", 'file://' + fileAbsolutePath);
  });
}

/**
 * check if directory path exist
 * if not, create it
 */
function ensureDirectoryExistence(filePath)
{
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
async function printToTerminal(buffer) {
  await imageToFile(buffer);
}


module.exports.printToTerminal = printToTerminal;
