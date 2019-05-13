# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
import grpc

import ping_pong_pb2 as ping__pong__pb2


class PingPongServiceStub(object):
  # missing associated documentation comment in .proto file
  pass

  def __init__(self, channel):
    """Constructor.

    Args:
      channel: A grpc.Channel.
    """
    self.pingPong = channel.unary_unary(
        '/pingpong.PingPongService/pingPong',
        request_serializer=ping__pong__pb2.PingRequest.SerializeToString,
        response_deserializer=ping__pong__pb2.PongResponse.FromString,
        )


class PingPongServiceServicer(object):
  # missing associated documentation comment in .proto file
  pass

  def pingPong(self, request, context):
    # missing associated documentation comment in .proto file
    pass
    context.set_code(grpc.StatusCode.UNIMPLEMENTED)
    context.set_details('Method not implemented!')
    raise NotImplementedError('Method not implemented!')


def add_PingPongServiceServicer_to_server(servicer, server):
  rpc_method_handlers = {
      'pingPong': grpc.unary_unary_rpc_method_handler(
          servicer.pingPong,
          request_deserializer=ping__pong__pb2.PingRequest.FromString,
          response_serializer=ping__pong__pb2.PongResponse.SerializeToString,
      ),
  }
  generic_handler = grpc.method_handlers_generic_handler(
      'pingpong.PingPongService', rpc_method_handlers)
  server.add_generic_rpc_handlers((generic_handler,))
