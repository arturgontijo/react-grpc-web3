docker build -t envoy_proxy .
docker run --network="host" -p 7001:7001 -d envoy_proxy
