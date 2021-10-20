import React from 'react';
import FacebookLogin from 'react-facebook-login';
import '../sign-in/sign-in.scss';
import { useDispatch } from 'react-redux';
import { loginFacebookRequest } from 'src/redux/user/user-action';

const Facebook = () => {
  const dispatch = useDispatch();
  const responseFacebook = response => {
    // console.log(response);
    // // console.log(response);
    // axios
    //   .post('http://localhost:8080/facebook', response)
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    dispatch(loginFacebookRequest(response));
  };

  return (
    <div>
      <FacebookLogin
        appId="1576663876058921"
        fields="email,first_name,last_name"
        callback={responseFacebook}
        onFailure={responseFacebook}
        cssClass="icon-container facebook"
        icon="fab fa-facebook-f"
        textButton=""
      />
    </div>
  );
};

export default Facebook;
