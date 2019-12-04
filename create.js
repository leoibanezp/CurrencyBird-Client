
var sodium = require('sodium').api;
var fs = require('fs');

var sender = sodium.crypto_box_keypair()
var receiver = sodium.crypto_box_keypair()

var secretKey = sender.secretKey
var publicKey = sender.publicKey

fs.writeFile("./keys/invalid/client_secret.key", secretKey, function(err) {

    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 

fs.writeFile("./keys/invalid/client_public.key", publicKey, function(err) {

    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});