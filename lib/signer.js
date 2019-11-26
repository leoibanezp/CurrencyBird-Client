var crypto = require('crypto');

module.exports.getSignatureByInput = function  getSignatureByInput(input, privateKey) {
    let sign = crypto.createSign('RSA-SHA256')
    var hash = crypto.createHash('sha256');

    let inputHash = hash.update(JSON.stringify(input)).digest('hex');
    sign.update(inputHash)
    let signature = sign.sign(privateKey, 'hex')

    return signature
};
