import logging
import time

import grpc
import concurrent.futures as futures

import ping_pong_pb2_grpc as grpc_bt_grpc
from ping_pong_pb2 import PongResponse


logging.basicConfig(
    level=10, format="%(asctime)s - [%(levelname)8s] - %(name)s - %(message)s"
)
log = logging.getLogger("grpc_server")


class PingPongServicer(grpc_bt_grpc.PingPongServiceServicer):
    def __init__(self):
        self.result = None
        log.debug("PingPongServicer created")

    def pingPong(self, request, context):

        # To respond we need to create a Result() object (from .proto file)
        self.result = PongResponse()

        self.result.pong = request.ping
        log.debug("Message Received: {}".format(request.ping))
        log.debug("Responding      : {}".format(self.result.pong))
        return self.result


def serve(max_workers=10, port=7000):
    log.debug("Starting server at {}".format(port))
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=max_workers))
    grpc_bt_grpc.add_PingPongServiceServicer_to_server(PingPongServicer(), server)
    server.add_insecure_port("[::]:{}".format(port))
    return server


def main(grpc_handler):
    server = grpc_handler()
    server.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        server.stop(0)


if __name__ == "__main__":
    """
    Runs the gRPC server to communicate with the Snet Daemon.
    """
    main(serve)
