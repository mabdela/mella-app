package auth

import (
	"net/http"
	"os"
)

func (s *authenticator) GoogleAdminSignin(response http.ResponseWriter, request *http.Request) {
	url := s.GoogleAuthConfig.AuthCodeURL(os.Getenv("GOOGLE_ADMIN_SIGNIN"))
	http.Redirect(response, request, url, http.StatusTemporaryRedirect)
}

func (s *authenticator) GoogleUserSignin(response http.ResponseWriter, request *http.Request) {
	url := s.GoogleAuthConfig.AuthCodeURL(os.Getenv("GOOGLE_USER_SIGNIN"))
	http.Redirect(response, request, url, http.StatusTemporaryRedirect)
}

func (s *authenticator) GoogleUserSignUP(response http.ResponseWriter, request *http.Request) {
	url := s.GoogleAuthConfig.AuthCodeURL(os.Getenv("GOOGLE_USER_SIGNUP"))
	http.Redirect(response, request, url, http.StatusTemporaryRedirect)
}
func (s *authenticator) FaceBookAdminSignin(response http.ResponseWriter, request *http.Request) {
	url := s.FacebookAuthConfig.AuthCodeURL(os.Getenv("FACEBOOK_ADMIN_SIGNIN"))
	http.Redirect(response, request, url, http.StatusTemporaryRedirect)
}

func (s *authenticator) FaceBookUserSignin(response http.ResponseWriter, request *http.Request) {
	url := s.FacebookAuthConfig.AuthCodeURL(os.Getenv("FACEBOOK_USER_SIGNIN"))
	http.Redirect(response, request, url, http.StatusTemporaryRedirect)
}

func (s *authenticator) FaceBookUserSignUP(response http.ResponseWriter, request *http.Request) {
	url := s.FacebookAuthConfig.AuthCodeURL(os.Getenv("FACEBOOK_USER_SIGNUP"))
	http.Redirect(response, request, url, http.StatusTemporaryRedirect)
}
