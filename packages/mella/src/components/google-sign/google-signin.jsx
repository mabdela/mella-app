import React from 'react';
import GoogleLogin from 'react-google-login';
import '../sign-in/sign-in.scss';
import { useDispatch } from 'react-redux';
import { loginGoogleRequest } from 'src/redux/user/user-action';
const Google = () => {
  const dispatch = useDispatch();
  const responseGoogle = response => {
    const { profileObj } = response;
    // console.log(response.profileObj);
    // axios
    //   .post('http://localhost:8080/google', response.profileObj)
    //   .then(response => {
    //     console.log(response); //do routing
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    dispatch(
      loginGoogleRequest({
        email: profileObj.email,
        first_name: profileObj.givenName,
        last_name: profileObj.familyName,
      })
    );
  };

  return (
    <div>
      <GoogleLogin
        clientId="79051223637-9nqisu2n19pd65v7g5uc2svnaa801b0e.apps.googleusercontent.com"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
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
};
export default Google;
