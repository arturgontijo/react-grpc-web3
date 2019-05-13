import grpc
import ping_pong_pb2_grpc as grpc_bt_grpc
import ping_pong_pb2 as grpc_bt_pb2

# Open a gRPC channel
channel = grpc.insecure_channel("localhost:8080")
stub = grpc_bt_grpc.PingPongServiceStub(channel)
msg = grpc_bt_pb2.PingRequest(ping="{}".format(input("Message: ")))
print("Response: ", stub.pingPong(msg))
