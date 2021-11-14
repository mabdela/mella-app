package rest

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/mabdela/mella-backend/pkg/constants/model"
	"golang.org/x/oauth2"
)

type IOAuthHandler interface {
	GoogleHandleCallback(w http.ResponseWriter, r *http.Request)
}

type OAuthHandler struct {
	UserHandler        IUserHandler
	AdminHandler       IAdminHandler
	GoogleAuthConfig   *oauth2.Config
	FacebookAuthConfig *oauth2.Config
}

func NewOAuthHandler(userh IUserHandler, adminh IAdminHandler, GoogleAuthConfig *oauth2.Config, FacebookAuthConfig *oauth2.Config) IOAuthHandler {
	return &OAuthHandler{
		userh,
		adminh,
		GoogleAuthConfig,
		FacebookAuthConfig,
	}
}
func (oauthh *OAuthHandler) GoogleHandleCallback(w http.ResponseWriter, r *http.Request) {

	token, err := oauthh.GoogleAuthConfig.Exchange(oauth2.NoContext, r.FormValue("code"))
	if err != nil {
		fmt.Printf("could not create a get token : %s\n ", err.Error())
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}

	resp, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?fields=id,email,verified_email,name,given_name,family_name,picture&access_token=" + token.AccessToken)
	if err != nil {
		fmt.Printf("could not create a get request : %s\n ", err.Error())
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}

	defer resp.Body.Close()
	content, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Printf("could not parse reponse : %s\n ", err.Error())
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}
	println(string(content))
	jdec := json.NewDecoder(bytes.NewBuffer(content))
	println(string(content))
	input := &model.GoogleUser{}
	er := jdec.Decode(input)
	if er != nil {
		fmt.Printf("couldnpt parse the Response: %s\n ", err.Error())
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}
	switch r.FormValue("state") {
	case os.Getenv("GOOGLE_ADMIN_SIGNIN"):
		{
			oauthh.AdminHandler.GoogleAdminLoginCallBack(w, r, input)
		}
	case os.Getenv("GOOGLE_USER_SIGNIN"):
		{
			oauthh.UserHandler.GoogleUserSigninCallBack(w, r, input)
		}
	case os.Getenv("GOOGLE_USER_SIGNUP"):
		{
			oauthh.UserHandler.GoogleUserSignupCallBack(w, r, input)
		}
	}
}
