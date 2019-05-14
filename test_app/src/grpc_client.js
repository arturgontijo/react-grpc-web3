var PROTO_PATH = __dirname + '/state_service.proto';
var grpc = require('grpc');
const fs = require('fs');
var protoLoader = require('@grpc/proto-loader');
// Suggested options for similarity to existing grpc.load behavior
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const credentials = grpc.credentials.createSsl(
    fs.readFileSync('/home/artur/.certs/ca.crt'),
    fs.readFileSync('/home/artur/.certs/privkey.pem'),
    fs.readFileSync('/home/artur/.certs/fullchain.pem')
);

var escrow = grpc.loadPackageDefinition(packageDefinition).escrow;
var stub = new escrow.PaymentChannelStateService('https://bh.singularitynet.io:7052', credentials);

var request = {
    channel_id: 2093,
    signature: "0x46b5aa48166f3ee970db3217e4c14a034c807a5814ff513a695994815066b0042d9c383a4a97c3e36a07594fd8f822997863ac6232ff277ca40d8b66064dae521b"
};

stub.getChannelState(request, {}, (err, response) => {
    if (response == null) {
        console.log(err)
    } else {
        console.log("response:", response)
    }
});