const axios = require('axios');
var fs = require('fs');
var Signer = require('./lib/signer.js');

const options = {
    key: fs.readFileSync("./keys/key.pem")
};

async function PaymentCall(id) {
    const message = {
        id: id
    }
    let key = options.key.toString('ascii')
    const messageEncripted = Signer.getSignatureByInput(message, key)

    const response =
        await axios({
            method: 'post',
            url: 'http://localhost:3000/Payment',
            data: message,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': messageEncripted
            }
        })
    return response.data
}

async function PaymentStatusCall(id) {
    const message = {
        id: id
    }
    let key = options.key.toString('ascii')
    const messageEncripted = Signer.getSignatureByInput(message, key)

    const response =
        await axios({
        method: 'post',
        url: 'http://localhost:3000/PaymentStatus',
        data: message,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': messageEncripted
        }
    })

    return response.data
}

PaymentCall('d290f1ee-6c54-4b01-90e6-d701748f0851')
    .then(console.log)
    .catch(console.error)

PaymentStatusCall('d290f1ee-6c54-4b01-90e6-d701748f0851')
    .then(console.log)
    .catch(console.error)
