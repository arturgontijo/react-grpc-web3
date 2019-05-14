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

var escrow = grpc.loadPackageDefinition(packageDefinition).escrow;

var server = new grpc.Server();

server.addService(escrow.PaymentChannelStateService.service, {
    getChannelState: function (call, callback) {
        console.log("Request")
        return callback(null, {
            current_nonce: Buffer.from("00", 'hex'),
            current_signed_amount: Buffer.from("110", 'hex'),
            current_signature: Buffer.from("1000010010", 'hex')
        });
    }
});

server.bind('localhost:7000', grpc.ServerCredentials.createInsecure());
server.start();