/**
 * @fileoverview gRPC-Web generated client stub for escrow
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */


const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.escrow = require('./state_service_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.escrow.PaymentChannelStateServiceClient =
  function (hostname, credentials, options) {
    if (!options) options = {};
    options['format'] = 'text';

    /**
     * @private @const {!grpc.web.GrpcWebClientBase} The client
     */
    this.client_ = new grpc.web.GrpcWebClientBase(options);

    /**
     * @private @const {string} The hostname
     */
    this.hostname_ = hostname;

    /**
     * @private @const {?Object} The credentials to be used to connect
     *    to the server
     */
    this.credentials_ = credentials;

    /**
     * @private @const {?Object} Options for the client
     */
    this.options_ = options;
  };


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.escrow.PaymentChannelStateServicePromiseClient =
  function (hostname, credentials, options) {
    if (!options) options = {};
    options['format'] = 'text';

    /**
     * @private @const {!grpc.web.GrpcWebClientBase} The client
     */
    this.client_ = new grpc.web.GrpcWebClientBase(options);

    /**
     * @private @const {string} The hostname
     */
    this.hostname_ = hostname;

    /**
     * @private @const {?Object} The credentials to be used to connect
     *    to the server
     */
    this.credentials_ = credentials;

    /**
     * @private @const {?Object} Options for the client
     */
    this.options_ = options;
  };


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.escrow.ChannelStateRequest,
 *   !proto.escrow.ChannelStateReply>}
 */
const methodInfo_PaymentChannelStateService_GetChannelState = new grpc.web.AbstractClientBase.MethodInfo(
  proto.escrow.ChannelStateReply,
  /** @param {!proto.escrow.ChannelStateRequest} request */
  function (request) {
    return request.serializeBinary();
  },
  proto.escrow.ChannelStateReply.deserializeBinary
);


/**
 * @param {!proto.escrow.ChannelStateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.escrow.ChannelStateReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.escrow.ChannelStateReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.escrow.PaymentChannelStateServiceClient.prototype.getChannelState =
  function (request, metadata, callback) {
    return this.client_.rpcCall(this.hostname_ +
      '/escrow.PaymentChannelStateService/GetChannelState',
      request,
      metadata || {},
      methodInfo_PaymentChannelStateService_GetChannelState,
      callback);
  };


/**
 * @param {!proto.escrow.ChannelStateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.escrow.ChannelStateReply>}
 *     A native promise that resolves to the response
 */
proto.escrow.PaymentChannelStateServicePromiseClient.prototype.getChannelState =
  function (request, metadata) {
    return this.client_.unaryCall(this.hostname_ +
      '/escrow.PaymentChannelStateService/GetChannelState',
      request,
      metadata || {},
      methodInfo_PaymentChannelStateService_GetChannelState);
  };


module.exports = proto.escrow;

