import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import '../sign-in/sign-in.scss';
class Google extends Component {
  responseGoogle = response => {
    // console.log(response);
    console.log(response.profileObj);
    axios
      .post('http://localhost:8080/google', response.profileObj)
      .then(response => {
        console.log(response); //do routing
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <GoogleLogin
          clientId="79051223637-9nqisu2n19pd65v7g5uc2svnaa801b0e.apps.googleusercontent.com"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
          buttonText=""
          render={renderProps => (
            <button
              onClick={renderProps.onClick}
              className="icon-container google"
            >
              {' '}
              <i className="fab fa-google"></i>
            </button>
          )}
          className="icon-container google"
        />
      </div>
    );
  }
}
export default Google;
