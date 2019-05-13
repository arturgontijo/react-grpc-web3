import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const { PingPongServiceClient } = require('./ping_pong_grpc_web_pb');
const { PingRequest, PongResponse } = require('./ping_pong_pb.js');

var client = new PingPongServiceClient('http://localhost:7001', null, null);

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      response: undefined
    };
  }

  callGrpcService = () => {
    const request = new PingRequest();
    request.setPing('Ping');

    client.pingPong(request, {}, (err, response) => {
      if (response == null) {
        console.log(err)
      } else {
        this.setState({ response: response.getPong() });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p style={{ fontSize: "13px" }}>Response from service is {this.response} </p>
          <button style={{ padding: 10 }} onClick={this.callGrpcService}>Click for grpc request</button>
        </header>
      </div>
    );
  }
}

export default App;