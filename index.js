const axios = require('axios');
var fs = require('fs');
var Signer = require('./lib/signer.js');

const options = {
    client_secretKey: Buffer.from(fs.readFileSync("./keys/valid/client_secret.key")),
    api_publicKey: Buffer.from(fs.readFileSync("./keys/valid/api_public.key")),
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

//Se consultan a las APIs con la llave del cliente y llave pública validas
PaymentCall('d290f1ee-6c54-4b01-90e6-d701748f0851', options)
    .then(console.log)
    .catch(console.error)

PaymentStatusCall('d290f1ee-6c54-4b01-90e6-d701748f0851', options)
    .then(console.log)
    .catch(console.error)

