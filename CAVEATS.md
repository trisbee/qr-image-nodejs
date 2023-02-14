# Known issues

## AWS Lambda support

We had problem with using this package on AWS Lambda. It's related with dependency `canvas`.
Potential solution is to use [canvas-aws-prebuilt](https://www.npmjs.com/package/canvas-aws-prebuilt) I think.
If you need it try to change it like this and send us Pull Request back if it's working without issues 🙏
