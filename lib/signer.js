var crypto = require('crypto');
var sodium = require('sodium').api;

module.exports.getSignatureByInput = function  getSignatureByInput(input, privateKey, apiPublicKey) {

    // Se genera un random nonce
    var nonce = Buffer.allocUnsafe(sodium.crypto_box_NONCEBYTES);
    sodium.randombytes_buf(nonce);

    //Se crea un hash del mensaje que se desea firmar
    var hash = crypto.createHash('sha256');
    const inputHash = Buffer.from(hash.update(JSON.stringify(input)).digest('hex'));

    var signature = sodium.crypto_box(inputHash, nonce, new Buffer.from(apiPublicKey), new Buffer.from(privateKey));

    return {
        signedMessage: signature,
        nonce: nonce
    }
};
