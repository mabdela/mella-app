import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import '../sign-in/sign-in.scss';

export default class Facebook extends Component {
  responseFacebook = response => {
    console.log(response);
    // console.log(response);
    axios
      .post('http://localhost:8080/facebook', response)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <FacebookLogin
          appId="1576663876058921"
          fields="email,first_name,last_name"
          callback={this.responseFacebook}
          onFailure={this.responseFacebook}
          cssClass="icon-container facebook"
          icon="fab fa-facebook-f"
          textButton=""
        />
      </div>
    );
  }
}
