import React, { Component } from 'react';
import './App.css';

import Eth from 'ethjs';
const { PaymentChannelStateServiceClient } = require('./state_service_grpc_web_pb');
const { ChannelStateRequest } = require('./state_service_pb.js');

var grpc = require('grpc');

let web3 = window.web3;

class App extends Component {

  constructor(props) {
    super(props);

    this.onKeyPressvalidator = this.onKeyPressvalidator.bind(this);
    this.handleFormUpdate = this.handleFormUpdate.bind(this);
    this.initializeState = this.initializeState.bind(this);

    this.state = {
      endpoint: "",
      channel_id: "",
      nonce: undefined,
      current_signed_amount: undefined,
      current_signature: undefined
    };
    this.web3 = undefined;
    this.eth = undefined;
    this.initializeState();
  }

  initializeState() {
    this.web3 = window.web3;
    this.eth = new Eth(window.web3.currentProvider);
    window.ethjs = this.eth; //TODO - NETWORK CHANGE
  }

  composeSHA3Message(types, values) {
    var ethereumjsabi = require('ethereumjs-abi');
    var sha3Message = ethereumjsabi.soliditySHA3(types, values);
    var msg = "0x" + sha3Message.toString("hex");
    return msg;
  }

  callStateService = () => {
    var msg = this.composeSHA3Message(["uint256"], [parseInt(this.state.channel_id)]);
    window.ethjs.personal_sign(msg, web3.eth.defaultAccount)
      .then((signed) => {
        var client = new PaymentChannelStateServiceClient(this.state.endpoint, grpc.ssl, null);
        const request = new ChannelStateRequest();
        request.setChannelId(this.state.channel_id);
        request.setSignature(signed);
        client.getChannelState(request, {}, (err, response) => {
          if (response == null) {
            console.log(err)
          } else {
            this.setState({
              nonce: response.getCurrentNonce(),
              current_signed_amount: response.getCurrentSignedAmount(),
              current_signature: response.getCurrentSignature()
            });
          }
        });
      }).catch(err => {
        console.log(err);
      });
  }

  onKeyPressvalidator(event) {
    const keyCode = event.keyCode || event.which;
    if (!(keyCode === 8 || keyCode === 46) && (keyCode < 48 || keyCode > 57)) {
      event.preventDefault()
    } else {
      let dots = event.target.value.split('.');
      if (dots.length > 1 && keyCode === 46)
        event.preventDefault()
    }
  }

  handleFormUpdate(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p style={{ fontSize: "13px" }}>Nonce: {this.nonce} </p>
          <p style={{ fontSize: "13px" }}>SignedAmount: {this.current_signed_amount} </p>
          <p style={{ fontSize: "13px" }}>CurrentSignature: {this.current_signature} </p>
          <div className="row">
            <div className="col-md-3 col-lg-3">
              <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>Channel ID: </div>
              <input name="channel_id" type="number"
                style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
                value={this.state.channel_id} onChange={this.handleFormUpdate}
                onKeyPress={(e) => this.onKeyPressvalidator(e)}></input>
            </div>
            <div className="col-md-3 col-lg-3">
              <div className="col-md-3 col-lg-3" style={{ padding: "10px", fontSize: "13px", marginLeft: "10px" }}>Endpoint: </div>
              <input name="endpoint"
                style={{ height: "30px", width: "250px", fontSize: "13px", marginBottom: "5px" }}
                value={this.state.endpoint} onChange={this.handleFormUpdate}></input>
            </div>
          </div>
          <button style={{ padding: 10 }} onClick={this.callStateService}>Check</button>
        </header>
      </div >
    );
  }
}

export default App;