/**
 * @fileoverview gRPC-Web generated client stub for pactus
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.5.0
// 	protoc              v0.0.0
// source: network.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.pactus = require('./network_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.pactus.NetworkClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'binary';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.pactus.NetworkPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'binary';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.pactus.GetNetworkInfoRequest,
 *   !proto.pactus.GetNetworkInfoResponse>}
 */
const methodDescriptor_Network_GetNetworkInfo = new grpc.web.MethodDescriptor(
  '/pactus.Network/GetNetworkInfo',
  grpc.web.MethodType.UNARY,
  proto.pactus.GetNetworkInfoRequest,
  proto.pactus.GetNetworkInfoResponse,
  /**
   * @param {!proto.pactus.GetNetworkInfoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.pactus.GetNetworkInfoResponse.deserializeBinary
);


/**
 * @param {!proto.pactus.GetNetworkInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.pactus.GetNetworkInfoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pactus.GetNetworkInfoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pactus.NetworkClient.prototype.getNetworkInfo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pactus.Network/GetNetworkInfo',
      request,
      metadata || {},
      methodDescriptor_Network_GetNetworkInfo,
      callback);
};


/**
 * @param {!proto.pactus.GetNetworkInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pactus.GetNetworkInfoResponse>}
 *     Promise that resolves to the response
 */
proto.pactus.NetworkPromiseClient.prototype.getNetworkInfo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/pactus.Network/GetNetworkInfo',
      request,
      metadata || {},
      methodDescriptor_Network_GetNetworkInfo);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.pactus.GetNodeInfoRequest,
 *   !proto.pactus.GetNodeInfoResponse>}
 */
const methodDescriptor_Network_GetNodeInfo = new grpc.web.MethodDescriptor(
  '/pactus.Network/GetNodeInfo',
  grpc.web.MethodType.UNARY,
  proto.pactus.GetNodeInfoRequest,
  proto.pactus.GetNodeInfoResponse,
  /**
   * @param {!proto.pactus.GetNodeInfoRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.pactus.GetNodeInfoResponse.deserializeBinary
);


/**
 * @param {!proto.pactus.GetNodeInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.pactus.GetNodeInfoResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.pactus.GetNodeInfoResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.pactus.NetworkClient.prototype.getNodeInfo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/pactus.Network/GetNodeInfo',
      request,
      metadata || {},
      methodDescriptor_Network_GetNodeInfo,
      callback);
};


/**
 * @param {!proto.pactus.GetNodeInfoRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.pactus.GetNodeInfoResponse>}
 *     Promise that resolves to the response
 */
proto.pactus.NetworkPromiseClient.prototype.getNodeInfo =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/pactus.Network/GetNodeInfo',
      request,
      metadata || {},
      methodDescriptor_Network_GetNodeInfo);
};


module.exports = proto.pactus;

