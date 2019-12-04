const axios = require('axios');
var fs = require('fs');
var Signer = require('./lib/signer.js');

const options_invalid = {
    client_secretKey: Buffer.from(fs.readFileSync("./keys/invalid/client_secret.key")),
    api_publicKey: Buffer.from(fs.readFileSync("./keys/invalid/api_public.key")),
};


async function PaymentCall(id, keys) {
    const message = {
        id: id
    }
    const messageEncripted = Signer.getSignatureByInput(message, keys.client_secretKey, keys.api_publicKey)

    const response =
        await axios({
            method: 'post',
            url: 'http://localhost:3000/Payment',
            data: message,
            headers: {
                'Content-Type': 'application/json',
                'validation': JSON.stringify(messageEncripted)
            }
        })
    return response.data
}

async function PaymentStatusCall(id, keys) {
    const message = {
        id: id
    }
    const messageEncripted = Signer.getSignatureByInput(message, keys.client_secretKey, keys.api_publicKey)

    const response =
        await axios({
        method: 'post',
        url: 'http://localhost:3000/PaymentStatus',
        data: message,
        headers: {
            'Content-Type': 'application/json',
            'validation': JSON.stringify(messageEncripted)
        }
    })

    return response.data
}

//Se consultan las APIs con la llave del cliente invalida
PaymentCall('d290f1ee-6c54-4b01-90e6-d701748f0851', options_invalid)
    .then(console.log)
    .catch(console.error)

PaymentStatusCall('d290f1ee-6c54-4b01-90e6-d701748f0851', options_invalid)
    .then(console.log)
    .catch(console.error)
